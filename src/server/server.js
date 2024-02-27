const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 2525;

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

app.use(cors());
app.use(express.json());

app.post('/register', async (req, res) => {
  try {
    const newUser = new User(req.body); 
    await newUser.save(); 
    res.status(201).json({ message: 'Пользователь зарегистрирован' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при регистрации пользователя', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
