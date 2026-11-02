import { publicKey } from "@metaplex-foundation/umi";
import { base58 } from "@metaplex-foundation/umi/serializers";
import { fetchAsset, update } from "@metaplex-foundation/mpl-core";
import { umi } from "./umi.js";

const ASSET = publicKey("2UdateFp28HTNg2oRFMRWBRGNZMMNQ9eg7eyzbDttjjg");

const NEW_NAME = "Turbin Sharingan #1";
const NEW_DESCRIPTION = "Minted, updated, transferred and burned on Solana devnet as part of Turbin3 Builders Cohort Q4 2026 Week 1.";

(async () => {
  const asset = await fetchAsset(umi, ASSET);
  console.log("current name:", asset.name);

  // Reuse the image from the current metadata JSON
  const old = await (await fetch(asset.uri)).json();

  // Upload a new metadata JSON with the new name and description
  const uri = await umi.uploader.uploadJson({
    name: NEW_NAME,
    description: NEW_DESCRIPTION,
    image: old.image,
    properties: old.properties,
  });
  console.log("new metadata uri:", uri);

  // Update the on-chain name and uri
  const tx = await update(umi, {
    asset,
    name: NEW_NAME,
    uri,
  }).sendAndConfirm(umi);

  console.log("signature:", base58.deserialize(tx.signature)[0]);
})();