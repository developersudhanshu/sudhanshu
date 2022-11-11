const { register, user } = require('../config/db');

const mongoose = require('mongoose');

const crypto = require('crypto');
let key = "password";
let algo = "aes256";
//
const jwt = require('jsonwebtoken');
jwtKey = "key";


module.exports = {


    // // registration .......
    // userRegister : (req, res) => {

    //     try {
    //         if(req, res){
    //             register.findOne({email:req.body.email}, function (err, user) {
    //                 if(req.body.name.length > 0 && req.body.email.length > 0 && req.body.password.length > 0) {
                                    
                    
    //                     if(user) {
    //                         res.status(201).send({success:true, message:"Email already Exists !", data:user});
    //                         console.log("Email already Exists !");
    //                     }else{
    //                         var cipher = crypto.createCipher(algo, key);
    //                         var encrypted = cipher.update(req.body.password, 'utf8', 'hex') + cipher.final('hex');
    //                         console.log(encrypted);

    //                         // var find = register.findOne({email:email});
    //                         // console.log('equal 2 :' + find);

    //                         // let all = register.find({});
    //                         // console.log("email 10 : " + all);
    //                         // var email = req.body.email;
    //                         // console.log("email 11 "+email);
    //                         // var find = register.find({email:req.body});
    //                         // console.log("email 1 : " + find);
    //                         // if(find == req.body.email){
    //                         //     console.log("email 2  " );
    //                         // }else{
    //                         //     console.log("email 3  " );
    //                         // }
                            
    //                         try {
    //                             if(req.body.password != req.body.confirmedPassword){
    //                                 res.send('Error, Password and confirm Password not match !');
    //                                 console.log('Error, Password and confirm Password not match !');
    //                             }else{
    //                                 const data = new register({
    //                                     _id:mongoose.Types.ObjectId(),
    //                                     name:req.body.name,
    //                                     email:req.body.email,
    //                                     password:encrypted,
    //                                     confirmedPassword: req.body.confirmedPassword,
    //                                     role: "USER"
    //                                 })
    //                                 data.save().then((result) => {
    //                                     // res.send(result);
    //                                     // console.log(result);
    //                                     jwt.sign({result},jwtKey,{expiresIn:'300s'},(error, token) => {
    //                                         res.status(201).send({success:true, message:"Register Successfully !", data:token});
    //                                     });
    //                                 });
    //                             }
                                
    //                         } catch (error) {
    //                             res.status(400).send({ success:false, message:error });
    //                             console.log(error);
    //                         }
    //                         // const data = new register({
    //                         //     _id:mongoose.Types.ObjectId(),
    //                         //     name:req.body.name,
    //                         //     email:req.body.email,
    //                         //     password:encrypted,
    //                         //     confirmedPassword: req.body.confirmedPassword
    //                         // })
    //                         // data.save().then((result) => {
    //                         //     // res.send(result);
    //                         //     // console.log(result);
    //                         //     jwt.sign({result},jwtKey,{expiresIn:'300s'},(error, token) => {
    //                         //         res.status(201).send({success:true, message:"Register Successfully !", data:token});
    //                         //     });
    //                         // });

    //                         }
    //                     }else {
    //                         res.status(400).send({ success:false, message:"Please check your Fields !" });
    //                         console.log('Please check your Fields !')
    //                     }   
                    
    //                 });
    //         }

            

    //     } catch (error) {
    //         res.status(400).send({ success:false, message:error });     
    //         console.log("Not Register successfully !")       
    //     }
    // },

    // userLogin : (req, res) => {
    //     try {  
    //         // let unique = register.findOne({email:req.body.email}, function (err, user) {
    //         //     console.log("user : "+user.email);
    //         //     if(user.email == req.body.email) {
    //         //         res.status(201).send({success:true, message:"Email already Exists !", data:user});
    //         //         console.log("Email already Exists !");
    //         //     }else{}});
    //         // console.log("unique "+ unique);

    //         // register.findOne({email:req.body.email}).then(( (data) => {
    //         //     // console.log("email check 4455 : " + data.email);
    //         //     if(data.email == req.body.email){
    //         //         console.log("email found 1155 !");
    //         //     }else{
    //         //         console.log("email not found 2255 !");
    //         //     }}));

    //         // let meto = register.findOne({email:req.body.email});



    //         register.findOne({email:req.body.email}).then(( (data) => {                   
    //             if(req.body.email.length > 0 && req.body.password.length > 0) {
                
    //                 if(data === null){
    //                     res.status(400).send({success:false, message: "Please Check your Email !"});
    //                     console.log("Please Check your Email !");
    //                 }else{                    
    //                     var decipher = crypto.createDecipher(algo, key);
    //                     var decrypted = decipher.update(data.password, 'hex', 'utf8') + decipher.final('utf8');
    //                     console.log(decrypted); 
                                                        
    //                     if(decrypted == req.body.password){
    //                         jwt.sign({data},jwtKey,{expiresIn:'300s'},(error, token) => {
    //                             if(error) {
    //                             res.status(400).send({success:false, message: error});
    //                             };
    //                             res.status(201).send({success:true, message:"Login Successfully !", data:token, user:data});
    //                             console.log('token :', token);
    //                             console.log('res.status :',res.status)
    //                             // if (token) {
    //                             //     res.redirect('/');                                                       
    //                             // }                               

    //                         })
    //                     }else{
    //                         res.status(400).send({ success:false, message:"Not Login !" });
    //                         console.log("Error: Not login successfully !")
    //                     }                    
    //                 }          

    //             }else {
    //                 res.status(400).send({ success:false, message:"Please check your Fields !" });
    //                 console.log('Please check your Fields !')
    //             }                
    //         }));
    //     } catch (error) {
    //         res.status(400).send({ success:false, message:error });    
    //         console.log("Not login successfully !")        
    //     }
    // },


}
    