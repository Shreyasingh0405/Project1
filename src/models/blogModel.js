const mongoose = require("mongoose")
const moment = require("moment")
const ObjectId = mongoose.Schema.Types.ObjectId


let date = moment().format('DD/MM/YYYY');
console.log(date)


const blogSchema = new mongoose.Schema({

    "title": {
        type: String,
        required: [true,"title is required"],
        trim : true,
    },


    "body": {
        type: String,
        required: [true, "body is required"],
        trim : true
    },


    "authorId": {
        type: ObjectId,
        ref: "author",
        required :[true,"authorId is required"]
    },


    "tags": [{type : String}],

    "category": {
        type: String,
        required: [true,"category is required"]
      
    },

    "subcategory": [{type : String}],

    "isPublished": {
        type: Boolean,
        default: false
    },


    "publishedAt": Date, 
    date : {
        type : String,
      default : date
    },


    "deleted": {
        type: Boolean,
        default: false
    },

    
    "deletedAt": Date,
    date : {
        type : String,
      default : date
    }, 

}, { timestamps: true })

module.exports = mongoose.model("blog", blogSchema)

