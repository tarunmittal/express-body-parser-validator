let httpError = require('./httpError.js');

exports.sendError = (err, req, res) => {
    if (err instanceof httpError) {
        let { response: err_string } = err.response;
        if (err_string == '') {
            err_string = 'Some unknown error occured';
        }
        res.status(400).json(getResponseObject({ text: 'error', code: 400, success: false }, err_string) || {});
        return;
    }
    let err_string = 'Some unknown error occured, please try again';
    res.status(200).json(getResponseObject({ text: 'error', code: 400, success: false }, err_string) || {});
};

let getResponseObject = function (status, message, success = true) {
    return {
        'response_code': status.code,
        'response_message': status.text === 'success' ? "" : message,
    }
};
