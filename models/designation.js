const mongoose = require("mongoose");
const designationSchema = new mongoose.Schema({
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "employee_Details"
    },

    tittle: {type:String
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

const designation = new mongoose.model('designation', designationSchema);

module.exports = designation;