const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 2525;
const bcrypt = require('bcrypt')
const ComparePasswords  = require('../app/(Registration)/helpers/BcryptCompare');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')
const multer = require('multer');
const path = require('path');
const {createRandomString} = require('./helpers/createRandomString')
const fetch = require('node-fetch');
require('./imageDetails')
const nodemailer = require('nodemailer');

const corsOptions = {
  origin: 'http://localhost:3000', 
  credentials: true, 
};
app.use(cors(corsOptions));
app.use(express.json({limit: '50mb'}));
app.use(cookieParser()); 
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

mongoose.connect('mongodb+srv://admin:admin@accountdatabase.ddvfqdh.mongodb.net/accountdatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Успешное подключение к MongoDB'))
  .catch(err => console.error('Ошибка подключения к MongoDB:', err));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  surname: String,
  password: String,
  phoneNumber: String,
  role: String,
  emailVerified: Boolean,
  rating: Number,
  randomBytes: String,
  activeTrips: Array,
  identityVerified: Boolean,
  phoneNumberVerified: Boolean,
});
const tripSchema = new mongoose.Schema({
  userEmail: String,
  userName: String,
  startDate: Date,
  startTime: String,
  startAddress: String,
  endAddress: String,
  selectedRouteIndex: Number,
  passengerCount: Number,
  userRandomBytes: String,
  done: Boolean,
  passengers: Array,
  tripId: String,
},
{
  collection: "TripSchema"
})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'public/uploads/'))
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname+'.png')
  }
});
const upload = multer({ storage: storage });
const User = mongoose.model('User', userSchema);
const Trip = mongoose.model('Trip', tripSchema);

