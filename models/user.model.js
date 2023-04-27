const mongoose= require('mongoose');

const userSchema = mongoose.Schema({
    name :String,
    bio:String,
    phone:Number,
    email:String,
    password:String
});


const User = mongoose.model('user',userSchema);

module.exports= {
    User
}