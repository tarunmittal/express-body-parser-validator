let consts = require('./consts/consts.js');


module.exports.hasJsonParam = function (paramArray) {
    return hasJsonParam[paramArray] || (hasJsonParam[paramArray] = function (req, res, next) {
        console.log("INVOKING MY MIDDLEWARE !!");
        var jsonBody = req.body;
        console.log("REQ BODY IS !!", jsonBody);
        try {
            var counter = paramArray.length;
            let responseArray = [];
            for (var i = 0; i < paramArray.length; i++) {
                if (!jsonBody.hasOwnProperty(paramArray[i])) {
                    responseArray.push(consts.MISSING_PARAM(paramArray[i]));
                }
                counter--;
                if (counter == 0 && responseArray.length > 0) {
                    sendError(new httpError(consts.BAD_REQUEST, { response: responseArray }), req, res);
                } else if (counter == 0) {
                    next();
                }
            }
        } catch (e) {
            sendError(new httpError(consts.BAD_REQUEST, { response: consts.INVALID_JSON }), req, res);
        }
    })
};