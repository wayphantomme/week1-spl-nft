import { fetchAsset, transfer } from "@metaplex-foundation/mpl-core";
import { publicKey } from "@metaplex-foundation/umi";
import { base58 } from "@metaplex-foundation/umi/serializers";
import { umi } from "./umi.js";

const ASSET = publicKey("2UdateFp28HTNg2oRFMRWBRGNZMMNQ9eg7eyzbDttjjg");
const NEW_OWNER = publicKey("6F8JUMg7iYuhqZ7ZH6VTQ1BMWyHv8i5zg2j76E5jBWZL"); // Solflare

const before = await fetchAsset(umi, ASSET);
console.log("Owner before:", before.owner);

const tx = await transfer(umi, { asset: before, newOwner: NEW_OWNER }).sendAndConfirm(umi);

const after = await fetchAsset(umi, ASSET);
console.log("Owner after:", after.owner);
console.log(`Tx: https://explorer.solana.com/tx/${base58.deserialize(tx.signature)[0]}?cluster=devnet`);