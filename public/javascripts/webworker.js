/**
 * Created with JetBrains WebStorm.
 * User: rotsuya
 * Date: 2013/01/16
 * Time: 17:39
 * To change this template use File | Settings | File Templates.
 */
var worker = new Worker('javascripts/worker.js');

worker.addEventListener('message', function(event) {
    var outputHtml;
    outputHtml = event.data.reduce(function(html, value) {
        return html + ', ' + value;
    });
    $('#output').html(outputHtml);
}, false);

$('#startButton').on('click', function() {
    worker.postMessage({from: $('#fromNumber').val() - 0, to: $('#toNumber').val() - 0});
});

