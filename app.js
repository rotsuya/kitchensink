
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

var WebSocketServer = require('ws').Server;

var wssEcho = new WebSocketServer({
    server: server,
    path: '/echo'
});
wssEcho.on('connection', function(ws) {
    ws.on('message', function(message) {
        ws.send(message);
    })
});

var wssChat = new WebSocketServer({
    server: server,
    path: '/chat'
});

var connections = [];
wssChat.on('connection', function(ws) {
    connections.push(ws);
    connections.forEach(function(ws) {
        ws.send('a client connected. now, ' + connections.length + ' client(s) are connecting.');
    });

    ws.on('message', function(message) {
        connections.forEach(function(ws) {
            ws.send(message);
        });
    })

    ws.on('close', function() {
        var index = connections.indexOf(ws);
        connections.splice(index, 1);
        connections.forEach(function(ws) {
            ws.send('a client disconnected. now, ' + connections.length + 'client(s) are connecting.');
        });
    })
});
