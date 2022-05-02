const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const blogModel = require('../models/blogModel');


const isValidObjectId = (ObjectId) => {              //checks if a string is valid MongoDB ObjectId in Node.js
  return mongoose.Types.ObjectId.isValid(ObjectId);
};




const authentication = (req, res, next) => {
  try {
    let token = req.headers["x-Api-key"];                   //getting token from header

    if (!token) {                                          //if token is not present 

      token = req.headers["x-api-key"];                  //getting token from header
    }
    if (!token) {

      return res.status(401).send({ status: false, msg: "Token must be present" });
    }
    let decodedToken = jwt.verify(token, "project1-group3");              //verifying token with secret key


    if (!decodedToken) return res.status(401).send({ status: false, msg: "Token is incorrect" });

    next();                                                               //if token is correct then next function will be called respectively
  }
  catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
}







const authorization = async (req, res, next) => {
  try {
    let token = req.headers["x-Api-key"];

    token = req.headers["x-api-key"];

    let decodedToken = jwt.verify(token, "project1-group3");

    let loggedInUser = decodedToken.userId;

    let userLogging;

    if (req.body.hasOwnProperty('authorId')) {                            //if authorId is present in request body


      if (!isValidObjectId(req.body.authorId)) return res.status(400).send({ status: false, msg: "Enter a valid author Id" })

      userLogging = req.body.authorId;

    }

    if (req.params.hasOwnProperty('blogId')) {

      if (!isValidObjectId(req.params.blogId)) return res.status(400).send({ status: false, msg: "Enter a valid blog Id" })

      let blogData = await blogModel.findById(req.params.blogId);

      if (!blogData) return res.status(404).send({ status: false, msg: "Error, Please check Id and try again" });

      userLogging = blogData.authorId.toString();
    }

    if (req.query.hasOwnProperty('authorId')) {                             //if authorId is present in request query


      if (!isValidObjectId(req.query.authorId)) return res.status(400).send({ status: false, msg: "Enter a valid author Id" })

      let blogData = await blogModel.findOne({ authorId: req.query.authorId });

      if (!blogData) return res.status(404).send({ status: false, msg: "Error, Please check Id and try again" });

      userLogging = blogData.authorId.toString();                         //getting authorId from blog data using authorId and converting it to string
    }



    if (!userLogging) return res.status(400).send({ status: false, msg: "AuthorId is required" });


    if (loggedInUser !== userLogging) return res.status(403).send({ status: false, msg: "Error, authorization failed" });
    next();
  }

  catch (err) {

    res.status(500).send({ status: false, msg: err.message });

  }
}



module.exports = { authentication, authorization };
