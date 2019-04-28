var hexToBase64 = exports.hexToBase64 = function (str) {
    return str ? Buffer(str, 'hex').toString('base64') : undefined;
}
var base64ToHex = exports.base64ToHex = function (str) {
    return str ? Buffer(str, 'base64').toString('hex') : undefined;
}