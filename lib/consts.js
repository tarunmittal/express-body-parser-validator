var statusCodes = {};

statusCodes[exports.BAD_REQUEST = 400] = "Bad Request";

exports.getStatusText = function (statusCode) {
    if (statusCodes.hasOwnProperty(statusCode)) {
        return statusCodes[statusCode];
    } else {
        throw new Error("Status code does not exist: " + statusCode);
    }
};

module.exports = {
    INVALID_BODY: 'Inavlid request body.',
    MISSING_PARAM: (param) => {
        return `${param} is a required param, Bad request`
    },
    UNATHORIZED: 'Unauthorised Request',
    FBUNATHORIZED: 'Unauthorised Request, Token is invalid'
}