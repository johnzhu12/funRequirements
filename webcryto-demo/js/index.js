// /*
// Get some key material to use as input to the deriveKey method.
// The key material is a password supplied by the user.
// */
// function getKeyMaterial() {
//     let password = window.prompt("Enter your password");
//     let enc = new TextEncoder();
//     return window.crypto.subtle.importKey(
//         "raw",
//         enc.encode(password),
//         { name: "PBKDF2" },
//         false,
//         ["deriveBits", "deriveKey"]
//     );
// }

// // async function encrypt(plaintext, salt, iv) {
// //     let keyMaterial = await getKeyMaterial();
// //     let key = await window.crypto.subtle.deriveKey(
// //         {
// //             "name": "PBKDF2",
// //             salt: salt,
// //             "iterations": 100000,
// //             "hash": "SHA-256"
// //         },
// //         keyMaterial,
// //         { "name": "HMAC", "length": 256 },
// //         true,
// //         ["encrypt", "decrypt"]
// //     );

// //     return window.crypto.subtle.encrypt(
// //         {
// //             name: "AES-GCM",
// //             iv: iv
// //         },
// //         key,
// //         plaintext
// //     );
// // }

// async function getKey() {
//     let keyMaterial = await getKeyMaterial();
//     var array = new Uint32Array(10);
//     window.crypto.getRandomValues(array);
//     window.crypto.subtle.deriveBits(
//         {
//             "name": "PBKDF2",
//             salt: array,
//             "iterations": 1000000,
//             "hash": "SHA-256"
//         },
//         keyMaterial,
//         256
//     ).then(function (key) {
//         console.log('我的key', key)
//     }).catch(function (e) {
//         console.log('我是错误', e)
//     })

// }

// //2. 通过key生成公钥

// getKey();



async function checkSharedSecret() {
    let key1 = await window.crypto.subtle.generateKey(
        {
            name: "ECDH",
            namedCurve: "P-384"
        },
        false,
        ["deriveBits"]
    )
    let key2 = await window.crypto.subtle.generateKey(
        {
            name: "ECDSA",
            namedCurve: "P-384"
        },
        true,
        ["sign", "verify"]
    )
    // const keyData = await crypto.subtle.exportKey('raw', key2.publicKey);
    // console.log('keyData', keyData)
    // try {
    //     const result = await crypto.subtle.importKey(
    //         'raw',
    //         keyData,
    //         {
    //             name: "ECDH",
    //             namedCurve: "P-384",
    //         },
    //         true,
    //         []
    //     );
    //     console.log('heh', result)
    //     deriveSharedSecret(key1.privateKey, result)
    // } catch (error) {
    //     console.log('error occurs:', error)
    // }

    try {
        const keyData = await crypto.subtle.exportKey('jwk', key2.privateKey);
        console.log('keyData', keyData)
        const result = await crypto.subtle.importKey(
            'jwk',
            keyData,
            {
                name: "ECDH",
                namedCurve: "P-384",
            },
            true,
            ['deriveBits']
        );
        console.log('heh', result)
        deriveSharedSecret(key1.privateKey, result)
    } catch (error) {
        console.log('error occurs:', error)
    }

}

async function deriveSharedSecret(privateKey, publicKey) {
    publicKey.algorithm.name = 'ECDH'
    try {
        const sharedSecret = await window.crypto.subtle.deriveBits(
            {
                name: "ECDH",
                namedCurve: "P-384",
                public: publicKey
            },
            privateKey,
            256
        );

        const buffer = new Uint8Array(sharedSecret);
        console.log('buffer', buffer)
        // const sharedSecretValue = document.querySelector(".ecdh .derived-bits-value");
        // sharedSecretValue.classList.add("fade-in");
        // sharedSecretValue.addEventListener("animationend", () => {
        //     sharedSecretValue.classList.remove("fade-in");
        // });
        // sharedSecretValue.textContent = `${buffer}...[${sharedSecret.byteLength} bytes total]`;
    } catch (e) {
        console.log('error occurs:', e)
    }

}
checkSharedSecret();