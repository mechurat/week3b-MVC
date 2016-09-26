var express = require('express');
//express is like a 'class'
var app = express();

//shorthand execution
//var app = require('express')();

//console.log('hello');

//routing
    //Telling the server how to handle requests
    //HTTP method (GET,PUT, SEND, USE, etc.) + URL path -> Function
    //express (See slide 28)
        //app.METHOD(PATH, HANDLER)

app.use(function(req, res, next) {
    console.log('request to ' + req.url);
    next();    
})

app.get('/', function(req, res){
    res.status(200);
    res.send('<h1>Home Page</h>');
});

//See http://forbeslindesay.github.io/express-route-tester/ to create routes for express
    //Link is also available in slack
app.get('/profile/:name', function(req, res){
    res.status(200); //<- this defaults to 200 if it matches
    res.type('html');
    res.send('<h1>Your Name is ' + req.params.name + '</h1>');
    //json
    //res.type('json');
    //res.send({
    //    name: req.params.name;
    //});
});

//MIDDLEWARE for files
//Makes it so that any files we pull from another folder can get added onto the URL we are using
//SEE FOLDER: public for HTML file being used in example
//URL example in THIS CASE: localhost:3001/index.html
app.use(express.static(__dirname + '/public'));

//CATCH ALL 
app.use(function(req, res, next){
    res.status(404);
    res.send('404 - Not Found');
});

//ORDER MATTERS
    //THIS WILDCARD SHOULD BE LAST
    //404 errors should be 'catch-alls'
    //Due to order any request that makes it here is a 404
app.get('*', function(req,res){
    res.status(404);
    res.send('404 - Not Found');
});

app.listen(3001);

console.log ('listening on port 3001');
//run 'node index.js' on terminal
//It doesn't know what to do. Use ctrl+C to cancel the server request


