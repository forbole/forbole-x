/// <reference types="ledgerhq__hw-transport" />
import { AccountData, AminoSignResponse, OfflineAminoSigner, StdSignDoc } from "@cosmjs/amino";
import Transport from "@ledgerhq/hw-transport";
import { LaunchpadLedgerOptions } from "./launchpadledger";
export declare class LedgerSigner implements OfflineAminoSigner {
    private readonly ledger;
    private readonly hdPaths;
    private accounts?;
    constructor(transport: Transport, options?: LaunchpadLedgerOptions);
    getAccounts(): Promise<readonly AccountData[]>;
    signAmino(signerAddress: string, signDoc: StdSignDoc): Promise<AminoSignResponse>;
}
