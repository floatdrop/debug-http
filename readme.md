# debug-http [![Build Status](https://travis-ci.org/floatdrop/debug-http.svg?branch=master)](https://travis-ci.org/floatdrop/debug-http)

> Debug HTTP/HTTPS requests in Node.js

## Install

```
$ npm install --save debug-http
```

## Usage

<img width="300" alt="6ea28c66-8c6f-11e5-8170-fc30022000f7" src="https://cloud.githubusercontent.com/assets/365089/11191529/7f703a2c-8cbd-11e5-80fc-1d6f895986cc.png" align="right">

```js
const debugHttp = require('debug-http');
debugHttp();
```


## API

### debugHttp([fn])

#### fn

Type: `Function`

Request handler. By default outputs requests in console.

## License

MIT © [Vsevolod Strukchinsky](http://github.com/floatdrop)
