'use strict';

var http = require('http');
var url = require('url');
var monkeypatch = require('monkeypatch');

function defaultHandler(request, options, cb) {
	if (!options.protocol) {
		options.protocol = 'http:';
	}

	if (options.path) {
		options.pathname = options.path;
	}

	console.log('    --> ' + url.format(options));

	var req = request(options, cb);

	req.on('response', function (response) {
		console.log(response.statusCode + ' <-- ' + url.format(options));
	});

	return req;
}

module.exports = function debugHttp(fn) {
	fn = fn || defaultHandler;

	if (typeof fn !== 'function') {
		throw new TypeError('Expected a function as request handler');
	}

	monkeypatch(http, 'request', fn);
};
