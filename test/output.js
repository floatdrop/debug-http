import test from 'ava';
import http from 'http';
import url from 'url';
import debugHttp from '../';

test('nice stuff', t => {
	debugHttp();

	let i = 0;
	console.log = function (string) {
		if (i === 0) {
			t.is(string, '      → GET http://google.com/');
		}

		if (i === 1) {
			t.regexTest(/302 ← GET http:\/\/google.com\/ (\d+)ms/, string);
			t.end();
		}

		i++;
	};

	const req = http.request(url.parse('http://google.com'));
	req.end();
});
