var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var bcrypt=require("bcrypt")
var player_schema=new  Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },pwd:{
        type:String,
        required:true
    },dob:{
        type:Date
    },profile_img:{
        type:String,
    },player_role:{
        type:Array,
    },batsman_style:{
        type:String
    },bowler_style:{
        type:String
    },team:{
        type:String,
    },user_role:{
        type:String,
        enum:['user','admin'],
        default:"user"

    }



},{
    collection:'player',
    timestamps:true
})
// exports.cryptPasssword=function(pwd,callback){
//     bcrypt.genSalt(10,function(err,salt){
//         if(err)
//             callback(err)
//     bcrypt.hash(pwd,salt,function(err,hash){
//         player=pwd
//         return callback(err,hash)
//     })
//     })
   
// }
module.exports=mongoose.model('player',player_schema);

