"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sign = exports.getAccounts = exports.createSigner = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
const amino_1 = require("@cosmjs/amino");
const encoding_1 = require("@cosmjs/encoding");
const hw_transport_node_hid_1 = __importDefault(require("@ledgerhq/hw-transport-node-hid"));
const ledgersigner_1 = require("../ledgersigner");
const defaultChainId = "testing";
const defaultFee = {
    amount: [{ amount: "100", denom: "ucosm" }],
    gas: "250",
};
const defaultMemo = "Some memo";
const defaultSequence = "0";
async function createSigner() {
    const interactiveTimeout = 120000;
    const ledgerTransport = await hw_transport_node_hid_1.default.create(interactiveTimeout, interactiveTimeout);
    return new ledgersigner_1.LedgerSigner(ledgerTransport, {
        testModeAllowed: true,
        hdPaths: [amino_1.makeCosmoshubPath(0), amino_1.makeCosmoshubPath(1), amino_1.makeCosmoshubPath(2), amino_1.makeCosmoshubPath(10)],
    });
}
exports.createSigner = createSigner;
async function getAccounts(signer) {
    const accounts = await signer.getAccounts();
    return accounts.map((account) => (Object.assign(Object.assign({}, account), { pubkey: encoding_1.toBase64(account.pubkey) })));
}
exports.getAccounts = getAccounts;
async function sign(signer, accountNumber, fromAddress, toAddress) {
    const msgs = [
        {
            type: "cosmos-sdk/MsgSend",
            value: {
                amount: [
                    {
                        amount: "1234567",
                        denom: "ucosm",
                    },
                ],
                from_address: fromAddress,
                to_address: toAddress,
            },
        },
    ];
    const signDoc = amino_1.makeSignDoc(msgs, defaultFee, defaultChainId, defaultMemo, accountNumber, defaultSequence);
    const { signature } = await signer.signAmino(fromAddress, signDoc);
    return signature;
}
exports.sign = sign;
//# sourceMappingURL=node.js.map