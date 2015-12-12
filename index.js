'use strict';

var http = require('http');
var urlParse = require('url').parse;
var humanize = require('humanize-number');
var chalk = require('chalk');
var monkeypatch = require('monkeypatch');

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
	var url = (typeof options === 'string' ? urlParse(options) : options).href;
	var method = '[' + (options.method || 'GET').toUpperCase() + ']';
	var signature = method + ' ' + url;
	var start = new Date();

	setImmediate(console.log, chalk.gray('      → ' + signature));

	return request(options, cb)
		.on('response', function (response) {
			var status = response.statusCode;
			var s = status / 100 | 0;
			console.log('  ' + chalk[colorCodes[s]](status) + ' ← ' + signature + ' ' + chalk.gray(time(start)));
		})
		.on('error', function (err) {
			console.log('  ' + chalk.red('xxx') + ' ← ' + signature + ' ' + chalk.red(err.message));
		});
}

module.exports = function debugHttp(fn) {
	fn = fn || defaultHandler;

	if (typeof fn !== 'function') {
		throw new TypeError('Expected a function as request handler');
	}

	monkeypatch(http, 'request', fn);
};
