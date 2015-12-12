# debug-http [![Build Status](https://travis-ci.org/floatdrop/debug-http.svg?branch=master)](https://travis-ci.org/floatdrop/debug-http)

> Debug HTTP/HTTPS requests in Node.js

## Install

```
$ npm install --save debug-http
```

## Usage

<img align="right" src="https://cloud.githubusercontent.com/assets/365089/11761802/c4eb65e2-a0f2-11e5-954c-e1af7c132be4.png">

```js
const debugHttp = require('debug-http');
debugHttp();

const http = require('http');
http.get('http://google.com');
```


## API

### debugHttp([fn])

#### fn

Type: `Function`

Request handler. By default outputs requests in console.

## License

MIT © [Vsevolod Strukchinsky](http://github.com/floatdrop)
