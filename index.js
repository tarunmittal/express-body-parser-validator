let consts = require('./lib/consts.js');
let httpError = require('./lib/httpError.js');
let helper = require('./lib/helpers.js');


var hasJsonParam = module.exports.hasJsonParam = function (paramArray) {
    return hasJsonParam[paramArray] || (hasJsonParam[paramArray] = function (req, res, next) {
        var jsonBody = req.body;
        try {
            var counter = paramArray.length;
            let responseArray = [];
            for (var i = 0; i < paramArray.length; i++) {
                if (!jsonBody.hasOwnProperty(paramArray[i])) {
                    responseArray.push(consts.MISSING_PARAM(paramArray[i]));
                }
                counter--;
                if (counter == 0 && responseArray.length > 0) {
                    helper.sendError(new httpError(consts.BAD_REQUEST, { response: responseArray }), req, res);
                } else if (counter == 0) {
                    next();
                }
            }
        } catch (e) {
            helper.sendError(new httpError(consts.BAD_REQUEST, { response: consts.INVALID_JSON }), req, res);
        }
    })
};