app.get('/get-user/', async (req, res)=>{
  try{
    const user = await User.findOne({randomBytes: req.query.randomBytes})
    if(user){
      return res.status(200).json(user)
    }
    return res.status(404).json()
  }
  catch(err){
    return res.status(500)
  }
})
app.post('/api/bookRide', async (req, res)=>{
  const {user, tripItem} = req.body
  try{
    const trip = await Trip.findOne(tripItem)
    if(trip){
      if(trip.passengerCount == 0){
        return res.status(401).json('No spaces left')  
      }
      else if(trip.passengers.includes(user.randomBytes)){
        return res.status(402).json('You are already passenger')
      }
      else{
        trip.passengers.push(user.randomBytes)
        trip.passengerCount -= 1
        await trip.save()
        const userDB = await User.findOne({email: user.email})
        userDB.activeTrips.push(trip.tripId)
        await userDB.save()
        return res.status(200).json('uspeshno')
      }
    }
    return res.status(404).json('not found')
  }
  catch(err){
    console.log(err)
    return res.status(500)
  }
})
app.get('/api/routes/get-user-trips', async (req, res) => {
  try {
    const activeTripsParam = req.query.activeTrips;
    
    const activeTrips = activeTripsParam ? JSON.parse(activeTripsParam) : [];
    if (!Array.isArray(activeTrips)) {
      return res.status(400).json({ message: 'Invalid active trips format' });
    }
    const tripsData = await Trip.find({
      tripId: { $in: activeTrips }
    });
    return res.status(200).json(tripsData);
  } catch (error) {
    console.error('Error fetching active trips:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});
app.post('/mark-ride-done', async (req, res)=>{
  try{
    const trip = await Trip.findOne(req.body)
    if(trip){
      if(trip.done == false){
        trip.done = true
        await trip.save()
        return res.sendStatus(200)
      }
      return res.sendStatus(404)
    }
  }
  catch(err){
    return res.sendStatus(500)
  }
})
app.post('/api/trips/', async (req, res)=> {
  try{
    const newTrip = new Trip({...req.body, done: false, passengers: [], tripId: createRandomString(35)})
    await newTrip.save(); 
    res.status(201).json({ message: 'Trip Added', status: 201 });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при Trip Added', error: error.message });
  }
})
app.get('/api/get-user-trips', async (req, res)=>{
  try{
    const user = await User.findOne({randomBytes: req.query.randomBytes})
    if(user){
      const userTrips = await Trip.find({userEmail: user.email})
      if(userTrips){
        return res.status(200).json(userTrips)
      }
      return res.status(404).json()
    }
  }
  catch(err){
    return res.status(500)
  }

})
app.post('/upload', upload.single('file'), (req, res) => {
  if (req.file) {
    console.log('Файл сохранен:', req.file.path);
    res.send('Файл успешно загружен');
  } else {
    console.log('err')
    res.status(400).send('Ошибка загрузки файла');
  }
});
app.get('/image/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'public/uploads/', filename);

  res.sendFile(filePath, err => {
    if (err) {
      res.status(404).send('Изображение не найдено');
    }
  });
});
app.get('/api/get-routes-date/', async (req, res) => {
  const { startLocation, endLocation, passengerCount, date } = req.query;
  try {
    const trips = await Trip.find({
      startAddress: startLocation, 
      endAddress: endLocation, 
      startDate: new Date(new Date(date).setHours(0, 0, 0, 0)),
      passengerCount: { $gte: passengerCount }
    });
    if (trips.length > 0) {
      res.status(200).json(trips);
    } else {
      res.status(404).json([]);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
});


// app.get('/api/routes', async (req, res) => {
//   const { startLat, startLng, endLat, endLng } = req.query;
//   const directionsApiUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${startLat},${startLng}&destination=${endLat},${endLng}&mode=driving&alternatives=true&key=AIzaSyAfZm8YP3fWLPMbQU8DCc0s_9TLeSwKjJE`;

//   try {
//     const response = await fetch(directionsApiUrl);
//     const data = await response.json();

//     if (data.status === 'OK') {
//       res.json({ routeCount: data.routes.length });
//     } else {
//       res.status(500).json({ error: 'Failed to get directions', details: data.error_message });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });
app.get('/api/routes', async (req, res) => {
  const { startLat, startLng, endLat, endLng } = req.query;
  const directionsApiUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${startLat},${startLng}&destination=${endLat},${endLng}&mode=driving&alternatives=true&key=YOUR_API_KEY`;

  try {
    const response = await fetch(directionsApiUrl);
    const data = await response.json();

    if (data.status === 'OK') {
      const routes = data.routes.map(route => {
        const durationText = route.legs.reduce((total, leg) => total + leg.duration.text, "");
        const durationValue = route.legs.reduce((total, leg) => total + leg.duration.value, 0);
        return {
          durationText,
          durationValue,
        };
      });
      res.json({ routes });
    } else {
      res.status(500).json({ error: 'Failed to get directions', details: data.error_message });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/register', async (req, res) => {
  console.log('register')
  try {
    const userExists = await User.findOne({ email: req.body.email }); 
    if (userExists) {
      return res.status(400).json({ message: 'Пользователь с таким email уже существует', status: 400 });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword
    const newUser = new User({...req.body, emailVerified: false, rating: 5.0, randomBytes: createRandomString(30), activeTrips: [], identityVerified: false, phoneNumberVerified: false});
    await newUser.save(); 
    res.status(201).json({ message: 'Пользователь зарегистрирован', status: 201 });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при регистрации пользователя', error: error.message });
  }
});
app.post('/auth', async (req, res) => {
  console.log('auth')
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Пользователь не найден', status: 400 });
    }
    const isMatch = await ComparePasswords(password, user.password, bcrypt);
    if (isMatch) {
      const token = jwt.sign({ id: user._id, name: user.name, role: user.role, email: user.email, password: user.password, phoneNumber: user.phoneNumber, randomBytes: user.randomBytes, rating: user.rating, activeTrips: user.activeTrips, surname: user.surname, identityVerified: user.identityVerified, phoneNumberVerified: user.phoneNumberVerified }, process.env.JWT_SECRET);
      res.cookie('authToken', token, {
        httpOnly: true,
      });
      return res.status(201).json({ message: 'Успешный вход', status: 201 });
    } else {
      return res.status(405).json({ message: 'Неверный пароль', status: 405 });
    }
  }
  catch(error){
    res.status(500).json({ message: 'Ошибка при авторизации пользователя', error: error.message , status: 500});
  }
});
app.get('/api/user', async (req, res) => {
  const token = req.cookies.authToken;
  console.log('api/user')
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: 'Пользователь не найден' });
    return res.json(user);

  } catch (error) {
    res.status(500).json({ message: error });
  }
});
app.post('/logout', async (req, res)=>{
  console.log('logout')
  res.cookie('authToken', '', { expires: new Date(0) });
  res.status(200).json({ message: 'Вы успешно вышли из системы', status: 200 });
})
app.post('/email-verify', async (req, res) => {
  console.log('email-verify')

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  });
  const token = req.cookies.authToken;
  await User.updateOne({ email: req.body.email }, { verifyToken: token });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    transporter.sendMail({
      from: 'no-reply@sharedDrive.com',
      to: user.email,
      subject: 'Email Verification',
      html: `<div>Please verify your email by clicking on the following <span><a href='http://localhost:2525/getEmailVerified?token=${token}'>link</a></span></div> `,
    });
    res.status(200).json({message: 'Link has been sent', status: 200})
  }
  catch(err){
    console.log(err)
  }
})
app.get('/getEmailVerified', async (req, res) => {
  try {
    const { token } = req.query;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).send('User not found');
    await user.updateOne({$set: {emailVerified: true}})
    await user.save();
    res.status(200).json({message: 'Email verified, you will redirected soon',status: 200});
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).send('Invalid or expired token');
    }
    res.status(500).send('Internal server error');
  }
});
app.post('/uploadFile', async (req, res) => {
  const { base64, email } = req.body;
  console.log(base64, email)
  try {
    const newImageDetail = new ImageDetails({
      image: base64,
      email: email
    });
    await newImageDetail.save();
    res.status(200).json({ message: "Изображение успешно сохранено", status: 200 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при сохранении изображения" });
  }
});
app.post('/password-recovery', async (req, res) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  });
  try{
    const user = await User.findOne({email: req.body.email})
    const token = createRandomString(32)
    if(user){
      transporter.sendMail({
        from: 'no-reply@sharedDrive.com',
        to: user.email,
        subject: 'Password Recovery',
        html: `<div>Get your recovery page <a href='http://localhost:3000/authorization/forgot-password?recoveryPasswordToken=${token}&email=${req.body.email}'>here</a></div>`,
      });
      res.status(200).json({message: 'Link has been sent', status: 200, token: token})
    }
  } catch(err){
    console.log(err)
  }
})
app.post('/userPasswordChange', async (req, res) => {
  const user = await User.findOne({email: req.body.email})
  if(user){
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({status: 200})
  }

})
// app.delete('/deleteAllUsers', async (req, res) => {
//   try {
//     await ImageDetails.deleteMany({}); 
//     res.status(200).json({ message: 'Все пользователи удалены' });
//     console.log('Все пользователи удалены')
//   } catch (error) {
//     res.status(500).json({ message: 'Произошла ошибка при удалении пользователей', error: error.message });
//   }
// });
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
