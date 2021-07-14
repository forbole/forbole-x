"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/naming-convention */
const amino_1 = require("@cosmjs/amino");
const crypto_1 = require("@cosmjs/crypto");
const encoding_1 = require("@cosmjs/encoding");
const launchpad_1 = require("@cosmjs/launchpad");
const stargate_1 = require("@cosmjs/stargate");
const utils_1 = require("@cosmjs/utils");
const ledgersigner_1 = require("./ledgersigner");
const testutils_spec_1 = require("./testutils.spec");
const interactiveTimeout = 120000;
async function createTransport() {
    let platform;
    try {
        platform = navigator.platform;
    }
    catch (error) {
        platform = "node";
    }
    // HACK: Use a variable to get webpack to ignore this
    const nodeJsTransportPackageName = "@ledgerhq/hw-transport-node-hid";
    const { default: TransportClass } = platform === "node"
        ? await Promise.resolve().then(() => __importStar(require(nodeJsTransportPackageName)))
        : await Promise.resolve().then(() => __importStar(require("@ledgerhq/hw-transport-webusb")));
    return TransportClass.create(interactiveTimeout, interactiveTimeout);
}
describe("LedgerSigner", () => {
    const defaultChainId = "testing";
    const defaultFee = {
        amount: amino_1.coins(100, "ucosm"),
        gas: "250",
    };
    const defaultMemo = "Some memo";
    const defaultSequence = "0";
    const defaultAccountNumber = "42";
    const defaultLedgerAddress = "cosmos1p6xs63q4g7np99ttv5nd3yzkt8n4qxa47w8aea";
    let transport;
    beforeAll(async () => {
        if (testutils_spec_1.simappEnabled()) {
            const wallet = await amino_1.Secp256k1HdWallet.fromMnemonic(testutils_spec_1.faucet.mnemonic);
            const client = await stargate_1.SigningStargateClient.connectWithSigner(testutils_spec_1.simapp.endpoint, wallet);
            const amount = amino_1.coins(226644, "ucosm");
            const memo = "Ensure chain has my pubkey";
            const sendResult = await client.sendTokens(testutils_spec_1.faucet.address, defaultLedgerAddress, amount, memo);
            stargate_1.assertIsBroadcastTxSuccess(sendResult);
        }
    });
    beforeEach(async () => {
        if (testutils_spec_1.ledgerEnabled()) {
            transport = await createTransport();
        }
    });
    afterEach(async () => {
        if (testutils_spec_1.ledgerEnabled()) {
            await transport.close();
        }
    });
    describe("getAccount", () => {
        it("works", async () => {
            testutils_spec_1.pendingWithoutLedger();
            const signer = new ledgersigner_1.LedgerSigner(transport, {
                testModeAllowed: true,
                hdPaths: [amino_1.makeCosmoshubPath(0), amino_1.makeCosmoshubPath(1), amino_1.makeCosmoshubPath(10)],
            });
            const accounts = await signer.getAccounts();
            expect(accounts.length).toEqual(3);
            expect(accounts).toEqual([
                {
                    address: "cosmos1p6xs63q4g7np99ttv5nd3yzkt8n4qxa47w8aea",
                    algo: "secp256k1",
                    pubkey: encoding_1.fromBase64("A66JoCNaNSXDsyj4qW7JgqXPTz5rOnfE6EKEArf4jJEK"),
                },
                {
                    address: "cosmos1meeu3jl268txxytwmmrsljk8rawh6n2majstn2",
                    algo: "secp256k1",
                    pubkey: encoding_1.fromBase64("AtvmGuZvEN3NwL05BQdxl3XygUf+Vl/930fhFMt1HTyU"),
                },
                {
                    address: "cosmos1f3pws3ztnp3s4nn5zxqdrl9vlqv5avkqmlrus4",
                    algo: "secp256k1",
                    pubkey: encoding_1.fromBase64("A2ZnLEcbpyjS30H5UF1vezq29aBcT9oo5EARATIW9Cpj"),
                },
            ]);
        });
    });
    describe("sign", () => {
        afterEach(async () => {
            // It seems the Ledger device needs a bit of time to recover
            await utils_1.sleep(500);
        });
        it("returns valid signature", async () => {
            testutils_spec_1.pendingWithoutLedger();
            const signer = new ledgersigner_1.LedgerSigner(transport, {
                testModeAllowed: true,
                hdPaths: [amino_1.makeCosmoshubPath(0), amino_1.makeCosmoshubPath(1), amino_1.makeCosmoshubPath(10)],
            });
            const [firstAccount] = await signer.getAccounts();
            const msgs = [
                {
                    type: "cosmos-sdk/MsgSend",
                    value: {
                        amount: amino_1.coins(1234567, "ucosm"),
                        from_address: firstAccount.address,
                        to_address: defaultLedgerAddress,
                    },
                },
            ];
            const signDoc = amino_1.makeSignDoc(msgs, defaultFee, defaultChainId, defaultMemo, defaultAccountNumber, defaultSequence);
            const { signed, signature } = await signer.signAmino(firstAccount.address, signDoc);
            expect(signed).toEqual(signDoc);
            const valid = await crypto_1.Secp256k1.verifySignature(crypto_1.Secp256k1Signature.fromFixedLength(encoding_1.fromBase64(signature.signature)), crypto_1.sha256(amino_1.serializeSignDoc(signed)), firstAccount.pubkey);
            expect(valid).toEqual(true);
        }, interactiveTimeout);
        it("creates signature accepted by Launchpad backend", async () => {
            testutils_spec_1.pendingWithoutLedger();
            testutils_spec_1.pendingWithoutLaunchpad();
            const signer = new ledgersigner_1.LedgerSigner(transport, {
                testModeAllowed: true,
                hdPaths: [amino_1.makeCosmoshubPath(0), amino_1.makeCosmoshubPath(1), amino_1.makeCosmoshubPath(10)],
            });
            const [firstAccount] = await signer.getAccounts();
            const client = new launchpad_1.SigningCosmosClient(testutils_spec_1.launchpad.endpoint, firstAccount.address, signer);
            const result = await client.sendTokens(defaultLedgerAddress, amino_1.coins(1234567, "ucosm"));
            launchpad_1.assertIsBroadcastTxSuccess(result);
        }, interactiveTimeout);
        it("creates signature accepted by Stargate backend", async () => {
            testutils_spec_1.pendingWithoutLedger();
            testutils_spec_1.pendingWithoutSimapp();
            const signer = new ledgersigner_1.LedgerSigner(transport, {
                testModeAllowed: true,
                hdPaths: [amino_1.makeCosmoshubPath(0), amino_1.makeCosmoshubPath(1), amino_1.makeCosmoshubPath(10)],
            });
            const [firstAccount] = await signer.getAccounts();
            const client = await stargate_1.SigningStargateClient.connectWithSigner(testutils_spec_1.simapp.endpoint, signer);
            const result = await client.sendTokens(firstAccount.address, defaultLedgerAddress, amino_1.coins(1234, "ucosm"));
            stargate_1.assertIsBroadcastTxSuccess(result);
        }, interactiveTimeout);
    });
});
//# sourceMappingURL=ledgersigner.spec.js.map