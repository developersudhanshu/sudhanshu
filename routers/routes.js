const express = require("express");
// const router = express.Router();
const mongoose = require("mongoose");
const multer = require("../multer");

const checkController = require("../controllers/checkController.js");
const registerController = require("../controllers/registerController.js");
const userController = require("../controllers/userController.js");
const leaveController = require("../controllers/leaveController.js");
const holidayController = require("../controllers/holidayController.js");
const designationController = require("../controllers/designationController.js");
const productController = require("../controllers/productController.js");
const categoryController= require("../controllers/categoryController.js");
const subCategoryController = require("../controllers/subCategoryController.js");

// const {check, register, user} = require('../config/db');

// const allusermodel = require('../models/user.js');
// const checkModel = require('../models/check.js');

// registration ......
// const registerModel = require('../models/register');
// const crypto = require('crypto');
// let key = "password";
// let algo = "aes256";
// //
// const jwt = require('jsonwebtoken');
// jwtKey = "key";

var app = express();
var routerFunction = (app) => {
  // // router.get('/', async (req, res) => {
  // app.get('/', async (req, res) => {
  //     const result = await user.find({});
  //     // res.send({user: result});
  //     // console.log(result);
  //     try{
  //         res.status(200).send({success:true ,message:"All data successfully Show !", data: result });
  //     }
  //     catch(err){
  //         res.status(400).send({success:false, message: err });
  //     }
  // });
  app.get("/user", userController.allUser);
  app.get("/user/(:_id)", userController.oneUser);
  app.post("/category", categoryController.createcategory)
  app.post("/product",multer.any(), productController.createProduct);
  app.get("/getproduct/(:_id)", productController.getallproducts);
  app.get("/getCategory",categoryController.categoryget);
  app.post("/categoryUpdate",categoryController.categoryUpdate);
  app.post("/deleteCategory",categoryController.categorydelete);
  app.post("/subCategory",subCategoryController.createsubcategory)
  app.post("/getSubCategory",subCategoryController.Subcategoryget);
  app.post("/updateSubCategory",subCategoryController.subcategoryUpdate)
  app.post("/deleteSubCategory",subCategoryController.subcategorydelete)


  // // router.post('/add', async (req, res) => {
  // app.post('/add', async (req, res) => {
  //     try{
  //         const createUser = new user({
  //             name: req.body.name,
  //             address: req.body.address,
  //             pan: req.body.pan,
  //             aadhaar: req.body.pan,
  //             photo: req.body.photo,
  //             joining_date: req.body.joining_date,
  //             // created_at: req.body.created_at,
  //             // modified_at: req.body.modified_at
  //         })
  //         const result = await createUser.save();
  //         // res.send({result});
  //         // console.log(result);
  //         try{
  //             res.status(200).send({success:true ,message:"Create successfully !", data: result });
  //         }
  //         catch(err){
  //             res.status(400).send({success:false, message: err });
  //         }
  //     }
  //     catch(err){
  //         console.log(err);
  //     }
  // });
  app.post("/add", multer.any(), userController.createUser);
  app.post("/createholiday", holidayController.createholiday);
  app.post("/designation", designationController.createdesignation);
  app.get("/holidayget", holidayController.holidayget);
  app.get("/designationget", designationController.designationget);

  // // router.delete('/delete', async (req, res) => {
  // app.delete('/delete', async (req, res) => {
  //     let _id = req.body._id;
  //     try{
  //         const result = await user.findByIdAndDelete({_id : _id});
  //         // res.send({delete: result});
  //         // console.log(result);
  //         try{
  //             res.status(200).send({success:true ,message:"Delete successfully !", data: result });
  //         }
  //         catch(err){
  //             res.status(400).send({success:false, message: err });
  //         }
  //     }catch(err){
  //         console.log(err);
  //     }
  // });
  app.delete("/delete/(:_id)", userController.deleteUser);
  app.delete("/designationdelete", designationController.designationdelete);

  // // router.put('/update/(:_id)', async (req, res) => {
  // app.put('/update/(:_id)', async (req, res) => {
  //     let _id = req.params._id;
  //     try{
  //         const result = await user.findByIdAndUpdate({_id : _id}, {
  //             $set: {
  //                 name: req.body.name,
  //                 address: req.body.address,
  //                 pan: req.body.pan,
  //                 aadhaar: req.body.pan,
  //                 photo: req.body.photo,
  //                 joining_date: req.body.joining_date
  //             }
  //         },{
  //             new: true
  //         });
  //         try{
  //             res.status(200).send({success:true, message:"Update successfully !", data: result });
  //         }
  //         catch(err){
  //             res.status(400).send({success:false, message: err });
  //             // console.log(err);
  //         }
  //     }catch(err){
  //         console.log(err);
  //     }
  // });
  app.put("/update/(:_id)", multer.any(), userController.updateUser);
  app.put("/designationUpdate/(:_id)", designationController.designationUpdate);
  app.put("/productUpdate/(:_id)",multer.any(),productController.updateproduct)

  // // check in / check out
  // app.post('/check', async (req, res) => {
  //     try{

  //         let checkin = req.body.checkin;
  //         if(checkin == true){
  //             const checkin = new check({
  //                 userid:req.body.userid,
  //                 checkin_time:Date.now()
  //                 // action:true
  //                 // checkin_time:checkin_time
  //             });
  //             const result = await checkin.save();
  //             res.send({success:true, message:"Update successfully !", data:result});
  //             console.log(result);
  //         }

  //         let checkout = req.body.checkout;
  //         if(checkout == true){
  //             try{
  //                 let _id = req.body._id;
  //                 const result = await check.updateOne({ _id : _id }, {
  //                     $set: {
  //                         // _id:req.body._id,
  //                         userid:req.body.userid,
  //                         checkout_time:Date.now()
  //                     }
  //                 },{
  //                     new: true
  //                 });
  //                 res.status(200).send({success:true, message:"Update successfully !", data: result });
  //                 // res.send({result});
  //                 console.log(result);
  //             }catch(err){
  //                 console.log(err);
  //             }
  //         }
  //     }
  //     catch(err){
  //         console.log(err);
  //     }
  // });
  app.post("/check", checkController.check);

  app.put("/check/update/(:_id)", checkController.updateCheck);
  app.put("/updates/(:_id)", holidayController.holidayUpdate);
  app.delete("/holidaydelete", holidayController.holidaydelete);
  app.delete("/deleteproduct/(:_id)",productController.deleteproduct)

  // // registration .......
  // app.post('/register', (req, res) => {
  //     var cipher = crypto.createCipher(algo, key);
  //     var encrypted = cipher.update(req.body.password, 'utf8', 'hex') + cipher.final('hex');
  //     console.log(encrypted);
  //     const data = new register({
  //         _id:mongoose.Types.ObjectId(),
  //         name:req.body.name,
  //         email:req.body.email,
  //         password:encrypted
  //     })
  //     data.save().then((result) => {
  //         // res.send(result);
  //         // console.log(result);
  //         jwt.sign({result},jwtKey,{expiresIn:'300s'},(error, token) => {
  //             res.status(201).send({success:true, message:"Register Successfully !", data:token});
  //         });
  //     });
  // });
  // app.post('/register', registerController.userRegister);
  app.post("/register", userController.userRegister);

  // app.get('/login', (req, res) => {
  //     register.findOne({email:req.body.email}).then(( (data) => {
  //         var decipher = crypto.createDecipher(algo, key);
  //         var decrypted = decipher.update(data.password, 'hex', 'utf8') + decipher.final('utf8');
  //         console.log(decrypted);
  //         if(decrypted == req.body.password){
  //             jwt.sign({data},jwtKey,{expiresIn:'300s'},(error, token) => {
  //                 if(error) {
  //                 res.status(400).send({success:false, message: error});
  //                 };
  //                 res.status(201).send({success:true, message:"Login Successfully !", data:token});
  //                 console.log(token);
  //             })
  //         }
  //         // res.status(201).send({data});
  //         // console.log(data);
  //     }))
  // });
  // app.post('/login', registerController.userLogin);
  app.post("/login", userController.userLogin);

  // leave ...........
  app.post("/createLeave", leaveController.createLeave);
  app.get("/user/leave/(:_id)", userController.leaveOneUser);
  app.get("/allUserLeaves", userController.allUserLeave);
  app.put("/updateLeave/(:_id)", leaveController.leaveUpdate);
  app.delete("/deleteLeave/(:_id)", leaveController.deleteUserLeave);
  app.put("/userLeaveStatus/(:_id)", leaveController.changeLeaveStatus);
  app.put("/adminUpdateLeave/(:_id)", leaveController.adminLeaveUpdate);
  app.delete("/adminDeleteLeave/(:_id)", leaveController.adminDeleteUserLeave);
  app.put( "/adminNotificationReadOrNot/(:_id)",leaveController.adminNotificationUserReadOrNot);
  app.put("/userNotificationReadOrNot/(:_id)",leaveController.userNotificationUserReadOrNot);
};

module.exports = routerFunction;
