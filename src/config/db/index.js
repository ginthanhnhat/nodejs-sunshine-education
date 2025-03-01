const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/sunshine_education_dev')
        console.log('Database connected!')
    } catch (error) {
        console.log('Database failed!', error)
    }
}

module.exports = { connect }