import test from 'ava';
import http from 'http';
import https from 'https';
import url from 'url';
import debugHttp from '../';

test('calls handler on http request', t => {
	var called = 0;

	debugHttp(function (request, options, cb) {
		called++;
		return request(options, cb);
	});

	http.request(url.parse('http://google.com'));
	https.request(url.parse('https://google.com'));

	t.is(called, 2);
	t.end();
});
