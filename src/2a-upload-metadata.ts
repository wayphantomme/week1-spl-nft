import fs from "fs";
import { createGenericFile } from "@metaplex-foundation/umi";
import { umi } from "./umi.js";

// 1. Upload the image
const image = createGenericFile(fs.readFileSync("./image.png"), "image.png", {
  tags: [{ name: "Content-Type", value: "image/png" }],
});
const [imageUri] = await umi.uploader.upload([image]);
console.log("Image:", imageUri);

// 2. Upload the metadata JSON that points to the image
const metadataUri = await umi.uploader.uploadJson({
  name: "My NFT",
  description: "My first Core NFT",
  image: imageUri,
  attributes: [{ trait_type: "week", value: "1" }],
  properties: { files: [{ uri: imageUri, type: "image/png" }], category: "image" },
});
console.log("Metadata:", metadataUri);