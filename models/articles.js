const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title:{
        type:String,
        require:true
    },
    body:{
        type:String,
        require:true
    },
    author:{
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

module.exports = Articles = mongoose.model("Articles", ArticleSchema);