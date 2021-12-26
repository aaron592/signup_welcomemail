const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{type:String, required:true},
    username:{type:String, required:true, unique:true},
    password:{type:String, required:true, minlength:6},
    email:{type:String, required:true,unique:true}
},
{timestamps:true});

const userModel = new mongoose.model('users',userSchema);

module.exports = userModel;