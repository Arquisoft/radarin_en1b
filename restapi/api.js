const express = require("express");
const User = require("./models/users");
const router = express.Router();

// Find friends that are near the user (location) in session
router.post("/users/list", async (req, res) => {
    let location = req.body.location; // [longitude, latitude]
    let friends = req.body.friends; // [webId1, webId2, ...]
    let date = new Date();
    date.setMinutes(date.getMinutes() - 15); // Time (15 min)

    const users = await User.find({
        webId: { 
            $in: friends 
        },
        location: { 
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: location
                },
                $maxDistance: 1000, // Distance (1 km)
                $minDistance: 0
            } 
        },
        lastUpdate: {
            $gte: new Date(date.toISOString()) // Time (15 min)
        }
    });
	res.send(users);
});

// Add user (webId) or update its location if it already exists
router.post("/users/add", async (req, res) => {
    let webID = req.body.webId;
    let location = req.body.location;
    //Check if the user is already in the db
    let user = await User.findOne({ webId: webID });
    if (user) {
        user.location = {
            type: "Point",
            coordinates: location
        };
        user.lastUpdate = new Date();
        await user.save();
        res.send(user);
    } else {
        user = new User({
            webId: webID,
            location: {
                type: "Point",
                coordinates: location
            },
            lastUpdate: new Date()
        });
        await user.save();
        res.send(user);
    }
})

module.exports = router