
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('websocket', {title: 'WebSocket'});
};