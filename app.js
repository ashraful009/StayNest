const express = require('express');
const app = express();
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


// route 

app.get('/', (req, res) => {
  res.send('Root!');
});



app.listen(8080, () => {
  console.log('Server is running on port 8080');
});