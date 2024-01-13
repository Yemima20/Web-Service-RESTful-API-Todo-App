const express = require("express");
const app = express();
require('dotenv').config()

app.use(express.json())

// connect --> database
const mongoose = require("mongoose");
const uri = process.env.MONGOOSE_URI;

mongoose.connect(uri)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'Could not connect to mongoose'));
db.once('open', () => console.log('Connected to mongoose!'))

// route --> user
const userRoute = require('./routes/user')
app.use('/todo-app/users', userRoute)

// route --> todo
const todoRoute = require('./routes/todos')
app.use('/todo-app/todos', todoRoute)

app.listen(process.env.PORT, () => {
  console.log(`Listening to port: ${process.env.PORT}`);
});