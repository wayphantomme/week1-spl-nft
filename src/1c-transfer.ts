import { PublicKey } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";
import { payer, connection } from "./wallet.js";

const MINT = new PublicKey("HBm48hWFrQTbuLsDKS79uLT4kwHcbKXvZjfsbPHVUcia");
const RECIPIENT = new PublicKey("6F8JUMg7iYuhqZ7ZH6VTQ1BMWyHv8i5zg2j76E5jBWZL");

const fromAta = await getOrCreateAssociatedTokenAccount(connection, payer, MINT, payer.publicKey);
const toAta = await getOrCreateAssociatedTokenAccount(connection, payer, MINT, RECIPIENT);

const sig = await transfer(connection, payer, fromAta.address, toAta.address, payer, 100_000_000);
console.log(`Transfer: https://explorer.solana.com/tx/${sig}?cluster=devnet`);