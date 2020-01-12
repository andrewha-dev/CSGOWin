require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors')

mongoose
  .connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true }
  )
  .then(() => console.log(`Connected to MongoDB 🔥`));

const PORT = process.env.PORT || 5000;
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
require('./config/steam')(app);
app.use(cors());
app.use('/auth', require('./routes/authentication/auth.routes'));
app.listen(PORT, () => console.log(`Server listening on port ${PORT} 🚀`));
