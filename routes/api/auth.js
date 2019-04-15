const express = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const router = express.Router();

// Impoering model
const User = require("../../models/User");

// @POST    api/auth
// @desc    Auth User
// @access  Public
router.post("", (req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({msg: "Please enter all fields"});
    }

    User.findOne({email}).then(user => {
        if(!user) return res.status(400).json({msg: "User does not exist"});
        bcrypt.compare(password, user.password)
        .then(isMatch => {
            if(!isMatch) return res.status(400).json({msg: "Invalid credentials"});
            jwt.sign(
                { id: user.id }, 
                config.get("jwtSecret"), 
                {expiresIn: 3600}, 
                (err, token) => {
                    if(err) throw err;
                    res.json({user: {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    }, token});
                }
            );
        })
    });
});

// @GET     api/auth/user
// @desc    Get User Data
// @access  Private
router.get("/user", auth, (req, res) => {
    User.findById(req.user.id).select("-password")
    .then(user => res.json(user));
})

module.exports = router;