var hexToBase64 = exports.hexToBase64 = function (str) {
    return str ? Buffer(str, 'hex').toString('base64') : undefined;
}
