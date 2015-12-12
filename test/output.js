import test from 'ava';
import http from 'http';
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

	http.get('http://google.com');
});
