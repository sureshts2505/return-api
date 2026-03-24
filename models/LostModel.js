const mongoose = require("mongoose")

const  LostSchema = new mongoose.Schema ({
    LostBy : String,
    itemName : String,
    description : String,
    location : String,
    Date : String,
    image : String,
    contact : String

})

module.exports = mongoose.model("losts" , LostSchema)