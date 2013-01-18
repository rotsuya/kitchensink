/**
 * Created with JetBrains WebStorm.
 * User: rotsuya
 * Date: 2013/01/18
 * Time: 11:56
 * To change this template use File | Settings | File Templates.
 */

/*
blob = new Blob([src], {type:"text\/javascript"} );
url = URL.createObjectURL(blob);
worker = new Worker(url);
*/

var handleFileSelect = function (fileList) {
    var output0 = '';
    for (var i = 0, file; file = fileList[i]; i++) {
        output0 += '<dl>'
            + '<dt>name</dt><dd>' + escape(file.name) + '</dd>'
            + '<dt>type</dt><dd>' + (file.type || 'n/a') + '</dd>'
            + '<dt>size</dt><dd>' + file.size +  ' bytes</dd>'
            + '<dt>lastModifiedDate</dt><dd>'
            + file.lastModifiedDate.toLocaleString() + '</dd>'
            + '</dl>';

        $.when(
            (function() {
                var $deferred = new $.Deferred();
                var reader = new FileReader();
                reader.addEventListener('load', function(event) {
                    var _output = '<div>' + event.target.result + '</div>';
                    $deferred.resolve(_output);
                }, false);
                reader.readAsBinaryString(file);
                return $deferred.promise();
            })(),
            (function() {
                var $deferred = new $.Deferred();
                var reader = new FileReader();
                reader.addEventListener('load', function(event) {
                    var _output = '<div>' + event.target.result + '</div>';
                    $deferred.resolve(_output);
                }, false);
                reader.readAsText(file);
                return $deferred.promise();
            })(),
            (function() {
                var $deferred = new $.Deferred();
                var reader = new FileReader();
                reader.addEventListener('load', function(event) {
                    var _output = '<div>' + event.target.result + '</div>';
                    $deferred.resolve(_output);
                }, false);
                reader.readAsDataURL(file);
                return $deferred.promise();
            })(),
            (function() {
                var $deferred = new $.Deferred();
                var reader = new FileReader();
                reader.addEventListener('load', function(event) {
                    var _output = '<div>' + event.target.result + '</div>';
                    $deferred.resolve(_output);
                }, false);
                reader.readAsArrayBuffer(file);
                return $deferred.promise();
            })()
        ).done((function(_output0) {
            return function(output1, output2, output3, output4) {
                //arguments;
                $('body')
                    .append('<h3>header</h3><output>' + _output0 + '</output>')
                    .append('<h3>binaryString</h3><output>' + output1 + '</output>')
                    .append('<h3>text</h3><output>' + output2 + '</output>')
                    .append('<h3>dataUrl</h3><output>' + output3 + '</output>')
                    .append('<h3>arrayBuffer</h3><output>' + output4 + '</output>');
            };
        })(output0));
    }
};

$('#files').on('change', function(event) {
    var fileList = event.target.files; // FileList object
    handleFileSelect(fileList);
});

$('#dropArea')
    .on('dragover', function(event) {
        event.preventDefault();
        event.stopPropagation();
        event.originalEvent.dataTransfer.dropEffect = 'copy';
    })
    .on('drop', function(event) {
        event.preventDefault();
        event.stopPropagation();
        var fileList = event.originalEvent.dataTransfer.files; // FileList object.
        handleFileSelect(fileList);
    });