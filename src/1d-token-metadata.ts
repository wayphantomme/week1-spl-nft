import { publicKey } from "@metaplex-foundation/umi";
import { base58 } from "@metaplex-foundation/umi/serializers";
import {
  createMetadataAccountV3,
  mplTokenMetadata,
} from "@metaplex-foundation/mpl-token-metadata";
import { umi } from "./umi.js";

umi.use(mplTokenMetadata());

// Paste the mint address printed by 1a-create-mint.ts
const mint = publicKey("HBm48hWFrQTbuLsDKS79uLT4kwHcbKXvZjfsbPHVUcia");

(async () => {
  // 1. Upload the token metadata JSON to Irys
  const uri = await umi.uploader.uploadJson({
    name: "Turbin Sharingan",
    symbol: "TRBS",
    description: "SPL token for Turbin3 Week 1",
  });
  console.log("metadata uri:", uri);

  // 2. Write the metadata on-chain and attach it to the mint
  const tx = await createMetadataAccountV3(umi, {
    mint,
    mintAuthority: umi.identity,
    data: {
      name: "Turbin Sharingan",
      symbol: "TRBS",
      uri,
      sellerFeeBasisPoints: 0,
      creators: null,
      collection: null,
      uses: null,
    },
    isMutable: true,
    collectionDetails: null,
  }).sendAndConfirm(umi);

  console.log("signature:", base58.deserialize(tx.signature)[0]);
})();