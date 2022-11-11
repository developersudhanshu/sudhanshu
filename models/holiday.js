const mongoose = require("mongoose");
const holidaySchema = new mongoose.Schema({
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        
    },

    holidayTittle: {type:String
    },
    date:{
        type:Date
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

const holiday = new mongoose.model('holiday', holidaySchema);

module.exports = holiday;