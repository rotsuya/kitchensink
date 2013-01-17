/**
 * Created with JetBrains WebStorm.
 * User: rotsuya
 * Date: 2013/01/16
 * Time: 16:28
 * To change this template use File | Settings | File Templates.
 */
var wsEcho = new WebSocket('ws://localhost:3000/echo');

wsEcho.addEventListener('open', function(event) {
    $('#sendButton').on('click', function() {
        var message = $('#input').val();
        wsEcho.send(message);
    });
    wsEcho.addEventListener('message', function(event) {
        $('#output').append(event.data + '<br/>');
    }, false);
}, false);

var wsChat = new WebSocket('ws://localhost:3000/chat');

wsChat.addEventListener('open', function(event) {
    $('#speakButton').on('click', function() {
        var message = $('#speakMessage').val();
        wsChat.send(message);
    });
    wsChat.addEventListener('message', function(event) {
        $('#conversation').prepend(event.data + '<br/>');
    }, false);
}, false);
