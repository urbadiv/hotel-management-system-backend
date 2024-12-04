const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategorySchema = new Schema({ //object ekak hadanwa wage deyak

    name : {
        type : String,
        require: true
    },
    description : { //pid = quantity
        type : String,
    },
    image: {
        data: Buffer, // Binary data for image
        contentType: String // Mime type of the image
    }
    

})

const Category = mongoose.model("category",CategorySchema); //table name, schema

module.exports = Category; //export
