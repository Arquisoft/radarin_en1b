const mongoose = require("mongoose");

const schema = mongoose.Schema({
    webId: String, // Unique identifier (Solid)
    location: { // Point (GeoJSON)
        type: { 
            type: String,
            enum: ["Point"],
            required: true
        },
        coordinates: { // Longitude first, not latitude
            type: [Number],
            required: true
        }
    },
    lastUpdate: Date,
    role: String,
    banned: Boolean
});

schema.index({ location: "2dsphere" }); // Index creation over location
                                       // to speed up geospatial queries

module.exports = mongoose.model("User", schema);