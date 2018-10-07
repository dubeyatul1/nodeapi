const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
let UserSchema = new Schema({
    firstName:{
        type:String,
        required:true,        
    },
    lastName:{
        type:String,
        default:'',        
    },
    email:{
        type:String,
        required:true,
        unique:true        
    },
    password:{
        type:String,
        required:true,
        min:3        
    },
    phone:{
        type:String,
        default:'',        
    },
    address:{
        type:String,
        default:'',        
    },
    assignment:[{
        type:Mongoose.Schema.Types.ObjectId,
        ref:"Assignment",
        default:""
    }]
},{
    timestamps:true
});

let Users = Mongoose.model('User',UserSchema);
module.exports = Users;