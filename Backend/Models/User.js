const mongoose = require("mongoose");
require("dotenv").config();
const Validator = require("validator");
const Bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const SECRET_KEY = process.env.JWT_SECRET_KEY

const userSchema = new mongoose.Schema({
    name: {
        type: 'String',
        require: 'true',
        minlength: 2,
    },
    email: {
        type: String,
        require: true,
        unique: [true, "E-mail is already here"],
        validate(value) {
            if (!Validator.isEmail(value)) {
                throw new Error("Invalid E-mail");
            }
        },
    },
    mobile: {
        type: 'Number',
        require: true,
        min: 10,
        unique: [true, "Mobile Number Already Exists"],
    },
    role: {
        type: 'String',
        enum: ['student', 'staff', 'administrator'],
        defaultValue: 'student',
        require: true,
    },
    password: {
        type: 'String',
        require: true,
        min: 6,
    },
    address: {
        type: 'String',
        require: true,
    },
    token: {
        type: String,
        require: true,
    },
});

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await Bcrypt.hash(this.password, 10);
        next();
    }
});

userSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign(
            {
                id: this._id,
                email: this.email,
                iat: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
            },
            SECRET_KEY, {
            expiresIn: "1d",
        }
        );
        this.token = token;
        await this.save();
        // console.log("TokenKey>>>>", token);
        return token;
    } catch (err) {
        console.log("Schema token Error>>", err);
    }
};

const userSchemaData = new mongoose.model("User", userSchema);

module.exports = userSchemaData;