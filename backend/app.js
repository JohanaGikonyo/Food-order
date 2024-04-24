const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
const path = require('path')
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')))
const corsOptions = {
  origin: ['https://food-order-app-sand.vercel.app', 'http://localhost:5173/'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionSuccessStatus: 200
};

app.use(cors(corsOptions));
app.get('/', async (req, res, next) => {
  res.send({ message: 'Awesome it works 🐻' });
});

app.use('/api', require('./routes/api.route'));

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
