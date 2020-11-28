const express = require('express');
const start = express();
const partials = require('express-partial');
const md5 = require('md5');
const socket = require('socket.io');




//================= INNITIAL IMPORT FILES =======================//
const homeRouter = require('./model/routers/homeRouter');
//============================================================//


//================= INSERT / UPDATE IMPORT FILES =======================//
    
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

//set static files folder
start.use(express.static('./stuff'));


//Zip setup
// let dataBase = connectZip();


//use backend here
//================= INNITIAL REQUIRED FILES =======================//
    homeRouter(start);
//=================================================================//


//Run server on specified port
const server = start.listen(3090, function() {
    console.log('Website is running on server with port 9090');
});


const socketIo = socket(server);

socketIo.on('connection', function(socketConnection) {
    console.log('A user connection');

    //================= LOGIN/LOGOUT CONTROLLERS =================//
        
    //============================================================//


    //================= INSERT / UPDATE CONTROLLERS ==============//
        
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