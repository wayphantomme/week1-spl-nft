import { umi } from "./umi.js";

// Same image as before
const IMAGE_URI = "https://gateway.irys.xyz/Aiynp9cvRpuh6jV5xVC2tARg1NNXQrpqsnQmmUqcLiE8";

const metadataUri = await umi.uploader.uploadJson({
  name: "My Updated NFT",
  description: "Updated in week 1 as the update authority",
  image: IMAGE_URI,
  attributes: [
    { trait_type: "week", value: "1" },
    { trait_type: "status", value: "updated" },
  ],
  properties: { files: [{ uri: IMAGE_URI, type: "image/png" }], category: "image" },
});
console.log("New metadata:", metadataUri);