const express = require('express');
const Bcrypt = require('bcrypt');
const UserData = require('../Models/User');


const registerUser = async (req, res) => {
    try {
        const createUserinfo = await UserData.create(req.body);
        console.log(createUserinfo);
        if (createUserinfo) {
            const token = await createUserinfo.generateAuthToken();
            res.status(201).json(createUserinfo);
            console.log('signup Token: ' + token);
        }
    } catch (err) {
        console.log("Ragistration error: " + err);
        res.status(400).send({
            message: `Error In Register Controllers`,
            success: false,
            err,
        });
    }
};



const loginUser = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const loginData = await UserData.findOne({ email: email });
        if (loginData) {
            const isMatch = await Bcrypt.compare(password, loginData.password);
            if (isMatch) {
                const token = await loginData.generateAuthToken();
                const multiValue = { email: loginData.email, Token: token };
                res.status(201).json(multiValue);
            } else {
                res.status(400).json({ message: "Invalid Password" });
            }
        } else {
            res.status(400).json({ message: "Invalid E-mail" });
        }
        console.log("loginData>>", loginData);

    } catch (err) {
        console.log("Login error: " + err);
        res.status(400).send({
            message: `Error In Login Controllers`,
            success: false,
            err,
        });
    }
};


module.exports = {
    registerUser,
    loginUser,
};