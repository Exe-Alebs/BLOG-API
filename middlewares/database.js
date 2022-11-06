const mongoose = require('mongoose')
require('dotenv').config();

const MONGO_DB_CONNECTION_URL= process.env.MONGO_DB_CONNECTION_URL

//connect to mongoDB
function connectToMongoDB(){
    mongoose.connect(MONGO_DB_CONNECTION_URL)

             .then( () => {
        console.log("O ti connect")
    })
             .catch( (err) => {
        console.log("connection failed" , err.message)
    });

};

module.exports = { connectToMongoDB } ;