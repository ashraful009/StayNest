const mongoose  = require('mongoose');
const express = require('express');
const Schema = mongoose.Schema;


  /*image: {
    type: String,
    default: "https://studiowebcast.fr/wp-content/uploads/2021/09/definition-webcast-flash-forward-768x500.jpg",
    set: (v) => v === '' ? "https://studiowebcast.fr/wp-content/uploads/2021/09/definition-webcast-flash-forward-768x500.jpg" : v,
  }
*/


const listingSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  location: String,
  country: String,
  image: {
    filename: String,
    url: String,
  }
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;   
