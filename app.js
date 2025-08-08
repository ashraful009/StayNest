const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require('./models/listing'); 
const path = require("path")


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


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}))





// route 
app.get('/', (req, res) => {
  res.send('Root!');
});

//index route
app.get('/listings',async (req, res) => {
  const allListing =   await Listing.find({});
  res.render("listings/index.ejs", {allListing});
        
    });

// show route
app.get('/listings/:id',async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id.trim());
    res.render("listings/show.ejs", {listing});   
    });


// app.get('/testlistings', async (req, res) => {
//     let sampleListing = new Listing({
//         title: 'Sample Listing',
//         description: 'This is a sample listing.',
//         image: '',
//         price: 100,
//         location: 'Sample Location',
//         country: 'Sample Country'
//     });
//     await sampleListing.save();
//     console.log("sample listing created");
    
//     res.send('Sample listing created!');
// }); 

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});