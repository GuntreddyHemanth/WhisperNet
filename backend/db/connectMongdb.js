const mongoose = require("mongoose");


const ConnectTOMongoose = async () => {
    try {
        mongoose.connect(process.env.MONGO_DB_URL)
        console.log("Successfully connected")
    } catch (error) {
        console.log("error connection to Mongdb", error.message)
    }
}

module.exports = { ConnectTOMongoose }
