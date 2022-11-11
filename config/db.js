const mongoose = require('mongoose');

const localDB = 'mongodb://localhost:27017/server';
mongoose.connect(process.env.MONGODB_URI || localDB,
    // { useNewUrlParser: true, useUnifiedTopology: true }
    ).then((db) => {
        console.log(`DB connection successful !`);
    }).catch((error) => {
        console.log(error);
});

mongoose.Promise = global.Promise;

module.exports = {
    check:require('../models/check.js'),
    register:require('../models/register.js'),
    user:require('../models/user.js'),
    leave:require('../models/leave.js'),
    holidays:require('../models/holiday'),
    designations:require('../models/designation'),
    product:require('../models/product'),
    category:require('../models/ category'),
    subCategory:require('../models/subCategory')
    
};