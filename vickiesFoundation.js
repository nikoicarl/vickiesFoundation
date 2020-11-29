const express = require('express');
const start = express();
const md5 = require('md5');
const partials = require('express-partials');
const socket = require('socket.io');
const bodyParser = require('body-parser');

const path = require('path');



//================= INNITIAL IMPORT FILES =======================//
const homeRouter = require('./model/routers/homeRouter');
//============================================================//


//================= INSERT / UPDATE IMPORT FILES =======================//
const volunteerFormSubmit = require('./model/controllers/volunteerFormSubmit');
//======================================================================//


//================= FETCH IMPORT FILES =======================//
    
//============================================================//


//================= DEACTIVATE IMPORT FILES =======================//
    
//============================================================//


//================= DELETE IMPORT FILES =======================//
    
//============================================================//


//set template engine
start.use(partials());
start.set('view engine', 'ejs');
//pass all form data
start.use(bodyParser.urlencoded({ extended: false }));

//set static files folder
start.use(express.static('./stuff'));
start.use('/css', express.static('./node_modules/bootstrap/dist/css'));
start.use('/js', express.static('./node_modules/bootstrap/dist/js'));
start.use('/js', express.static('./node_modules/jquery/dist'));


//Zip setup
// let dataBase = connectZip();


//use backend here
//================= INNITIAL REQUIRED FILES =======================//
    homeRouter(start);

//=================================================================//


//Run server on specified port
const server = start.listen(9090, function() {
    console.log('Website is running on server with port 9090');
});


const socketIo = socket(server);

socketIo.on('connection', function(socketConnection) {
    console.log('A user connection');

    //================= LOGIN/LOGOUT CONTROLLERS =================//
        
    //============================================================//


    //================= INSERT / UPDATE CONTROLLERS ==============//
    volunteerFormSubmit(socketConnection);

    //============================================================//


    //================= FETCH CONTROLLERS =======================//

    //============================================================//


    //================= DEACTIVATE CONTROLLERS =====================//
    
    //==============================================================//


    //================= DELETE CONTROLLERS =======================//
        
    //============================================================//


    socketConnection.on('disconnect', function() {
        console.log('A user disconnected');
    });
});