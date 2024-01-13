const express = require("express");
const app = express();
require('dotenv').config()

app.use(express.json())

const mongoose = require("mongoose");
const uri = process.env.MONGOOSE_URI;

mongoose.connect(uri)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'Could not connect to mongoose'));
db.once('open', () => console.log('Connected to mongoose!'))

const todoRoute = require('./routes/todos')
app.use('/', todoRoute)

app.listen(process.env.PORT, () => {
  console.log(`Listening to port: ${process.env.PORT}`);
});
