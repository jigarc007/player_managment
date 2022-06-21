var express=require('express');
var router=express.Router();
var User=require('../schema/register');
var Player=require('../schema/player')
var jwt=require("jsonwebtoken")
var multer=require("multer");
var bcrypt=require("bcrypt")
var prev_pwd=""
router.use('/upload',express.static('upload'));
var storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./upload/');
    },
    filename:function(req,file,cb){
        cb(null,new Date().getTime()+file.originalname)
    }
})
const fileFilter=(req,file,cb)=>{
    var allowed_types=['image/png','image/jpg','image/jpeg', 'image/pjpeg', 'image/png','image/PNG','image/JPG']
    if(allowed_types.includes(file.mimetype)){
        console.log("img")
        cb(null,true);
    }else{
        req.fileFilterValidation="not allowed file type";
        cb(null,false);
    }
}
const secret="some secret";
var upload=multer({
storage:storage,limit:{
    fileSize:1024*1024*5

},fileFilter:fileFilter
}).single("profile_img")
function generate_token(data){
    return jwt.sign(data,secret);
    }
router.post("/register",function(req,res){
    
    var user=new User(req.body);
    user.save().then(res.send(user)).catch(error=>res.send(error));


})

// function(req,res,next){
  
//     Player.find({name:req.body.name},function(error,data){
//         if(data){
           
//         return res.send("username  is already taken")
      
//         }
//         else
//         return next();
//     })
// }

router.put("/update_user/:id",function(req,res){upload(req,res,async function(error){
    if(req.fileFilterValidation){
        res.status(401).send("not allowed img file type")
    }
try{
    var img;
    var id=req.params.id
    console.log("id",id)
    console.log("body",req.body)
   
    if(req.file==undefined){
        console.log("old")
    img=req.body.profile_img
    }else{
    img=req.file.filename
    console.log("new")
        
}
    console.log(img)
var player=await Player.findByIdAndUpdate({_id:req.params.id},{...req.body,profile_img:img})
console.log("player",player)
if(player!=""){
  
    res.send(player)
   
}
}catch(error){
    if(error.code==11000){
        res.status(401).send("username is already taken")
       }else
       console.log(error)
       res.send(error)
       
}
});
})
router.post("/list_user_by_id",async function(req,res){
console.log("body",req.body)

    try{
        var player=await Player.find({_id:req.body});
        console.log(player)
        res.send(player)


    }catch(error){
        res.send(error)
    }
})
//db.player.find({$or:[{"name": /j/},{"player_role":/b/}]}).pretty()
router.get("/search",async function(req,res){
    var text=req.query.search
    
    var per_page_record=Number(req.query.limit);
    var page=req.query.page;
    var skip=per_page_record*(page-1)
    var team=req.query.filter?req.query.filter:"";
    var sort_type=Number(req.query.type);
    console.log("type",sort_type)
    var query;
    try{
        console.log(text)
        console.log("page",page)
        console.log("team",team)
        if(team==""){
            console.log("hiii")
            var query={user_role:{$ne:"admin"},$or:[{"name":{$regex:text,$options: "$i"}},{"player_role":{$regex:text,$options: "$i"}},{"batsman_style":{$regex:text,$options: "$i"}},{"bowler_style":{$regex:text,$options: "$i"}},{"team":{$regex:text,$options: "$i"}}]
        };
     
        }
    else{
        var query={user_role:{$ne:"admin"},team:team,$or:[{"name":{$regex:text,$options: "$i"}},{"player_role":{$regex:text,$options: "$i"}},{"batsman_style":{$regex:text,$options: "$i"}},{"bowler_style":{$regex:text,$options: "$i"}},{"team":{$regex:text,$options: "$i"}}]
    };
   
console.log("hiii1")
    }
    var player=await Player.find(query).sort({name:sort_type}).limit(per_page_record).skip(skip)
   
    console.log(player)
    var cnt=await Player.find(query);
    if(player)
res.send({"player":player,"current_page":page,"total_record":cnt.length})
else{
    res.status(404).send("no record found")
}
    }catch(error){
        res.send(error)
    }
})
router.post("/create_player",
function(req,res){upload(req,res,async function(error){
    
   if(req.fileFilterValidation){
       res.status(401).send("not allowed img file type")
   }
 
try{
    
    let hash =await bcrypt.hashSync(req.body.pwd,10);
   
   
        var player=await Player.create({...req.body,profile_img:req.file.filename,pwd:hash})
        if(player)
        res.send({username:player.name});
  
    
    
    
}catch(error){
console.log(error)
    if(error.code==11000){
     res.status(401).send("username is already taken")
    }else
    res.send(error)
}


});
})
router.post("/login",function(req,res,next){
    User.findOne({name:req.body.name},function(error,data){
        if(error){
            res.status(404).send("no record found")
        }
        if(data){
         
        return next();
       
        }
        else
        return res.status(201).send({error_msg:"username is invalid"});
      
       

    })
},function(req,res){

    User.findOne({pwd:req.body.pwd},function(error,data){
        if(error){
            res.status(404).send("no record found")
        }
        if(data)
      
        res.send({token:generate_token({name:data.name,pwd:data.pwd})})

        else
        return res.status(201).send({error_msg:"password is invalid"});
        
      
    })

})
router.post("/login_player",function(req,res,next){
    Player.findOne({name:req.body.name},function(error,data){
        if(error){
            res.status(404).send("no record found")
        }
        if(data){
            req.old_pwd=data.pwd;
        prev_pwd=data.pwd
        return next();
        }
        else
        return res.status(401).send("Username is invalid");
      
       

    })
},function(req,res){
   
    if(bcrypt.compareSync(req.body.pwd,req.old_pwd)){
        console.log("password match")
    Player.findOne({pwd:req.old_pwd},function(error,data){
        if(error){
            res.status(404).send("no record found")
        }
        if(data)
      
        res.send({id:data._id,role:data.user_role,token:generate_token({name:data.name,pwd:data.pwd})})

        else
        return res.status(401).send("password is invalid");
        
      
    })
}else{
    return res.status(401).send("password is invalid");
        
}

})
router.delete("/delete_user/:id",async function(req,res){
    console.log(req.params.id)
    
try{
    var player=await Player.findByIdAndDelete({_id:req.params.id})
    console.log(player)
    if(player)
    res.send(player)
    else
    res.status(404).send("error in deleting")
}catch(error){
    res.send(error);
}
})
router.get("/list_user",async function(req,res){

     var tot_record=Player.count();
    var per_page_record=Number(req.query.limit);
    var page=req.query.page;
    var skip=per_page_record*(page-1)
    console.log("limit",per_page_record)

console.log("skip",skip)
    
try{
   var player=await Player.find({user_role:{$ne:"admin"}}).sort({updatedAt:-1}).limit(per_page_record).skip(skip)
  //console.log(player)
//   player.push("current_page",page)
// player.push("tot",player.length)
var cnt=await Player.find({user_role:{$ne:"admin"}});
console.log(cnt.length)
res.json({"player":player,"current_page":page,"total_record":cnt.length})
   res.send(player);
}
catch(error){
    res.send(error);
}
})



module.exports=router;
