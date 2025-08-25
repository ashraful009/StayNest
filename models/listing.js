const mongoose  = require('mongoose');
const express = require('express');
const Schema = mongoose.Schema;



const listingSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  location: String,
  country: String,
  image: {
    filename: String,
    url: String,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Review",
    },
  ]
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;   
