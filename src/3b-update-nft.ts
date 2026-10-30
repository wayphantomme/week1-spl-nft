import { fetchAsset, update } from "@metaplex-foundation/mpl-core";
import { publicKey } from "@metaplex-foundation/umi";
import { base58 } from "@metaplex-foundation/umi/serializers";
import { umi } from "./umi.js";

const ASSET = publicKey("2UdateFp28HTNg2oRFMRWBRGNZMMNQ9eg7eyzbDttjjg");
const NEW_URI = "https://gateway.irys.xyz/38sztv1pwpVfJNkWWekuZij2kP4DzyuiRK7NQG6Qm13P";

const asset = await fetchAsset(umi, ASSET);
console.log("Before:", asset.name, asset.uri);

const tx = await update(umi, {
  asset,
  name: "My Updated NFT",
  uri: NEW_URI,
}).sendAndConfirm(umi);

const after = await fetchAsset(umi, ASSET);
console.log("After:", after.name, after.uri);
console.log(`Tx: https://explorer.solana.com/tx/${base58.deserialize(tx.signature)[0]}?cluster=devnet`);