"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const amino_1 = require("@cosmjs/amino");
const encoding_1 = require("@cosmjs/encoding");
const math_1 = require("@cosmjs/math");
const utils_1 = require("@cosmjs/utils");
const hw_transport_webusb_1 = __importDefault(require("@ledgerhq/hw-transport-webusb"));
const ledgersigner_1 = require("../ledgersigner");
let accounts = [];
function createSignDoc(accountNumber, address) {
    const signDoc = {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        chain_id: "testing",
        // eslint-disable-next-line @typescript-eslint/naming-convention
        account_number: `${accountNumber}`,
        sequence: "0",
        fee: {
            amount: [{ amount: "100", denom: "ucosm" }],
            gas: "250",
        },
        memo: "Some memo",
        msgs: [
            {
                type: "cosmos-sdk/MsgSend",
                value: {
                    amount: [
                        {
                            amount: "1234567",
                            denom: "ucosm",
                        },
                    ],
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    from_address: address,
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    to_address: address,
                },
            },
        ],
    };
    return JSON.stringify(signDoc, null, 2);
}
window.updateMessage = (accountNumberInput) => {
    utils_1.assert(typeof accountNumberInput === "string");
    const accountNumber = math_1.Uint53.fromString(accountNumberInput).toNumber();
    const account = accounts[accountNumber];
    if (account === undefined) {
        return;
    }
    const address = accounts[accountNumber].address;
    const addressInput = document.getElementById("address");
    addressInput.value = address;
    const signDocTextArea = document.getElementById("sign-doc");
    signDocTextArea.textContent = createSignDoc(accountNumber, address);
};
window.createSigner = async function createSigner() {
    const interactiveTimeout = 120000;
    const ledgerTransport = await hw_transport_webusb_1.default.create(interactiveTimeout, interactiveTimeout);
    return new ledgersigner_1.LedgerSigner(ledgerTransport, {
        testModeAllowed: true,
        hdPaths: [amino_1.makeCosmoshubPath(0), amino_1.makeCosmoshubPath(1), amino_1.makeCosmoshubPath(2)],
    });
};
window.getAccounts = async function getAccounts(signer) {
    if (signer === undefined) {
        console.error("Please wait for transport to connect");
        return;
    }
    const accountNumberInput = document.getElementById("account-number");
    const addressInput = document.getElementById("address");
    const accountsDiv = document.getElementById("accounts");
    const signDocTextArea = document.getElementById("sign-doc");
    accountsDiv.textContent = "Loading...";
    try {
        accounts = await signer.getAccounts();
        const prettyAccounts = accounts.map((account) => (Object.assign(Object.assign({}, account), { pubkey: encoding_1.toBase64(account.pubkey) })));
        accountsDiv.textContent = JSON.stringify(prettyAccounts, null, "\n");
        const accountNumber = 0;
        accountNumberInput.max = accounts.length - 1;
        accountNumberInput.value = accountNumber;
        const address = accounts[0].address;
        addressInput.value = address;
        signDocTextArea.textContent = createSignDoc(accountNumber, address);
    }
    catch (error) {
        accountsDiv.textContent = error;
    }
};
window.sign = async function sign(signer) {
    if (signer === undefined) {
        console.error("Please wait for transport to connect");
        return;
    }
    const signatureDiv = document.getElementById("signature");
    signatureDiv.textContent = "Loading...";
    try {
        const address = document.getElementById("address").value;
        const signDocJson = document.getElementById("sign-doc").textContent;
        const signDoc = JSON.parse(signDocJson);
        const signature = await signer.signAmino(address, signDoc);
        signatureDiv.textContent = JSON.stringify(signature, null, "\t");
    }
    catch (error) {
        signatureDiv.textContent = error;
    }
};
window.onload = async function onLoad() {
    window.signer = await window.createSigner();
};
//# sourceMappingURL=web.js.map