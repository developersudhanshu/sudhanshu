const { user } = require("../config/db");

const db = require("../config/db");
const employee_Details = db.user;
// const check = db.check
var mongoose = require("mongoose");

// Register ......
const crypto = require("crypto");
let key = "password";
let algo = "aes256";
//
const jwt = require("jsonwebtoken");
jwtKey = "key";

//  send mail ....
var nodemailer = require("nodemailer");

module.exports = {
  allUser: async (req, res) => {
    // const result = await user.find({});
    console.log("employee_Details :", employee_Details);
    employee_Details
      .aggregate([
        {
          $lookup: {
            from: "checks",
            localField: "_id",
            foreignField: "userid",
            as: "checkData",
            // let:{userid:"$_id"},
            // pipeline:[
            //     {$match: {$expr:{$eq:['$userid', '$$userid']}}},
            // ]
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            phone: 1,
            email: 1,
            address: 1,
            pan: 1,
            aadhaar: 1,
            photo: 1,
            dob: 1,
            maAnni: 1,
            joining_date: 1,
            updatedAt: 1,
            createdAt: 1,
            role: 1,
            type: 1,
            checkData: 1,
            // checkData:{userid:1},
            // $$checkDat:{checkData:1,}
          },
        },
      ])
      .exec((err, result) => {
        if (err) {
          console.log("my err :", err);
          res.status(400).send({ success: false, message: err });
        }
        if (result) {
          // console.log("my result :",result)
          res
            .status(200)
            .send({
              success: true,
              message: "All data successfully Show !",
              data: result,
            });
          // res.send({data: result});
        }
      });

    // res.send({user: result});
    // console.log(result);
    // try{
    //     // res.status(200).send({success:true ,message:"All data successfully Show !", data: result});
    //     return
    //     res.send({data: result});
    // }
    // catch(err){
    //     return
    //     res.status(400).send({success:false, message: err });
    // }
  },

  // createUser : async (req, res) => {
  createUser: (req, res) => {
    if ((req, res)) {
      user.findOne({ email: req.body.email }, function (err, usersData) {
        if (usersData) {
          res
            .status(201)
            .send({
              success: false,
              message: "Email already Exists !",
              data: usersData,
            });
          console.log("Email already Exists !");
        } else {
          let panImage =
            "http://" + req.get("host") + "/upload/" + req.files[0].filename;
          let aadhaarImage =
            "http://" + req.get("host") + "/upload/" + req.files[1].filename;
          let empPhoto =
            "http://" + req.get("host") + "/upload/" + req.files[2].filename;

          try {
            let pName = req.body.name;
            let pPhone = req.body.phone;
            let passwordName = pName.slice(0, 1);
            let passwordPhone = pPhone.slice(2, 4);
            let passwords = passwordName + passwordPhone;
            var chars =
              "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            var string_length = 5;
            var randomPassword = passwords;
            for (var i = 0; i < string_length; i++) {
              var rnum = Math.floor(Math.random() * chars.length);
              randomPassword += chars.substring(rnum, rnum + 1);
            }
            var cipher = crypto.createCipher(algo, key);
            var encrypted =
              cipher.update(randomPassword, "utf8", "hex") +
              cipher.final("hex");
            // console.log('Generate password :', encrypted);

            // delete .........
            // const generatePassword = (
            //   length = 10,
            //   wishlist = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$'
            // ) =>
            //   Array.from(crypto.randomFillSync(new Uint32Array(length)))
            //     .map((x) => wishlist[x % wishlist.length])
            //     .join('')
            //     console.log('generat password 558 :', generatePassword())
            // ................

            const createUser = new user({
              name: req.body.name,
              email: req.body.email,
              phone: req.body.phone,
              password: encrypted,
              address: req.body.address,
              pan: panImage,
              aadhaar: aadhaarImage,
              photo: empPhoto,
              dob: req.body.dob,
              maAnni: req.body.maAnni,
              joining_date: req.body.joining_date,
            });
            // const result = await createUser.save();
            createUser
              .save()
              .then((result) => {
                console.log("result : " + result);
                jwt.sign(
                  { result },
                  jwtKey,
                  { expiresIn: "300s" },
                  (error, token) => {
                    res
                      .status(200)
                      .send({
                        success: true,
                        message: "Create successfully !",
                        data: token,
                      });
                    console.log("token: " + token);
                  }
                );
              })
              .catch((error) => {
                res.status(400).send({ success: false, message: error });
                console.log("error: " + error);
              });

            // send mail ................
            var transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user: "officialdev099@gmail.com", // new Email : officialdev099, fgnganyethhkiduz
                pass: "fgnganyethhkiduz",
              },
            });
            var mailOptions = {
              from: "officialdev099@gmail.com",
              to: req.body.email,
              subject: "Bula Payroll",
              text:
                "Hii " +
                req.body.name +
                "\nYour Email is = " +
                req.body.email +
                " & Password = " +
                randomPassword,
            };
            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log("Email sent: " + info.response);
              }
            });

            // try{
            //     res.status(200).send({success:true ,message:"Create successfully !", data: result });
            // }
            // catch(err){
            //     res.status(400).send({success:false, message: err });
            // }
          } catch (err) {
            console.log(err);
          }
        }
      });
    }
  },

  deleteUser: async (req, res) => {
    // let _id = req.body._id;
    let _id = req.params._id;
    try {
      const result = await user.findByIdAndDelete({ _id: _id });
      // res.send({delete: result});
      // console.log(result);
      try {
        res
          .status(200)
          .send({
            success: true,
            message: "Delete successfully !",
            data: result,
          });
      } catch (err) {
        res.status(400).send({ success: false, message: err });
      }
    } catch (err) {
      console.log(err);
    }
  },

  updateUser: async (req, res) => {
    let _id = req.params._id;

    let data = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      dob: req.body.dob,
      maAnni: req.body.maAnni,
      joining_date: req.body.joining_date,
    };

    // let aadhaarImage =''
    // if(req.files.length > 1 && req.files[1].fieldname == "aadhaar"){
    //     aadhaarImage = "http://" + req.get("host") + "/upload/" + req.files[1].filename;
    //     data.aadhaar = aadhaarImage;
    // }
    // console.log("req.files.length",req.files.length)
    // let aadhaarImage =''
    // let panImage ='';
    // if(req.body.is_aadhaar == "present" && req.body.is_pan == "not_present"){

    //     aadhaarImage = "http://" + req.get("host") + "/upload/" + req.files[0].filename;
    //     data.aadhaar = aadhaarImage;
    // }
    // if(req.body.is_aadhaar == "present" && req.body.is_pan == "present"){

    //     aadhaarImage = "http://" + req.get("host") + "/upload/" + req.files[1].filename;
    //     data.aadhaar = aadhaarImage;
    //     panImage = "http://" + req.get("host") + "/upload/" + req.files[0].filename;
    //     data.pan = panImage;
    // }
    // if(req.body.is_aadhaar == "not_present" && req.body.is_pan == "present"){

    //     panImage = "http://" + req.get("host") + "/upload/" + req.files[0].filename;
    //     data.pan = panImage;
    // }
    let aadhaarImage = "";
    let panImage = "";
    let empPhoto = "";
    if (
      req.body.is_aadhaar == "present" &&
      req.body.is_pan == "present" &&
      req.body.is_photo == "present"
    ) {
      aadhaarImage =
        "http://" + req.get("host") + "/upload/" + req.files[1].filename;
      data.aadhaar = aadhaarImage;
      panImage =
        "http://" + req.get("host") + "/upload/" + req.files[0].filename;
      data.pan = panImage;
      empPhoto =
        "http://" + req.get("host") + "/upload/" + req.files[2].filename;
      data.photo = empPhoto;
    }
    if (
      req.body.is_aadhaar == "present" &&
      req.body.is_pan == "present" &&
      req.body.is_photo == "not_present"
    ) {
      aadhaarImage =
        "http://" + req.get("host") + "/upload/" + req.files[1].filename;
      data.aadhaar = aadhaarImage;
      panImage =
        "http://" + req.get("host") + "/upload/" + req.files[0].filename;
      data.pan = panImage;
    }
    if (
      req.body.is_aadhaar == "present" &&
      req.body.is_pan == "not_present" &&
      req.body.is_photo == "present"
    ) {
      aadhaarImage =
        "http://" + req.get("host") + "/upload/" + req.files[1].filename;
      data.aadhaar = aadhaarImage;
      empPhoto =
        "http://" + req.get("host") + "/upload/" + req.files[0].filename;
      data.photo = empPhoto;
    }
    if (
      req.body.is_aadhaar == "not_present" &&
      req.body.is_pan == "present" &&
      req.body.is_photo == "present"
    ) {
      panImage =
        "http://" + req.get("host") + "/upload/" + req.files[0].filename;
      data.pan = panImage;
      empPhoto =
        "http://" + req.get("host") + "/upload/" + req.files[1].filename;
      data.photo = empPhoto;
    }
    if (
      req.body.is_aadhaar == "present" &&
      req.body.is_pan == "not_present" &&
      req.body.is_photo == "not_present"
    ) {
      aadhaarImage =
        "http://" + req.get("host") + "/upload/" + req.files[0].filename;
      data.aadhaar = aadhaarImage;
    }
    if (
      req.body.is_aadhaar == "not_present" &&
      req.body.is_pan == "not_present" &&
      req.body.is_photo == "present"
    ) {
      empPhoto =
        "http://" + req.get("host") + "/upload/" + req.files[0].filename;
      data.photo = empPhoto;
    }
    if (
      req.body.is_aadhaar == "not_present" &&
      req.body.is_pan == "present" &&
      req.body.is_photo == "not_present"
    ) {
      panImage =
        "http://" + req.get("host") + "/upload/" + req.files[0].filename;
      data.pan = panImage;
    }

    try {
      //    console.log("check : "+ _id, req.body.name, req.body.email, req.body.phone)
      const result = await user.findByIdAndUpdate(
        { _id: _id },
        {
          $set: data,
        },
        {
          new: true,
        }
      );
      try {
        res
          .status(200)
          .send({
            success: true,
            message: "Update successfully !",
            data: result,
          });
        console.log("data :- ", result);
      } catch (err) {
        res.status(400).send({ success: false, message: err });
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  },

  oneUser: async (req, res) => {
    let _id = req.params._id;
    var user_id = mongoose.Types.ObjectId(_id);
    // console.log('_id :', _id);
    employee_Details
      .aggregate([
        { $match: { _id: user_id } },
        {
          $lookup: {
            from: "checks",
            localField: "_id",
            foreignField: "userid",
            as: "checkData",
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            phone: 1,
            email: 1,
            address: 1,
            pan: 1,
            aadhaar: 1,
            photo: 1,
            dob: 1,
            maAnni: 1,
            joining_date: 1,
            updatedAt: 1,
            createdAt: 1,
            role: 1,
            type: 1,
            checkData: 1,
          },
        },
      ])
      .exec((err, result) => {
        if (err) {
          console.log("my err :", err);
          res.status(400).send({ success: false, message: err });
        }
        if (result) {
          console.log("my result :", result);
          res
            .status(201)
            .send({
              success: true,
              message: "Successfully !",
              users_data: result,
            });
        }
      });
  },

  // registration ................................................
  userRegister: (req, res) => {
    try {
      if ((req, res)) {
        user.findOne({ email: req.body.email }, function (err, users) {
          if (
            req.body.name.length > 0 &&
            req.body.email.length > 0 &&
            req.body.password.length > 0
          ) {
            if (users) {
              res
                .status(201)
                .send({
                  success: true,
                  message: "Email already Exists !",
                  data: users,
                });
              console.log("Email already Exists !");
            } else {
              var cipher = crypto.createCipher(algo, key);
              var encrypted =
                cipher.update(req.body.password, "utf8", "hex") +
                cipher.final("hex");
              console.log(encrypted);

              // var find = user.findOne({email:email});
              // console.log('equal 2 :' + find);

              // let all = user.find({});
              // console.log("email 10 : " + all);
              // var email = req.body.email;
              // console.log("email 11 "+email);
              // var find = user.find({email:req.body});
              // console.log("email 1 : " + find);
              // if(find == req.body.email){
              //     console.log("email 2  " );
              // }else{
              //     console.log("email 3  " );
              // }

              try {
                if (req.body.password != req.body.confirmedPassword) {
                  res.send("Error, Password and confirm Password not match !");
                  console.log(
                    "Error, Password and confirm Password not match !"
                  );
                } else {
                  const data = new user({
                    _id: mongoose.Types.ObjectId(),
                    name: req.body.name,
                    email: req.body.email,
                    password: encrypted,
                    confirmedPassword: req.body.confirmedPassword,
                    role: "USER",
                    type: "Check In",
                  });
                  data.save().then((result) => {
                    // res.send(result);
                    // console.log(result);
                    jwt.sign(
                      { result },
                      jwtKey,
                      { expiresIn: "300s" },
                      (error, token) => {
                        res
                          .status(201)
                          .send({
                            success: true,
                            message: "Register Successfully !",
                            data: token,
                          });
                      }
                    );
                  });
                }
              } catch (error) {
                res.status(400).send({ success: false, message: error });
                console.log(error);
              }
              // const data = new user({
              //     _id:mongoose.Types.ObjectId(),
              //     name:req.body.name,
              //     email:req.body.email,
              //     password:encrypted,
              //     confirmedPassword: req.body.confirmedPassword
              // })
              // data.save().then((result) => {
              //     // res.send(result);
              //     // console.log(result);
              //     jwt.sign({result},jwtKey,{expiresIn:'300s'},(error, token) => {
              //         res.status(201).send({success:true, message:"Register Successfully !", data:token});
              //     });
              // });
            }
          } else {
            res
              .status(400)
              .send({ success: false, message: "Please check your Fields !" });
            console.log("Please check your Fields !");
          }
        });
      }
    } catch (error) {
      res.status(400).send({ success: false, message: error });
      console.log("Not Register successfully !");
    }
  },

  userLogin: (req, res) => {
    try {
      // let unique = user.findOne({email:req.body.email}, function (err, users) {
      //     console.log("users : "+users.email);
      //     if(users.email == req.body.email) {
      //         res.status(201).send({success:true, message:"Email already Exists !", data:users});
      //         console.log("Email already Exists !");
      //     }else{}});
      // console.log("unique "+ unique);

      // user.findOne({email:req.body.email}).then(( (data) => {
      //     // console.log("email check 4455 : " + data.email);
      //     if(data.email == req.body.email){
      //         console.log("email found 1155 !");
      //     }else{
      //         console.log("email not found 2255 !");
      //     }}));

      // let meto = user.findOne({email:req.body.email});

      user.findOne({ email: req.body.email }).then((data) => {
        if (req.body.email.length > 0 && req.body.password.length > 0) {
          if (data === null) {
            res
              .status(400)
              .send({ success: false, message: "Please Check your Email !" });
            console.log("Please Check your Email !");
          } else {
            var decipher = crypto.createDecipher(algo, key);
            var decrypted =
              decipher.update(data.password, "hex", "utf8") +
              decipher.final("utf8");
            console.log(decrypted);
            if (decrypted == req.body.password) {
              jwt.sign(
                { data },
                jwtKey,
                { expiresIn: "300s" },
                (error, token) => {
                  if (error) {
                    res.status(400).send({ success: false, message: error });
                  }
                  var _id = data._id;
                  // res.status(201).send({success:true, message:"Login Successfully !", data:token, users:data});
                  employee_Details
                    .aggregate([
                      { $match: { _id: _id } },
                      {
                        $lookup: {
                          from: "checks",
                          localField: "_id",
                          foreignField: "userid",
                          as: "checkData",
                          // let:{userid:"$_id"},
                          // pipeline:[
                          //     {$match: {$expr:{$eq:['$userid', '$$userid']}}},
                          // ]
                        },
                      },
                      {
                        $project: {
                          _id: 1,
                          name: 1,
                          phone: 1,
                          email: 1,
                          address: 1,
                          pan: 1,
                          aadhaar: 1,
                          photo: 1,
                          dob: 1,
                          maAnni: 1,
                          joining_date: 1,
                          updatedAt: 1,
                          createdAt: 1,
                          role: 1,
                          type: 1,
                          checkData: 1,
                        },
                      },
                    ])
                    .exec((err, result) => {
                      if (err) {
                        console.log("my err :", err);
                        // res.status(400).send({success:false, message: err });
                      }
                      if (result) {
                        // console.log("my result :",result)
                        // res.status(200).send({success:true ,message:"All data successfully Show !", users_data: result});
                        // res.send({users_data: result});
                        res
                          .status(201)
                          .send({
                            success: true,
                            message: "Login Successfully !",
                            data: token,
                            users: data,
                            users_data: result,
                          });
                      }
                    });
                  // console.log('users_data', users_data)
                  console.log("token :", token);
                  console.log("res.status :", res.status);
                  // if (token) {
                  //     res.redirect('/');
                  // }
                }
              );
            } else {
              res.status(400).send({ success: false, message: "Not Login !" });
              console.log("Error: Not login successfully !");
            }
          }
        } else {
          res
            .status(400)
            .send({ success: false, message: "Please check your Fields !" });
          console.log("Please check your Fields !");
        }
      });
    } catch (error) {
      res.status(400).send({ success: false, message: error });
      console.log("Not login successfully !");
    }
  },

  // Leave ............
  // one user Leave ............
  leaveOneUser: async (req, res) => {
    let _id = req.params._id;
    // console.log('_id 44:', _id);
    var user_id = mongoose.Types.ObjectId(_id);
    // console.log('_id :', _id);
    employee_Details
      .aggregate([
        { $match: { _id: user_id } },
        {
          $lookup: {
            from: "leaves",
            localField: "_id",
            foreignField: "userid",
            as: "leaveData",
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            phone: 1,
            email: 1,
            address: 1,
            pan: 1,
            aadhaar: 1,
            photo: 1,
            dob: 1,
            maAnni: 1,
            joining_date: 1,
            updatedAt: 1,
            createdAt: 1,
            role: 1,
            type: 1,
            leaveData: 1,
          },
        },
      ])
      .exec((err, result) => {
        if (err) {
          console.log("my err :", err);
          res.status(400).send({ success: false, message: err });
        }
        if (result) {
          console.log("my result :", result);
          res
            .status(201)
            .send({
              success: true,
              message: "Successfully !",
              users_data: result,
            });
        }
      });
  },

  // All user Leave ............
  allUserLeave: async (req, res) => {
    console.log("all User Leave.");
    // const result = await user.find({});
    // console.log("result :", result);
    console.log("employee_Details :", employee_Details);
    employee_Details
      .aggregate([
        {
          $lookup: {
            from: "leaves",
            localField: "_id",
            foreignField: "userid",
            as: "leaveData",
            // let:{userid:"$_id"},
            // pipeline:[
            //     {$match: {$expr:{$eq:['$userid', '$$userid']}}},
            // ]
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            phone: 1,
            email: 1,
            address: 1,
            pan: 1,
            aadhaar: 1,
            photo: 1,
            dob: 1,
            maAnni: 1,
            joining_date: 1,
            updatedAt: 1,
            createdAt: 1,
            role: 1,
            type: 1,
            leaveData: 1,
          },
        },
      ])
      .exec((err, result) => {
        if (err) {
          console.log("my err :", err);
          res.status(400).send({ success: false, message: err });
        }
        if (result) {
          // console.log("my result :",result)
          res
            .status(200)
            .send({
              success: true,
              message: "All User Leave data Successfully Show !",
              data: result,
            });
          // res.send({data: result});
        }
      });
  },
};
