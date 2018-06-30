

const express = require('express');
const router = express.Router();
const config = require('../config/database')
const Reservation = require('../models/reservation');
//add reservation
router.post('/newreservation',(req,res,next) => {   
    let newReservation = new Reservation ({
        username:req.body.username,
        useremail:req.body.useremail,
        labname:req.body.labname,
        reserveddate:req.body.reserveddate,
        from:req.body.from,
        to:req.body.to
    }); 
    

    
    Reservation.addReservation(newReservation ,(err,user) => {
            if(err) {
                res.json({success:false,msg:'Failed to make reservation'});
            } else {
                res.json({success:true,msg:'Reservation make successfully'});
            }
        });
   });
//get all reservations
router.get('/allreservations',(req,res,next) => {
    Reservation.getAllReservations((err,reservelist) => {
        if(err){
            res.json({success:false,msg:'Failed to make get request'});
        } else {
            res.json({success:true,reservelist:reservelist});
        }
    });
})


//get only logged users' reservations
router.get('/myreservations/:username',(req,res,next) => {
    const username = req.params.username;
    console.log(username);
    Reservation.getAllReservations((err,reservelist) => {
        if(err){
            res.json({success:false,msg:'Failed to make get request'});
        } else {
            res.json({success:true,reservelist:reservelist});
        }
    });
});
 


//delete reservation
router.delete('/:id',(req,res,next) => {   
    const id = req.params.id;
    console.log(id);
    Reservation.deleteReservation(id,(err,lab) => {
        if(err){
            res.json({success:false,msg:'Something went worng'})
        } else {
            res.json({success:true,msg:'Deleted successfully'});
        }
    });
});

//edit reservation
router.post('/editreservation/:id',(req,res,next) => {
    const id = request.params.id;   
    let newReservation = new Reservation ({
        username:req.body.username,
        useremail:req.body.useremail,
        labname:req.body.labname,   
        reserveddate:req.body.reserveddate,
        from:req.body.from,
        to:req.body.to
    }); 
    
    Reservation.editReservation(id,newReservation ,(err,user) => {
            if(err) {
                res.json({success:false,msg:'Failed to make reservation'});
            } else {
                res.json({success:true,msg:'Reservation make successfully'});
            }
        });
   });







module.exports = router;