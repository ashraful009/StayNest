const intData = require('./Data');
const Listing = require('../models/listing.js');
const mongoose = require('mongoose');

// Connect to MongoDB
const dbURI = "mongodb://127.0.0.1:27017/test";
main()
.then(() => {
    console.log('Connected to MongoDB');
    })
.catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

async function main(){
    await mongoose.connect(dbURI)
}

const intDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(intData.data);
    console.log('Initial data inserted');
}

intDB();