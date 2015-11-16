# debug-http [![Build Status](https://travis-ci.org/floatdrop/debug-http.svg?branch=master)](https://travis-ci.org/floatdrop/debug-http)

> Debug HTTP/HTTPS requests in Node.js

<h1 align="center"><img width="602" alt="screen shot 2015-11-16 at 14 36 07" src="https://cloud.githubusercontent.com/assets/365089/11178569/6ea28c66-8c6f-11e5-8170-fc30022000f7.png"></h1>

## Install

```
$ npm install --save debug-http
```


## Usage

```js
const debugHttp = require('debug-http');

debugHttp();
//=> Outputs every HTTP/HTTPS request in console
```


## API

### debugHttp([fn])

#### fn

Type: `Function`

Request handler. By default outputs requests in console.

## License

MIT © [Vsevolod Strukchinsky](http://github.com/floatdrop)
