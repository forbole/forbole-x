export declare const faucet: {
    mnemonic: string;
    pubkey: {
        type: string;
        value: string;
    };
    address: string;
};
export declare function ledgerEnabled(): boolean;
export declare function pendingWithoutLedger(): void;
export declare function launchpadEnabled(): boolean;
export declare function pendingWithoutLaunchpad(): void;
export declare function simappEnabled(): boolean;
export declare function pendingWithoutSimapp(): void;
export declare const launchpad: {
    endpoint: string;
    chainId: string;
};
export declare const simapp: {
    endpoint: string;
    chainId: string;
};
