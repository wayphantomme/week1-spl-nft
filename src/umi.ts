import { mplCore } from "@metaplex-foundation/mpl-core";
import { createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys";
import { secret } from "./wallet.js";

// Umi on devnet, with Core and the Irys uploader
export const umi = createUmi("https://api.devnet.solana.com")
  .use(mplCore())
  .use(irysUploader({ address: "https://devnet.irys.xyz" }));

// Use my CLI wallet as the identity (payer, owner, update authority)
const signer = createSignerFromKeypair(umi, umi.eddsa.createKeypairFromSecretKey(secret));
umi.use(signerIdentity(signer));