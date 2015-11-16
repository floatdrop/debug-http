# debug-http [![Build Status](https://travis-ci.org/floatdrop/debug-http.svg?branch=master)](https://travis-ci.org/floatdrop/debug-http)

> Debug HTTP/HTTPS requests in Node.js


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
