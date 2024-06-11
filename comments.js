// create web server with node.js
// read from file and write to file

// require modules
var http = require('http');
var fs = require('fs');
var url = require('url');

// create server
http.createServer(function(request, response) {
  var pathname = url.parse(request.url).pathname;
  console.log(pathname);
  if (pathname === '/') {
    fs.readFile('comment.html', 'utf8', function(error, data) {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(data);
    });
  } else if (pathname === '/comment') {
    var query = url.parse(request.url, true).query;
    console.log(query);
    var comment = query.comment;
    fs.appendFile('comment.txt', comment + '\n', 'utf8', function(error) {
      response.writeHead(200, { 'Content-Type': 'text/plain' });
      response.end('comment is ' + comment);
    });
  } else {
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.end('Page not found');
  }
}).listen(3000, function() {
  console.log('Server is running on port 3000');
});
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

// create server
http.createServer(function(request, response) {
  var pathname = url.parse(request.url).pathname;
  if (pathname === '/') {
    fs.readFile('comment.html', 'utf8', function(error, data) {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(data);
    });
  } else if (pathname === '/comment') {
    var body = '';
    request.on('data', function(data) {
      body += data;
    });
    request.on('end', function() {
      var post = qs.parse(body);
      console.log(post);
      response.writeHead(200, { 'Content-Type': 'text/plain' });
      response.end('comment is ' + post.comment);
    });
  } else {
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.end('Page not found');
  }
}).listen(3000, function() {
  console.log('Server is running on port 3000');
});

