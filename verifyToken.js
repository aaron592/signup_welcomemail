const jwt = require("jsonwebtoken");


function verifyToken(req,res,next){
   if(req.headers.authorization!==undefined){
      let token = req.headers.authorization.split(" ")[1];
      jwt.verify(token,"unlock",(err,userCred)=>{
          if(err===null){
              next();
          }else{
              res.send({message:"Invalid token"});
          }
      });
   }
   else{
       res.send({message:"Token required"});
   }
}


module.exports = verifyToken;