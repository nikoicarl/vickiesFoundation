const { request } = require("express");

module.exports = function(start) {
    
    // INDEX ROUTER
    start.get('/', function(request, response) {
        let queryString = request.query;
        response.render('index', {pageNavigate: queryString});
    });

    // FOUNDERS STATEMENT ROUTER
    start.get('/founders-statement', function(request, response) {
        let queryString = request.query;
        response.render('founders-statement', {pageNavigate: queryString});
    });

    // ABOUT ROUTER
    start.get('/about', function(request, response) {
        let queryString = request.query;
        response.render('about', {pageNavigate: queryString});
    });

     // WHAT WE DO
    start.get('/what-we-do', function(request, response) {
        let queryString = request.query;
        response.render('what-we-do', {pageNavigate: queryString});
    });

     // IMPACT
    start.get('/impact', function(request, response) {
        let queryString = request.query;
        response.render('impact', {pageNavigate: queryString});
    });

    // SUPPORT US
    start.get('/support-us', function(request, response) {
        let queryString = request.query;
        response.render('support-us', {pageNavigate: queryString});
    });

    // VOLUNTEER
    start.get('/volunteer', function(request, response) {
        let queryString = request.query;
        response.render('volunteer', {pageNavigate: queryString});
    });

}