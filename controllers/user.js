const express = require('express');
const mongoose= require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')

const userModel = require('../models/user_model');
const verifyToken = require('../verifyToken');

const router = express.Router();

router.post("/signup",verifyToken,(req,res) => {
   let user = req.body;
   let email = req.params.email;
   bcryptjs.genSalt(10,(err,salt) => {
       bcryptjs.hash(user.password,salt,(err,enc_password) => {
           if(err===null){
               user.password=enc_password;
               let userObj = new userModel(user);
               userObj.save()
               .then((data) => {
                   res.send({message:"User created"});
                   
       
               })
               .catch((err) => {
                   console.log(err);
                   res.send({message:"Some error in creating user"})
               })
           }

       })
   })
})


router.get("/send/:email",(req,res)=>{
    let email = req.params.email;
    let transport = nodemailer.createTransport({
        service: "gmail",
        auth:{
            user:"//emailid",
            pass:"//pass",
        }
    })

    let mailData ={
        from:"//emailid",
        to:email,
        subject:"Welcome mail",
        text:"Thank you for signing up",
        html:`<div style="height:100%;width:100%;background-color:lightgray;color:white;text-align:center;font-size:60px;">

        INVITE LINK Please click here 
        </div>`
    }

    transport.sendMail(mailData,(error,info) => {
        if(error!=null) {
            console.log(error);
            res.send({message:"problem while sending email"});
        }
        else{
            res.send({message:"Welcome mail sent successfully"});
        }
    })
       
      
               
})



router.post("/login",verifyToken,(req,res) => {
    let userCred = req.body;
    userModel.findOne({username:userCred.username})
    .then((user)=>{
        if(user!=null){
            bcryptjs.compare(userCred.password,user.password,(err,result)=>{
                if(result===true){
                   jwt.sign(userCred,"unlock",(err,token)=>{
                       if(err===null){
                           res.send({token:token})
                       }else{
                           res.send({message:"Token expired"})
                       }
                   })
                }else{
                    res.send({message:"Incorrect password"})
                }

            })
        }else{
            res.send({message:"Incorrect username"})
        }

    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"Some error while login"});
    })
})


module.exports = router;