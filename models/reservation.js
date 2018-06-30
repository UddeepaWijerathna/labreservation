const mongoose = require('mongoose');
const config = require('../config/database');

//Reservation schema
const ReservationSchema = mongoose.Schema ({

    username:{
        type:String,
        required:true
    },
    useremail:{
        type:String,
        required:true
    },
    labname:{
        type:String,
        required:true
    },
    reserveddate:{
        type:String,
        required:true
    },
    from:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    }
});

const Reservation = module.exports = mongoose.model('Reservation',ReservationSchema);

module.exports.addReservation = function(newReservation,callback) {
        newReservation.save(callback);    
    }   


module.exports.getAllReservations = function(callback){
    
     Reservation.find({},callback);
}

//find reservation by username
module.exports.getMyReservations = function(username,callback){
    console.log("cat");
    const query = {username:username};
    Reservation.find(query,callback);

}




//delete reservation
module.exports.deleteReservation = function(id,callback){
    const query = {_id:id}
    Reservation.remove(query,callback);
}

module.exports.editReservation = function(id,eReservation,callback) {
    const query = {_id:id}
    eReservation.update(query);
}

// module.exports.compareDateTimeLab = function(neweservation,hash,callback) {
//     compare(neweservation,hash,(err,isMatch) => {
//         if(err) throw err;
//         callback(null,isMatch); 
//     });  

// }











