let consts = require('./lib/consts.js');
let httpError = require('./lib/httpError.js');
let helper = require('./lib/helpers.js');


var hasReqParam = module.exports.hasReqParam = function (paramArray) {
    return hasReqParam[paramArray] || (hasReqParam[paramArray] = function (req, res, next) {
        var reqBody = req.body;
        try {
            var counter = paramArray.length;
            let responseArray = [];
            for (var i = 0; i < paramArray.length; i++) {
                if (!reqBody[paramArray[i]]) {
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
            helper.sendError(new httpError(consts.BAD_REQUEST, { response: consts.INVALID_BODY }), req, res);
        }
    })
};