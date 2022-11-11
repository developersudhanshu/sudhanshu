const mongoose = require('mongoose');
const userschema = new mongoose.Schema({
    name:{
        type:String,
        // required:true,
        trim: true
    },
    email:{
        type:String,
        lowercase: true,
        trim: true,
        unique:true,
        // required: true,
    },
    password:{
        type:String,
        // required:true
    },
    role:{
        type:String,
    },
    type:{
        type:String,
    },
    active: Boolean,
    created_at:{
        type:Date,
        // required:true,
        default:Date.now()
    },

    // Employee Detail .....................
    address:{
        type: String,
        // required:true
    },
    phone:{
        type:String,
        // required:true,
        trim: true
    },
    password:{
        type:String,
    },
    pan:{
        type: String
    },
    aadhaar:{
        type: String
    },
    photo:{
        type: String
    },
    dob:{
        type: String
    },
    maAnni:{
        type: String
    },
    project:{
        type:String,
    },
    value:{
        type:String,
    },
    joining_date:{
        type:String
    },
    createdAt:{
        type:Date,
        // required:true,
        default:Date.now
    },
    updatedAt: {
        type: Date,
        // default: Date.now
        default: new Date()
    },


});

const allusermodel = new mongoose.model('employee_Details', userschema);

module.exports = allusermodel;