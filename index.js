const express = require("express");
const app = express();
const path = require('path');

// const port = process.env.PORT || 3000;
const routes = require("./routers/routes");
// const dotenv = require('dotenv');

const cors = require('cors');

// require(dotenv).config({ path: './config.env' });

// const users = require('./routers/routes.js');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// const mongoose = require('mongoose');
// const url = 'mongodb://localhost:27017/server';
// mongoose.connect(url, (err, db) => {
//     if(err) throw err;
//     console.log("Mongodb connect !");
// });


app.use(cors({
    origin:'http://192.168.29.126:3000',
    // origin:'*',
}));

// app.use('/', users);
routes(app);




// app.listen(port, () => {
//     console.log(`Server is running on PORT : ${port}.`);
// });
app.use('/upload/',express.static(path.join(__dirname, '/upload/')));

app.listen(5000, () => {
        console.log(`Server is running `);
    });