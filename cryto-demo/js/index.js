/*
Get some key material to use as input to the deriveKey method.
The key material is a password supplied by the user.
*/
function getKeyMaterial() {
    let password = window.prompt("Enter your password");
    let enc = new TextEncoder();
    return window.crypto.subtle.importKey(
        "raw",
        enc.encode(password),
        { name: "PBKDF2" },
        false,
        ["deriveBits", "deriveKey"]
    );
}

// async function encrypt(plaintext, salt, iv) {
//     let keyMaterial = await getKeyMaterial();
//     let key = await window.crypto.subtle.deriveKey(
//         {
//             "name": "PBKDF2",
//             salt: salt,
//             "iterations": 100000,
//             "hash": "SHA-256"
//         },
//         keyMaterial,
//         { "name": "HMAC", "length": 256 },
//         true,
//         ["encrypt", "decrypt"]
//     );

//     return window.crypto.subtle.encrypt(
//         {
//             name: "AES-GCM",
//             iv: iv
//         },
//         key,
//         plaintext
//     );
// }

async function getKey() {
    let keyMaterial = await getKeyMaterial();
    var array = new Uint32Array(10);
    window.crypto.getRandomValues(array);
    window.crypto.subtle.deriveBits(
        {
            "name": "PBKDF2",
            salt: array,
            "iterations": 1000000,
            "hash": "SHA-256"
        },
        keyMaterial,
        256
    ).then(function (key) {
        console.log('我的key', key)
    }).catch(function (e) {
        console.log('我是错误', e)
    })

}

//2. 通过key生成公钥

getKey();