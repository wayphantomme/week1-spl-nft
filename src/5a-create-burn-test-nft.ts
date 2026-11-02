import { create } from "@metaplex-foundation/mpl-core";
import { generateSigner } from "@metaplex-foundation/umi";
import { umi } from "./umi.js";

const METADATA_URI = "https://gateway.irys.xyz/38sztv1pwpVfJNkWWekuZij2kP4DzyuiRK7NQG6Qm13P";

const asset = generateSigner(umi);
await create(umi, { asset, name: "Burn Test NFT", uri: METADATA_URI }).sendAndConfirm(umi);

console.log("Throwaway asset:", asset.publicKey);
console.log(`Asset: https://core.metaplex.com/explorer/${asset.publicKey}?env=devnet`);