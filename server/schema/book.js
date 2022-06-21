var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var book_schema=new  Schema({
    theatre_name:{
        type:String,
     
    },movie_name:{
        type:String,
    },dob:{
        type:Date
    },booked_seats:{
        type:Array,
    },total_seats:{
        type:Number,
        default:20
    }
    

},{
    collection:'book',
    timestamps:true
})

module.exports=mongoose.model('book',book_schema);

