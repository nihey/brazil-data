var Stream = require('stream').Transform;

module.exports = function(url, callback) {
  var http = require(url.split('://')[0]);
  http.request(url, function(response) {
    var data = new Stream();

    response.on('data', function(chunk) {
      data.push(chunk);
    });

    response.on('end', function() {
      callback(data.read());
    });
  }).end();
}
