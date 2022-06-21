
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var user_schema=new  Schema({
    name:{
        type:String,
        required:true
    },pwd:{
        type:String,
        required:true
    },dob:{
        type:Date
    },role:{
        type:Array,
       
    },batsman_style:{
        type:String
    },bowler_style:{
        type:String
    },team:{
        type:String,
      
    }



},{
    collection:'Register',
    timestamps:true
})
module.exports=mongoose.model('Register',user_schema);

