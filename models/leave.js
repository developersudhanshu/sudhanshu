// Employee Leave .....................
const mongoose = require('mongoose');
const leaveschema = new mongoose.Schema({

    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "employee_Details"
    },
    leaveTitle: {
        type: String
    },
    fromDate: {
        type: String
    },
    toDate: {
        type: String
    },
    leaveMessage: {
        type: String
    },
    leaveStatus: {
        type: String
    },
    readOrNot: {
        type: String
    },
    userReadOrNot: {
        type: String
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

const leavemodel = new mongoose.model('leaves', leaveschema);
module.exports = leavemodel;