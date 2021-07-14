"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simapp = exports.launchpad = exports.pendingWithoutSimapp = exports.simappEnabled = exports.pendingWithoutLaunchpad = exports.launchpadEnabled = exports.pendingWithoutLedger = exports.ledgerEnabled = exports.faucet = void 0;
exports.faucet = {
    mnemonic: "economy stock theory fatal elder harbor betray wasp final emotion task crumble siren bottom lizard educate guess current outdoor pair theory focus wife stone",
    pubkey: {
        type: "tendermint/PubKeySecp256k1",
        value: "A08EGB7ro1ORuFhjOnZcSgwYlpe0DSFjVNUIkNNQxwKQ",
    },
    address: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
};
function ledgerEnabled() {
    return !!process.env.LEDGER_ENABLED;
}
exports.ledgerEnabled = ledgerEnabled;
function pendingWithoutLedger() {
    if (!ledgerEnabled()) {
        return pending("Set LEDGER_ENABLED to enable Ledger-based tests");
    }
}
exports.pendingWithoutLedger = pendingWithoutLedger;
function launchpadEnabled() {
    return !!process.env.LAUNCHPAD_ENABLED;
}
exports.launchpadEnabled = launchpadEnabled;
function pendingWithoutLaunchpad() {
    if (!launchpadEnabled()) {
        return pending("Set LAUNCHPAD_ENABLED to enable Launchpad-based tests");
    }
}
exports.pendingWithoutLaunchpad = pendingWithoutLaunchpad;
function simappEnabled() {
    return !!process.env.SIMAPP_ENABLED;
}
exports.simappEnabled = simappEnabled;
function pendingWithoutSimapp() {
    if (!simappEnabled()) {
        return pending("Set SIMAPP_ENABLED to enable Simapp-based tests");
    }
}
exports.pendingWithoutSimapp = pendingWithoutSimapp;
exports.launchpad = {
    endpoint: "http://localhost:1317",
    chainId: "testing",
};
exports.simapp = {
    endpoint: "ws://localhost:26658",
    chainId: "simd-testing",
};
//# sourceMappingURL=testutils.spec.js.map