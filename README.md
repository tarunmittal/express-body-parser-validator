# express-body-parser-validator
[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![Build Status][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]
Body parser validator is an express middleware, which can be used seamlessly with or without body parser. It ensures that mandatory request parameters are present in request with minimal coding.


**Note** This package validates, if input `JSON` has mandatory `key`. This will grow to handle any kind of request input as well as more complex validations. 

[Learn about the anatomy of an HTTP transaction in Node.js](https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/).


## Installation

```sh
$ npm install express-body-parser-validator
```

## API

<!-- eslint-disable no-unused-vars -->

```js
var bodyParserValidator = require('express-body-parser-validator').hasJsonParam
```

The `bodyParserValidator` *function* can be used directly as an express middleware. It takes an array of mandatory fields as parameter. 



## Examples

### Express route-specific

This example demonstrates adding body parsers specifically to the routes that
need them. In general, this is the most recommended way to use body-parser with
Express.

```js
var express = require('express')

var app = express()

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// POST /auth gets urlencoded bodies
app.post('/auth', bodyParserValidator(["email", "password"]), function (req, res) {
  //Controll reaches here, only if request JSON has keys: "email", "password"
})

// POST /api/paginate-results gets JSON bodies
// Usage along with body-parser
app.post('/api/paginate-results', [jsonParser, bodyParserValidator(["page_no", "limit"])], function (req, res) {
  //Controll reaches here, only if request JSON has keys: "page_no", "limit"
})
```


## License

[MIT](LICENSE)
