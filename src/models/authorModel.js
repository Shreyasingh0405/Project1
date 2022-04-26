const mongoose = require("mongoose")
// var validator = require("email-validator");
// validator.validate("test@email.com");

const authorSchema = new mongoose.Schema({


    "firstName": {
        type: String,
        required: true
    },
    "lastName": {
        type: String,
        required: true
    },
    "title": {
        type: String,
        required: true,

        enum: ["Mr", "Mrs", "Miss"]
    },
    "email": {
        type: String,
        validate:{
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },

        required: true,
        unique: true
    },
    "password": {
        type: String,
        required: true
    }

}, { timestamps: true })

module.exports = mongoose.model("author", authorSchema)

