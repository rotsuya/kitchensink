
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes/index')
  , websocket = require('./routes/websocket')
  , webworker = require('./routes/webworker')
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

app.locals({
    title: 'Kitchensink'
});

app.get('/', routes.index);
app.get('/websocket', websocket.index);
app.get('/webworker', webworker.index);
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
        if (!ws) return;
        ws.send('User' + connections.length + ' connected.');
    });

    ws.on('message', function(message) {
        var index = connections.indexOf(ws);
        connections.forEach(function(ws) {
            if (!ws) return;
            ws.send('User' + (index + 1) + ': ' + message);
        });
    })

    ws.on('close', function() {
        var index = connections.indexOf(ws);
        connections.splice(index, 1, undefined);
        connections.forEach(function(ws) {
            if (!ws) return;
            ws.send('User' + (index + 1) + ' disconnected.');
        });
    })
});
