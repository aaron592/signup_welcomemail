const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRouter = require('./controllers/user');

mongoose.connect("mongodb://localhost:27017/Project")
.then(() => {
    console.log("Database connection successfull");
})
.catch((err) => {
    console.log(err);
})


const app = express();

app.use(cors());
app.use(express.json())

app.use("/user",userRouter);


app.listen(8000);