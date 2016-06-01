import test from 'ava';
import chalk from 'chalk';
import pem from 'pem';
import pify from 'pify';
import got from 'got';
import debugHttp from '../';
import {createSSLServer} from './helpers/server';

let s;
let caRootCert;

const pemP = pify(pem, Promise);

test.before('setup', async () => {
	const caKeys = await pemP.createCertificate({days: 1, selfSigned: true});

	const caRootKey = caKeys.serviceKey;
	caRootCert = caKeys.certificate;

	const keys = await pemP.createCertificate({
		serviceCertificate: caRootCert,
		serviceKey: caRootKey,
		serial: Date.now(),
		days: 500,
		country: '',
		state: '',
		locality: '',
		organization: '',
		organizationUnit: '',
		commonName: 'sindresorhus.com'
	});

	const key = keys.clientKey;
	const cert = keys.certificate;

	s = await createSSLServer({key, cert});

	s.on('/', (req, res) => res.end('ok'));

	await s.listen(s.port);
});

test('https works', async t => {
	debugHttp();

	let strs = [];
	console.log = function (string) {
		strs.push(chalk.stripColor(string));
	};

	await got(s.url, {
		strictSSL: true,
		ca: caRootCert,
		headers: {host: 'sindresorhus.com'}
	});

	t.is(strs.length, 2);
	t.is(strs[0].indexOf(`      → GET ${s.url}`), 0);
});

test.after('cleanup', async () => {
	await s.close();
});
