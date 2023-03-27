const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../model/user.model");
const userRouter = express.Router();



//registartion
userRouter.post("/register", async (req, res) => {
  const { name, email, gender, password, age, city, is_married } = req.body;
  try {
    const register = await UserModel.findOne({email});
 
    if(register){
      return  res.status(200).send({ msg: "User already exist, please login" });
    }
    bcrypt.hash(password, 5, async (err, hash) => {
      const user = new UserModel({
        name,
        email,
        gender,
        password: hash,
        age,
        city,
        is_married,
      });
      await user.save();
      res.status(200).send({ msg: "Registration has been done" });
    });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

//login
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          res
            .status(200)
            .send({
              msg: "Login Successful !",
              token: jwt.sign({ userId: user._id }, "post"),
            });
        }
      });
    } else {
      res.status(400).send({ msg: "Wrong Creditionals" });
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});


module.exports = {userRouter}
