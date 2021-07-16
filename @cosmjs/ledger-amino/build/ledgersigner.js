"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LedgerSigner = void 0;
const amino_1 = require("@cosmjs/amino");
const launchpadledger_1 = require("./launchpadledger");
class LedgerSigner {
    constructor(transport, options = {}) {
        this.hdPaths = options.hdPaths || [amino_1.makeCosmoshubPath(0)];
        this.ledger = new launchpadledger_1.LaunchpadLedger(transport, options);
    }
    async getAccounts() {
        if (!this.accounts) {
            const pubkeys = await this.ledger.getPubkeys();
            this.accounts = await Promise.all(pubkeys.map(async (pubkey) => ({
                algo: "secp256k1",
                address: await this.ledger.getCosmosAddress(pubkey),
                pubkey: pubkey,
            })));
        }
        return this.accounts;
    }
    async signAmino(signerAddress, signDoc) {
        const accounts = this.accounts || (await this.getAccounts());
        const accountIndex = accounts.findIndex((account) => account.address === signerAddress);
        if (accountIndex === -1) {
            throw new Error(`Address ${signerAddress} not found in wallet`);
        }
        const message = amino_1.serializeSignDoc(signDoc);
        const accountForAddress = accounts[accountIndex];
        const hdPath = this.hdPaths[accountIndex];
        const signature = await this.ledger.sign(message, hdPath);
        return {
            signed: signDoc,
            signature: amino_1.encodeSecp256k1Signature(accountForAddress.pubkey, signature),
        };
    }
}
exports.LedgerSigner = LedgerSigner;
//# sourceMappingURL=ledgersigner.js.map