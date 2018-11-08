const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
let UserSchema = new Schema({
    name:{
        type:String,
        required:true       
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
        default:''     
    },
    userType:{
        type:String,
        default:'student'
    },
    country:{
        type:String,
        required:true
    },
    state:{
        type:String,
        default:""
    },
    city:{
        type:String,
        default:""
    },
    zip:{
        type:String,
        default:""
    },
    address:{
        type:String,
        default:''        
    },
    profile:{
        type: String,
        default: ''
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