const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require('./models/listing'); 
const path = require("path")
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate")
const Review = require('./models/review'); 
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
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));


// route 
app.get('/', (req, res) => {
  res.send('Root!');
});

//index route
app.get('/listings',async (req, res) => {
  const allListing =   await Listing.find({});
  res.render("listings/index.ejs", {allListing});
        
    });

  // new route
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs")
})

// show route
app.get('/listings/:id',async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id.trim());
    res.render("listings/show.ejs", {listing});   
    });

// Create Route
app.post("/listings", async (req, res) => {
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings")
  
})


//Edit Route
app.get("/listings/:id/edit", async(req, res) => {
  let {id} = req.params;
    const listing = await Listing.findById(id.trim());
    res.render("listings/edit.ejs", {listing});
})

//update route
app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, {...req.body.listing});
  res.redirect(`/listings/${id}`);
})

// Delete Route
app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect("/listings");
  
})

//reviews Route (post)
app.post("/listings/:id/reviews", async (req, res) =>{
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  
  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
  res.redirect(`/listings/${listing._id}`)
  
})



app.listen(8080, () => {
  console.log('Server is running on port 8080');
});