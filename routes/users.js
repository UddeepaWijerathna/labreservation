const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database')
const User = require('../models/user');

//register
router.post('/register',(req,res,next) => {
    let newUser = new User({
        username:req.body.username,
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    });


        User.addUser(newUser,(err,user) => {
            if(err){
                res.json({success:false,msg:'Failed to register User'});
            } else {
                res.json({success:true,msg:'User Registered Succuessfully'});
            }
        });
   });
//login
router.post('/authentication',(req,res ,next) => {
    const email = req.body.email;
    console.log(email);
    const password = req.body.password;
    console.log(password);
     
//checkin whether the email is in the database and get it    
    User.getUserByEmail(email,(err,user) => {
        if(err) throw err;
        if(!user) {
            return res.json({success:false,msg:'User not found'});
        }
    // checkin whether the corresponding email is match with the 
    //password in the database and user entered password    
        User.comparePassword(password,user.password,(err,isMatch) => {
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign({data:user},config.secret, {
                    expiresIn:604800 //1 week
                });
                
                res.json({
                    success:true,
                    token:'JWT '+token,
                    user: {
                        id:user._id,
                        username:user.username,
                        name:user.name,
                        email:user.email    
                    }
                });
            
            } else {
                 return res.json({success:false,msg:'Wrong password'});
            }
        });
    });
});


//profile authentication
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    res.json({user: req.user});
  });







module.exports = router;