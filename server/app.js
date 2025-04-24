// Core Module
// External Module
const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
const todoItemsRouter = require('./routes/todoItemsRoute');
const errorsController = require('./controllers/errors')

//Local Module


const app = express();

app.use(express.urlencoded());
app.use(express.json())
app.use(cors())

app.use('/api/todo', todoItemsRouter)
app.use(errorsController.pageNotFound);

const PORT = 3000;

mongoose.connect("mongodb://localhost:27017/todo?retryWrites=true&w=majority&appName=M0Cluster")
  .then(() => {
    console.log("Database Connected.")
    app.listen(PORT, () => {
      console.log(`Server running on address http://localhost:${PORT}`);
    });
  })
  .catch(err => console.log("Error while connecting to Mongo: ", err))