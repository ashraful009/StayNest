const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require('./models/listing'); // Adjust the path as necessary


// route 

app.get('/', (req, res) => {
  res.send('Root!');
});

app.get('/testlistings', async (req, res) => {
    let sampleListing = new Listing({
        title: 'Sample Listing',
        description: 'This is a sample listing.',
        image: '',
        price: 100,
        location: 'Sample Location',
        country: 'Sample Country'
    });
    await sampleListing.save();
    console.log("sample listing created");
    
    res.send('Sample listing created!');
}); 

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});