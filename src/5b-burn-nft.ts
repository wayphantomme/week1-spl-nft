import { burn, fetchAsset } from "@metaplex-foundation/mpl-core";
import { publicKey } from "@metaplex-foundation/umi";
import { base58 } from "@metaplex-foundation/umi/serializers";
import { umi } from "./umi.js";

const ASSET = publicKey("7r3j9Qoc97TFQuePpqRfsCQjNYRDFKvJrEu5gWMqXcJH");

const solBalance = async () =>
  Number((await umi.rpc.getBalance(umi.identity.publicKey)).basisPoints) / 1_000_000_000;

const asset = await fetchAsset(umi, ASSET);
console.log("Balance before:", await solBalance(), "SOL");

const tx = await burn(umi, { asset }).sendAndConfirm(umi);

console.log("Balance after: ", await solBalance(), "SOL");
console.log(`Tx: https://explorer.solana.com/tx/${base58.deserialize(tx.signature)[0]}?cluster=devnet`);