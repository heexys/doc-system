const nongoose = require('mongoose');
const colors = require('colors');
const { default: mongoose } = require('mongoose');

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Mongodb Connected ${mongoose.connection.host} ` .bgGreen.white);
    } catch (error) {
        console.log(`Mongodb Server Issue ${error}` .bgRed.white);
    }
};

module.exports = connectDB;