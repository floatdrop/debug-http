import test from 'ava';
import got from 'got';
import chalk from 'chalk';
import debugHttp from '../';
import {createServer} from './helpers/server';

let s;

test.before('setup', async () => {
	s = await createServer();

	s.on('/', (req, res) => res.end('ok'));

	await s.listen(s.port);
});

test('http works', async t => {
	debugHttp();

	let strs = [];
	console.log = function (string) {
		strs.push(chalk.stripColor(string));
	};

	await got(s.url);

	t.is(strs.length, 2);
	t.is(strs[0].indexOf(`      → GET ${s.url}`), 0);
	t.is(strs[1].indexOf(`  200 ← GET ${s.url}`), 0);
});

test.after('cleanup', async () => {
	await s.close();
});
