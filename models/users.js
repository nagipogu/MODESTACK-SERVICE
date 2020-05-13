const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
  
    Date:{
        type:Date,
        default:Date.now
    },
    
    accessToken:{
        type:String,
        default:''
    }

})

module.exports = Users = mongoose.model("Users", UserSchema);