 
var createCredentialDefaultArgs = {
    publicKey: {
        rp: {
            name: "Acme",
        },
        user: {
            id: new Uint8Array(16),
            name: "john.p.smith@example.com",
            displayName: "John P. Smith",
        },
        pubKeyCredParams: [
            {
                type: "public-key",
                alg: -7,
            },
        ],
        attestation: "direct",
        timeout: 60000,
        challenge: new Uint8Array([
            0x8c, 0x0a, 0x26, 0xff, 0x22, 0x91, 0xc1, 0xe9, 0xb9, 0x4e, 0x2e, 0x17,
            0x1a, 0x98, 0x6a, 0x73, 0x71, 0x9d, 0x43, 0x48, 0xd5, 0xa7, 0x6a, 0x15,
            0x7e, 0x38, 0x94, 0x52, 0x77, 0x97, 0x0f, 0xef,
        ]).buffer,
    },
};

var getCredentialDefaultArgs = {
    publicKey: {
        timeout: 60000,
        challenge: new Uint8Array([
            0x79, 0x50, 0x68, 0x71, 0xda, 0xee, 0xee, 0xb9, 0x94, 0xc3, 0xc2, 0x15,
            0x67, 0x65, 0x26, 0x22, 0xe3, 0xf3, 0xab, 0x3b, 0x78, 0x2e, 0xd5, 0x6f,
            0x81, 0x26, 0xe2, 0xa6, 0x01, 0x7d, 0x74, 0x50,
        ]).buffer,
    },
};

document.getElementById("register").addEventListener("click", () => {
    navigator.credentials
        .create(createCredentialDefaultArgs)
        .then((cred) => {
            console.log("NEW CREDENTIAL", cred);

            var idList = [
                {
                    id: cred.rawId,
                    transports: ["usb", "nfc", "ble"],
                    type: "public-key",
                },
            ];
            getCredentialDefaultArgs.publicKey.allowCredentials = idList;
            return navigator.credentials.get(getCredentialDefaultArgs);
        })
        .then((assertion) => {
            console.log("ASSERTION", assertion);
        })
        .catch((err) => {
            console.log("ERROR", err);
        });
});

document.getElementById("login").addEventListener("click", () => {
    navigator.credentials
        .get(getCredentialDefaultArgs)
        .then((assertion) => {
            console.log("ASSERTION", assertion);
        })
        .catch((err) => {
            console.log("ERROR", err);
        });
});
