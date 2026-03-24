const mongoose = require("mongoose")

const  FoundSchema = new mongoose.Schema ({
    FoundBy : String,
    itemName : String,
    description : String,
    location : String,
    Date : String,
    image : String,
    contact : String

})

module.exports = mongoose.model("founds" , FoundSchema)