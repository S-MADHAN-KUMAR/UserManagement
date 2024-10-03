const mongoose = require('mongoose')

const connectDB = async (params) => {
    try{
        const conn = await mongoose.connect('mongodb://localhost:27017/userAuth', {});

        console.log(`MongoDB Connected : ${conn.connection.host}`)
    }
    catch(err){
        console.log(err)
        process.exit(1)
    }
}

module.exports = connectDB