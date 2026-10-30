import { createMint } from "@solana/spl-token";
import { payer, connection } from "./wallet.js";

const mint = await createMint(connection, payer, payer.publicKey, null, 6);
console.log("Mint:", mint.toBase58());