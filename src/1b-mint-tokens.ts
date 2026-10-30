import { PublicKey } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo, getAccount } from "@solana/spl-token";
import { payer, connection } from "./wallet.js";

const MINT = new PublicKey("HBm48hWFrQTbuLsDKS79uLT4kwHcbKXvZjfsbPHVUcia");

const ata = await getOrCreateAssociatedTokenAccount(connection, payer, MINT, payer.publicKey);
console.log("My token account:", ata.address.toBase58());

await mintTo(connection, payer, MINT, ata.address, payer, 1_000_000_000);

const info = await getAccount(connection, ata.address);
console.log("Balance (raw):", info.amount.toString());