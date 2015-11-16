'use strict';

var http = require('http');
var urlFormat = require('url').format;
var urlParse = require('url-parse-lax');
var humanize = require('humanize-number');
var chalk = require('chalk');
var monkeypatch = require('monkeypatch');
var objectAssign = require('object-assign');

var colorCodes = {
	5: 'red',
	4: 'yellow',
	3: 'cyan',
	2: 'green',
	1: 'green'
};

function time(start) {
	var delta = new Date() - start;
	delta = delta < 10000 ? delta + 'ms' : Math.round(delta / 1000) + 's';
	return humanize(delta);
}

function defaultHandler(request, options, cb) {
	var opts = objectAssign(
		{protocol: 'http'},
		typeof options === 'string' ? urlParse(options) : options
	);

	if (opts.path) {
		opts.pathname = opts.path;
	}

	var url = urlFormat(opts);
	var start = new Date();

	console.log(chalk.gray('      --> ') + url);

	return request(options, cb)
		.on('response', function (response) {
			var status = response.statusCode;
			var s = status / 100 | 0;
			console.log('  ' + chalk[colorCodes[s]](status) + ' <-- ' + url + ' ' + chalk.gray(time(start)));
		})
		.on('error', function (err) {
			console.log('  ' + chalk.red('xxx') + ' <-- ' + url + ' ' + chalk.red(err.message));
		});
}

module.exports = function debugHttp(fn) {
	fn = fn || defaultHandler;

	if (typeof fn !== 'function') {
		throw new TypeError('Expected a function as request handler');
	}

	monkeypatch(http, 'request', fn);
};
