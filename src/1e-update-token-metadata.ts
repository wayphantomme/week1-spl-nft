import { readFile } from "node:fs/promises";
import { createGenericFile, publicKey, some } from "@metaplex-foundation/umi";
import { base58 } from "@metaplex-foundation/umi/serializers";
import {
  findMetadataPda,
  mplTokenMetadata,
  updateMetadataAccountV2,
} from "@metaplex-foundation/mpl-token-metadata";
import { umi } from "./umi.js";

umi.use(mplTokenMetadata());

const mint = publicKey("HBm48hWFrQTbuLsDKS79uLT4kwHcbKXvZjfsbPHVUcia");

(async () => {
  // 1. Upload the token image to Irys
  const file = createGenericFile(await readFile("token.png"), "token.png", {
    contentType: "image/png",
  });
  const [imageUri] = await umi.uploader.upload([file]);
  console.log("image uri:", imageUri);

  // 2. Upload a new metadata JSON that includes the image
  const uri = await umi.uploader.uploadJson({
    name: "Turbin Sharingan",
    symbol: "TRBS",
    description: "SPL token for Turbin3 Week 1",
    image: imageUri,
  });
  console.log("metadata uri:", uri);

  // 3. Point the on-chain metadata to the new JSON
  const tx = await updateMetadataAccountV2(umi, {
    metadata: findMetadataPda(umi, { mint }),
    updateAuthority: umi.identity,
    data: some({
      name: "Turbin Sharingan",
      symbol: "TRBS",
      uri,
      sellerFeeBasisPoints: 0,
      creators: null,
      collection: null,
      uses: null,
    }),
  }).sendAndConfirm(umi);

  console.log("signature:", base58.deserialize(tx.signature)[0]);
})(); 