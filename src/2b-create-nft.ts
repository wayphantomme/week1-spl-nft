import { create } from "@metaplex-foundation/mpl-core";
import { generateSigner } from "@metaplex-foundation/umi";
import { base58 } from "@metaplex-foundation/umi/serializers";
import { umi } from "./umi.js";

const METADATA_URI = "https://gateway.irys.xyz/FuQYg8BtcqZFunwz3zFPPjYuKdV1DrbGRjrWc1w3JCMe";

// A new keypair whose public key becomes the asset address
const asset = generateSigner(umi);

const tx = await create(umi, {
  asset,
  name: "My NFT",
  uri: METADATA_URI,
}).sendAndConfirm(umi);

console.log("Asset address:", asset.publicKey);
console.log(`Tx: https://explorer.solana.com/tx/${base58.deserialize(tx.signature)[0]}?cluster=devnet`);
console.log(`Asset: https://core.metaplex.com/explorer/${asset.publicKey}?env=devnet`);