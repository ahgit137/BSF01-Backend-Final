// instruction's code
/*
//Import necessary modules or dependencies
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

//Make an instance of Express App
const app = express();

//Middleware 
app.use(express.json());

//Connect to MongoDb or Database
mongoose
    .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.log('Error in connecting to MongoDB:', error.message);
    });

//Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
*/


// import nessary modules or dependencies
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// Make an instance of "Express" application
const app = express();

// Middleware
app.use(express.json());
app.use((req, res, next) => {   // parameters: request, response and next
    console.log(req.path, req.method);
    if (req.body) {
        console.log("Req body:");
        console.log(req.body);
    }
    next();
})




// Add routes
app.use('/api/posts/', require('./src/routes/post'));
app.use("/api/users/", require("./src/routes/user"));

//Connect to MongoDb or Database
mongoose
    .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true  })
    .then(() => {
        console.log("Connected to MongoDB or database.");
    }).catch((error) => {
        console.log("ERROR in connecting to MongoDB:",error.message);
    });

// Start the server
//const port = process.env.PORT || 3000;   // if not able to get PORT from .env file, then use the default value 3000 for the port
const port = process.env.PORT || 4000;   // change port number for frontnd prog
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
