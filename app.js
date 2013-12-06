var express = require('express');
var http = require('http');
var path = require('path');
var config = require('config');
var log = require('libs/log')(module);

var app = express();

app.engine('ejs', require('ejs-locals'));
app.set('views', __dirname + '/template');
app.set('view engine', 'ejs');

app.use(express.favicon());
if (app.get('env') == 'development') {
    app.use(express.logger('dev'));
} else {
    app.use(express.logger('default'));
}

//app.use(express.bodyParser());
app.use(express.cookieParser());

app.use(app.router);

app.get('/', function(req, res, next) {
    res.render("index", {
        body: '<b>Hernja</b>'
    });
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(err, req, res, next) {
    if (app.get('env') == 'development') {
        var errorHandler =express.errorHandler();
        errorHandler(err, req, res, next);
    } else {
        res.send(500);
    }
});

http.createServer(app).listen(config.get('port'), function(){
    log.info('Express server listening on port ' + config.get('port'));
});
/*
app.use(function(req, res, next) {
    if (req.url == '/') {
    res.end("Hello");
    } else {
        next();
    }
});

app.use(function(req, res, next) {
    if (req.url == '/forbidden') {
        nexr(new Error("wops,denied"));
    } else {
        next();
    }
});

app.use(function(req, res, next) {
    if (req.url == '/test') {
        res.end("Test");
    } else {
        next();
    }
});

app.use(function(req, res) {
    res.send(404, "Page Not Found Hello");
});



var routes = require('./routes');
var user = require('./routes/user');




// all environments
app.set('port', process.env.PORT || 3000);



// development only
if ('development' == app.get('env')) {

}

app.get('/', routes.index);
app.get('/users', user.list);

  */