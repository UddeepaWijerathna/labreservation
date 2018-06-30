const express = require('express');
const router = express.Router();
const config = require('../config/database')
const Lab = require('../models/lab');

//add a new lab
router.post('/Newlab',(req,res,next) => {   
    let newLab = new Lab({
        labname:req.body.labname,
        description:req.body.description
    }); 
    
    Lab.addLab(newLab ,(err,user) => {
            if(err) {
                res.json({success:false,msg:'Failed to add '});
            } else {
                res.json({success:true,msg:'Added Succuessfully'});
            }
        });
   });
//getting all the labs in the database
router.get('/alllabs',(req,res,next) => {
    Lab.getLabs((err,lablist) => {
        if(err){
            res.json({success:false,msg:'failed to load all labes'});
        } else {
            res.json({success:true,lablist:lablist});
        }
    });
})
//delete lab in the database
router.delete('/:id',(req,res,next) => {    
    const id = req.params.id;
    Lab.deleteLab(id,(err,lab) => {
        if(err){
            res.json({success:false,msg:'Something went worng'})
        } else {
            res.json({success:true,msg:'lab details deleted successfully'});
        }
    });
});

router.post('/editLab/:id',(req,res,next) =>{
    const id = req.params.id;
    Lab.editLab(id,(err,lab) =>{
        if(err){
            res.json({success:false,msg:'Something went wrong'});
        } else {
            res.json({success:true,msg:'Lab details Edited Successfully'});
        }
    });
});


module.exports = router;