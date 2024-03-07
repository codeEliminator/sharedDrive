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
require('./imageDetails')
const nodemailer = require('nodemailer');
const { randomBytes } = require('crypto');
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
  password: String,
  phoneNumber: String,
  role: String,
  emailVerified: Boolean,
  rating: Number,
  randomBytes: String,
});


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'public/uploads/'))
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname+'.png')
  }
});
const upload = multer({ storage: storage });

// const ImageDetails = mongoose.model('ImageDetails')
const User = mongoose.model('User', userSchema);

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


app.post('/register', async (req, res) => {
  console.log('register')
  try {
    const userExists = await User.findOne({ email: req.body.email }); 
    if (userExists) {
      return res.status(400).json({ message: 'Пользователь с таким email уже существует', status: 400 });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword
    const newUser = new User({...req.body, emailVerified: false, rating: 5.0, randomBytes: createRandomString(30)});
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
      const token = jwt.sign({ id: user._id, name: user.name, role: user.role, email: user.email, password: user.password, phoneNumber: user.phoneNumber, randomBytes: user.randomBytes, rating: user.rating }, process.env.JWT_SECRET);
      res.cookie('authToken', token, {
        httpOnly: true,
      });
      return res.status(201).json({ message: 'Успешный вход', status: 201 });
    } else {
      return res.status(405).json({ message: 'Неверный пароль', status: 405 });
    }
  }
  catch(error){
    res.status(500).json({ message: 'Ошибка при регистрации пользователя', error: error.message , status: 500});
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
