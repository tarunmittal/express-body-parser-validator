# express-body-parser-validator

Body parser validator is an express middleware, which can be used in sync with the [body-parser](https://www.npmjs.com/package/body-parser) package. It ensures that mandatory request parameters are present in request body with minimal coding.


**Note** This package is used in sync with the [body-parser](https://www.npmjs.com/package/body-parser) package, which should be called before this middleware.


## Installation

```sh
$ npm install express-body-parser-validator
```

## API

<!-- eslint-disable no-unused-vars -->

```js
var bodyParserValidator = require('express-body-parser-validator').hasReqParam
```

The `bodyParserValidator` *function* can be used directly as an express middleware. It takes an array of mandatory fields as parameter. 



## Examples

### Express route-specific

This example demonstrates adding body parsers validator specifically to the routes that
need them. In general, this is the most recommended way to use express-body-parser-validator with
Express and Body Parser.

```js
var express = require('express')
var bodyParser = require('body-parser')
var bodyParserValidator = require('express-body-parser-validator').hasJsonParam


var app = express()

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// POST /auth gets urlencoded bodies
app.post('/auth/sign-up', [jsonParser, bodyParserValidator(["email", "password", "name"])], function (req, res) {
      //Controll reaches here, only if request has keys: "email", "password", and "name"

    res.send();
})

// POST /api/paginate-results gets JSON bodies
// Usage along with body-parser
app.post('/auth/login', [urlencodedParser, bodyParserValidator(["email", "password"])], function (req, res) {
    res.send();
  //Controll reaches here, only if request has keys: "email", "password"
})

app.listen(3000)

```


## License

[MIT](LICENSE)
