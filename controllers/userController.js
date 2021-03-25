const passport = require('passport')
const router = require('express').Router();
const userModel = require('../models/users/userModel');

router.post('/register', userModel.registerUser);
router.post('/login', passport.authenticate('local'),
function(req, res){
    res.status(200).send(req.user)
    
})


module.exports = router;