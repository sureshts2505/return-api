const mongoose = require("mongoose")
const url =  "mongodb://sureshts2505_db_user:suresh2505@ac-rcfff03-shard-00-00.njuyyn0.mongodb.net:27017,ac-rcfff03-shard-00-01.njuyyn0.mongodb.net:27017,ac-rcfff03-shard-00-02.njuyyn0.mongodb.net:27017/returnMe?ssl=true&replicaSet=atlas-g5729y-shard-0&authSource=admin&appName=Cluster0"

mongoose.connect(url)
.then(()=> console.log("connected to mongoDB"))
.catch((err)=> console.log(err.message))