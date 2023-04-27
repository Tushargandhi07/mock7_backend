const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user.model.js');
const userRouter = express.Router();



userRouter.post("/register", async (req, res) => {
    const { name, bio, phone, email, password } = req.body;
    try {
        const check = await User.find({ email });
        if (check.length > 0) {
            res.send({ "msg": "Already registered" });
            return;
        }

        bcrypt.hash(password, 5, async (err, hashed_pass) => {
            if (err) {
                console.log(err);
                res.status(404).send({ "msg": error.message });
            }
            else {
                const user = new User({ name, phone, bio, email, password: hashed_pass });
                await user.save();
                res.status(200).send({ "msg": "Registration successful" })
            }
        });

    } catch (error) {
        console.log(error);
        console.log("new Error:")
        res.status(404).send({ "msg": error.message });
    }

});

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.find({ email });
        const hashed_pass = user[0].password;
        if (user.length > 0) {
            bcrypt.compare(password, hashed_pass, (err, result) => {
                if (result) {
                    const token = jwt.sign({ userID: user[0]._id }, 'tushar');
                    res.status(200).send({ "token": token, "msg": "Login success" });
                }
            })
        }
        else {
            res.send({ "msg": "Wrong credentials" })
        }
    } catch (error) {
        res.send({ "msg": "Wrong credentials" })
    }
});

userRouter.get("/profile", async (req, res) => {
    try {
        const  token  = req.headers.authorization;
        const decoded = jwt.verify(token, "tushar");
        if (decoded) {
            let profile = await User.findById({ _id: decoded.userID })
            if(profile){
                res.send({data:profile})
            }
            else{
                res.send({ "msg": "Login Again" })
            }
        }
        else {
            res.send({ "msg": "Login Again" })
        }
    } catch (error) {
        res.send({ "msg": "Login Again" })
    }


})

userRouter.patch("/update", async (req, res) => { });


module.exports = {
    userRouter
}