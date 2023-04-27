const express = require('express');
const { connection } = require('./config/db');
const { userRouter } = require('./routes/user.route');
require('dotenv').config();
const cors= require('cors');


const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4440;

app.get("/",(req,res)=>{
    res.send("Welcome");
});


app.use("/user",userRouter);


app.listen(PORT,async()=>{
    try {
        await connection;
        console.log("Connected to DB.");
    } catch (error) {
        console.log(error)
    }
    
    console.log(`Server is listening on ${PORT}.`)
});

