const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 2525;
const bcrypt = require('bcrypt')
const ComparePasswords  = require('../app/(Registration)/helpers/BcryptCompare');

app.use(cors());
app.use(express.json());

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
  try{
    const userExists = await User.findOne({ email: req.body.email }); 
    if(!userExists){
      return res.status(400).json({ status: 400 });
    } else {
      const isMatch = await ComparePasswords(req.body.password, userExists.password, bcrypt);
      if(isMatch) {
        return res.status(200).json({ status: 201 });
      } else {
        return res.status(405).json({ status: 405});
      }
    }
  }
  catch(error){
    res.status(500).json({ message: 'Ошибка при регистрации пользователя', error: error.message });
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
