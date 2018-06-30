const mongoose = require('mongoose');
const config = require('../config/database');

//lab schema
const LabSchema = mongoose.Schema ({
    labname:{
        type:String,
        required:true
    },
    description:{
        type:String
    }
});

const Lab = module.exports = mongoose.model('Lab',LabSchema);

module.exports.addLab = function(newLab,callback) {
        newLab.save(callback);    
    }   


module.exports.getLabs = function(callback){
     Lab.find({},callback);
}
//delete a lab from the database
module.exports.deleteLab = function(id,callback){
    const query = {_id:id}
    Lab.remove(query,callback);
}

module.exports.editLab = function(id,callback){
    const query = {_id,id}
    Lab.update(query,callback);
}


    


