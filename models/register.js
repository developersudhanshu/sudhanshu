const mongoose = require('mongoose');
const registerSchema = new mongoose.Schema({
    name:{
        type:String,
        // required:true
    },
    email:{
        type:String,
        lowercase: true,
        trim: true,
        // required:true,
        // index: {
        //     unique:true,
        // },
        unique:true
        // validate: {
        //     validator : isEmailExists, msg: 'Email already exists !'
        // }
    },
    password:{
        type:String,
        // required:true
    },
    role:{
        type:String,
    },
    active: Boolean,
    created_at:{
        type:Date,
        required:true,
        default:Date.now()
    },

});

// // validation
// function isEmailExists(email, callback) {
//     if (email) {
//         mongoose.models['User'].count({ _id: { '$ne': this._id }, email: email }, function (err, result) {
//             if (err) {
//                 return callback(err);
//             }
//             callback(!result);
//         })
//     }
// }

const registerModel = new mongoose.model('user', registerSchema);

module.exports = registerModel;
