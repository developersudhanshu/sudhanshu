const path = require('path');
const fs = require('fs');
const multer = require('multer');
// const m = require("")
 
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var DIR = path.join(__dirname, "./upload");
        if (!fs.existsSync(DIR)) {
            fs.mkdirSync(DIR);
        }
        cb(null, DIR)
    },
    filename: function (req, file, cb) {
        const str = file.originalname;
        const extension = str.substr(str.lastIndexOf("."));
        const fileName = Date.now() + '' + Math.round(Math.round(Math.random() * 5000)) + '' + extension;
        cb(null, fileName)
    }
});
 


var upload = multer({ storage: storage })

module.exports=upload;