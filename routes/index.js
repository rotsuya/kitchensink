
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Kitchensink' });
};

exports.websocket = function(req, res){
    res.render('websocket', {title: 'WebSocket'});
};

exports.webworker = function(req, res){
    res.render('webworker', {title: 'WebWorker'});
};

exports.file = function(req, res){
    res.render('file', {title: 'File APIs'});
};