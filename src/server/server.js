const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 2525;
const bcrypt = require('bcrypt')
const ComparePasswords  = require('../app/(Registration)/helpers/BcryptCompare');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken')

const corsOptions = {
  origin: 'http://localhost:3000', 
  credentials: true, 
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser()); 

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
  role: String
});
const User = mongoose.model('User', userSchema);

app.post('/register', async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email }); 
    if (userExists) {
      return res.status(400).json({ message: 'Пользователь с таким email уже существует', status: 400 });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword
    const newUser = new User(req.body);
    await newUser.save(); 
    res.status(201).json({ message: 'Пользователь зарегистрирован', status: 201 });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при регистрации пользователя', error: error.message });
  }
});
app.post('/auth', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Пользователь не найден', status: 400 });
    }
    const isMatch = await ComparePasswords(password, user.password, bcrypt);
    if (isMatch) {
      const token = jwt.sign({ id: user._id, name: user.name, role: user.role, email: user.email, password: user.password }, process.env.JWT_SECRET);
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
  console.log(123)
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: 'Пользователь не найден' });
    res.json(user);

  } catch (error) {
    res.status(500).json({ message: error });
  }
});

app.delete('/deleteAllUsers', async (req, res) => {
  try {
    await User.deleteMany({}); 
    res.status(200).json({ message: 'Все пользователи удалены' });
    console.log('Все пользователи удалены')
  } catch (error) {
    res.status(500).json({ message: 'Произошла ошибка при удалении пользователей', error: error.message });
  }
});
app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
