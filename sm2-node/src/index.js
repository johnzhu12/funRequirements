const helper = require('./utils/helper.js')
/**
 * 获取密钥对
 */
const sm2 = require('sm-crypto').sm2;

let keypair = sm2.generateKeyPairHex();

// let publicKey = keypair.publicKey; // 公钥
// let privateKey = keypair.privateKey; // 私钥
let publicKey = "04f4f5e4fc3ade644c1107e0d6594159a847e10d972ccdaa3c0a304be0be66aacb271f8c11993d38250fa5b8cb7012c7f5758703e222051a58f756ae306056b320"; // 公钥
let privateKey = "e559d7dbeefa107928a03e26b8dca8d8b1f0d543e2616077b7ca494c619d5825"; // 私钥

let publicKeyBase64 = helper.hexToBase64(publicKey)
let privateKeyBase64 = helper.hexToBase64(privateKey)

console.log('publicKeyBase64', publicKeyBase64)
console.log('privateKeyBase64', privateKeyBase64)


/**
 * 加密解密
 */
const cipherMode = 0; // 1 - C1C3C2，0 - C1C2C3，默认为1

let msgString = `春江潮水连海平，海上明月共潮生。滟滟随波千万里，何处春江无月明。江流宛转绕芳甸，月照花林皆似霰。空里流霜不觉飞，汀上白沙看不见。江天一色无纤尘，皎皎空中孤月轮。江畔何人初见月？江月何年初照人？`
let encryptData = sm2.doEncrypt(msgString, publicKey, cipherMode); // 加密结果
let decryptData = sm2.doDecrypt(encryptData, privateKey, cipherMode); // 解密结果

// console.log(decryptData)


var enc = helper.hexToBase64(encryptData)
// console.log('enc', enc)

//签名验签

// 纯签名
let sigValueHex2 = sm2.doSignature(msgString, privateKey, {
    pointPool: [sm2.getPoint(), sm2.getPoint(), sm2.getPoint(), sm2.getPoint()], // 传入事先已生成好的椭圆曲线点，可加快签名速度
}); // 签名
let verifyResult2 = sm2.doVerifySignature(msgString, sigValueHex2, publicKey); // 验签结果

// console.log('sigValueHex2', helper.hexToBase64(sigValueHex2))
// console.log('verifyResult2', verifyResult2)

// 纯签名 + 生成椭圆曲线点 + der编解码
let sigValueHex3 = sm2.doSignature(msgString, privateKey, {
    der: true,
    hash: true,
    publicKey
}); // 签名
let verifyResult3 = sm2.doVerifySignature(msgString, sigValueHex3, publicKey, {
    der: true,
    hash: true,
    publicKey
}); // 验签结果



console.log('sigValueHex3', helper.hexToBase64(sigValueHex3))
console.log('verifyResult3', verifyResult3)