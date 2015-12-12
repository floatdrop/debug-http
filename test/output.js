import test from 'ava';
import http from 'http';
import chalk from 'chalk';
import debugHttp from '../';

let server;

test.cb('nice stuff', t => {
	server = http.createServer(function (rq, res) {
		res.end('OK');
	}).listen(8081);

	debugHttp();

	let i = 0;
	console.log = function (string) {
		string = chalk.stripColor(string);

		if (i === 0) {
			t.is(string, '      → GET http://localhost:8081/');
		}

		if (i === 1) {
			t.regexTest(/200 ← GET http:\/\/localhost:8081\/ (\d+)ms/, string);
			t.end();
		}

		i++;
	};

	http.get('http://localhost:8081');
});

test.cb.after('teardown', t => {
	if (server) {
		server.close();
		t.end();
	}
});
