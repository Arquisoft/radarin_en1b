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
        },
        banned: false
    });
	res.send(users);
});

// Add user (webId) or update its location/banned if it already exists
router.post("/users/add", async (req, res) => {
    let webId = req.body.webId;
    let location = req.body.location;
    let banned = req.body.banned;
    // Delete the user if already in the db
    let result = await User.remove({
        webId: webId
    });
    // And create it (again)
    let user = new User({
        webId: webId,
        location: {
            type: "Point",
            coordinates: location
        },
        lastUpdate: new Date(),
        role: (webId === "https://asw2021en1b.inrupt.net/profile/card#me") ? "ADMIN" : "NORMAL",
        banned: banned
    });
    await user.save();
    res.send(user);
});

// Returns whether the user (webId) in session is admin
router.post("/users/admin", async (req, res) => {
    let webId = req.body.webId;

    const users = await User.find({
        webId: webId,
        role: "ADMIN"
    });
	res.send(users.length !== 0);
});

// Checks if the user (webId) in session is banned
router.post("/users/banned", async (req, res) => {
    let webId = req.body.webId;

    const users = await User.find({
        webId: webId,
        banned: true
    });
	res.send(users.length !== 0);
});

// Gets all the normal users
router.get("/users/normal", async (req, res) => {
    const users = await User.find({
       role: "NORMAL"
    });
	res.send(users);
});

module.exports = router