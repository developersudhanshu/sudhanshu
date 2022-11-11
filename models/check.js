const mongoose = require("mongoose");
const checkSchema = new mongoose.Schema({
    // _id:String,
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "employee_Details"
    },
    // action:Boolean,
    status:{
        type:String
    },
    type:{
        type:String
    },
    checkin_time:{
        type:Date
    },
    checkout_time:{
        type:Date
    },
    // currentDate:{
    //     type:Date
    // },
});

const check = new mongoose.model('check', checkSchema);

module.exports = check;