var express=require('express');
var mongoose=require('mongoose');
var app=express();
var chalk=require('chalk');
var User=require('./routes/index');
var cors=require('cors');
app.use(cors());
app.use(express.json());

app.use("/",User);

mongoose.connect("mongodb://localhost:27017/demo_player");
mongoose.connection.on('error',function(error){
    if(error)
    console.log("connection error",error);

}).once('open',function(args){
    console.log("connected sucessfully.");
})

app.listen(3000,function(error){
    if(error)
    console.log("error in conect to server",error);
    console.log("server conected sucessfully");
})
