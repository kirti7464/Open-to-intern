const express = require("express")
const app= express()
const mongoose = require("mongoose")
const route = require("./route/route")
require("dotenv").config()

const {PORT,MONGODB_URL}=process.env

app.use(express.json())
app.use(express.urlencoded({extended:true}))

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.use("/",route)

app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT} port`)
})
