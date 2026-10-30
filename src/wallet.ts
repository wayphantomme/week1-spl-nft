import fs from "fs";
import os from "os";
import path from "path";
import { Connection, Keypair, clusterApiUrl } from "@solana/web3.js";

const walletPath = path.join(os.homedir(), ".config", "solana", "id.json");
const secret = Uint8Array.from(JSON.parse(fs.readFileSync(walletPath, "utf-8")));

export const payer = Keypair.fromSecretKey(secret);
export const connection = new Connection(clusterApiUrl("devnet"), "confirmed");