import { StdSignature } from "@cosmjs/amino";
import { LedgerSigner } from "../ledgersigner";
export declare function createSigner(): Promise<LedgerSigner>;
export declare function getAccounts(signer: LedgerSigner): Promise<ReadonlyArray<{
    readonly algo: string;
    readonly address: string;
    readonly pubkey: string;
}>>;
export declare function sign(signer: LedgerSigner, accountNumber: number, fromAddress: string, toAddress: string): Promise<StdSignature>;
