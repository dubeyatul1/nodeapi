const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
let AssignmentSchema = new Schema({
    orderId:{
        type:String,
        required:true,         
        unique:true            
    },
    deadLine:{
        type:Date,
        default:'',        
    },
    status:{
        type:String,
        default:'Unclaim'       
    },
    user:{
        type:Mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:"User is required"
    }
},{
    timestamps:true
});

let Assignments = Mongoose.model('Assignment', AssignmentSchema);
module.exports = Assignments;