# Week 1: SPL Token and Core NFT

Turbin3 Builders Cohort Q4 2026, Week 1 assignment. Everything runs on **devnet**.

## What this repo does
1. Mints and transfers my own SPL token.
2. Mints an NFT using MPL Core.
3. Updates the NFT's name and metadata as the update authority.
4. (Extension) Transfers the NFT to another wallet.
5. (Extension) Burns an NFT and reclaims its rent.

## Project structure
Each step is its own small script so I can run it, inspect the result in Solana Explorer, and understand one concept at a time.

| File | What it does |
|---|---|
| `src/wallet.ts` | Loads my local Solana CLI wallet and connects to devnet |
| `src/umi.ts` | Sets up Umi (Metaplex framework) with Core, the Irys uploader, and my wallet as identity |
| `src/1a-create-mint.ts` | Creates the token mint (the "blueprint" of the token) |
| `src/1b-mint-tokens.ts` | Creates my token account (ATA) and mints 1000 tokens |
| `src/1c-transfer.ts` | Transfers 100 tokens to another wallet |
| `src/2a-upload-metadata.ts` | Uploads the NFT image and metadata JSON to Irys |
| `src/2b-create-nft.ts` | Creates the NFT as a single MPL Core asset |
| `src/3a-upload-new-metadata.ts` | Uploads a new metadata JSON (new name, description, attributes) to Irys |
| `src/3b-update-nft.ts` | Updates the NFT name and URI as the update authority |
| `src/4-transfer-nft.ts` | Transfers the NFT to my Solflare wallet |
| `src/5a-create-burn-test-nft.ts` | Creates a throwaway NFT so the main NFT is not destroyed |
| `src/5b-burn-nft.ts` | Burns the throwaway NFT and prints my balance before and after |
| `image.png` | The NFT image used by `2a` |

## Setup
Requires Node.js and a Solana CLI wallet at `~/.config/solana/id.json` with devnet SOL. The wallet is read from that path and is never stored in this repo.

```bash
npm install
```

## Run it
Run the scripts in order. Some scripts need a value from the previous one (marked below).

```bash
# Task 1: SPL token
npx tsx src/1a-create-mint.ts          # prints the mint address
# paste the mint address into 1b and 1c, then:
npx tsx src/1b-mint-tokens.ts
npx tsx src/1c-transfer.ts

# Task 2: NFT
npx tsx src/2a-upload-metadata.ts      # prints the metadata URI
# paste the metadata URI into 2b, then:
npx tsx src/2b-create-nft.ts           # prints the asset address

# Task 3: update the NFT
npx tsx src/3a-upload-new-metadata.ts  # prints the new metadata URI
# paste the asset address and new URI into 3b, then:
npx tsx src/3b-update-nft.ts

# Task 4: transfer the NFT
# paste the asset address and the new owner into 4, then:
npx tsx src/4-transfer-nft.ts

# Task 5: burn an NFT
npx tsx src/5a-create-burn-test-nft.ts # prints the throwaway asset address
# paste the throwaway asset address into 5b, then:
npx tsx src/5b-burn-nft.ts
```

## Task 1: Mint and transfer an SPL token
- Mint: [HBm48h...VUcia](https://explorer.solana.com/address/HBm48hWFrQTbuLsDKS79uLT4kwHcbKXvZjfsbPHVUcia?cluster=devnet)
- Transfer tx: [22kx1n...Ekh3s](https://explorer.solana.com/tx/22kx1nS9JeoVwzFVFtqTGpA7M7GpfZLRP6n8AfRjcHVt7Y23Ci3u8aGqy69ZBochtgFZXrrJki7G6eCBmD3Ekh3s?cluster=devnet)

## Task 2: Mint an NFT with MPL Core
- Asset: [2UdateFp...Dttjjg](https://core.metaplex.com/explorer/2UdateFp28HTNg2oRFMRWBRGNZMMNQ9eg7eyzbDttjjg?env=devnet)
- Create tx: [4QSmX5...S8TFin](https://explorer.solana.com/tx/4QSmX56Pis5HJy7J4LEb78GkRgxYdFvJDMVXjpnX1H6Lww3eiZFdVfnr9VCuMvaKAE16xLUeGwZyFQXk5jS8TFin?cluster=devnet)
- Metadata: [FuQYg8...JCMe](https://gateway.irys.xyz/FuQYg8BtcqZFunwz3zFPPjYuKdV1DrbGRjrWc1w3JCMe)

## Task 3: Update the NFT as the update authority
- Same asset, new name: `My NFT` became `My Updated NFT`
- New metadata: [38sztv...Qm13P](https://gateway.irys.xyz/38sztv1pwpVfJNkWWekuZij2kP4DzyuiRK7NQG6Qm13P)
- Update tx: [2hKEBB...DZTpq3](https://explorer.solana.com/tx/2hKEBBVvT7PngnZXcdgRCTqFP55kEvNpW6AAQ7jYH4viLZevGcoNPC4KBK55egUoSQ1cCetVUezdpqmVyHDZTpq3?cluster=devnet)

## Task 4 (extension): Transfer the NFT between wallets
The owner changed from my CLI wallet (`21Vwf...6ZP6`) to my Solflare wallet (`6F8JU...BWZL`).
- Transfer tx: [313Vmi...zpdMA](https://explorer.solana.com/tx/313VmivPZa6RQp7gCxhgErhQ2D2gB47TNNZpsuvAV2TQU5pvzPCgomqgX4efRbauXjZSJiBcY9sDdFnoVzTzpdMA?cluster=devnet)
- The update authority stayed with my CLI wallet. Owner and update authority are two separate roles.

## Task 5 (extension): Burn an NFT and reclaim the rent
Burning is permanent, so I created a separate throwaway NFT (`5a`) and burned that one (`5b`). My main NFT is untouched.
- Throwaway asset: [7r3j9Q...XcJH](https://core.metaplex.com/explorer/7r3j9Qoc97TFQuePpqRfsCQjNYRDFKvJrEu5gWMqXcJH?env=devnet)
- Burn tx: [R6ifBz...Hs14g](https://explorer.solana.com/tx/R6ifBzs7pMxAgGuFh1udaeCQ6nzbpz2Dr8keYAX3TAsGQAHZjL14djpLkhBoxh8DuARKcZ13dtEKoKgexeHs14g?cluster=devnet)
- Balance before: 8.92398649 SOL, after: 8.92477397 SOL. Net gain after the fee: about 0.00079 SOL.

## Cost (devnet)
| Step | Cost |
|---|---|
| Task 1: mint, 2 token accounts, mint tokens, transfer | about 0.00407 SOL |
| Tasks 2 and 3: uploads, create NFT, update NFT | about 0.00324 SOL |
| Base fee of one transfer transaction | 0.000005 SOL |
| Rent of a 165-byte token account (`solana rent 165`) | 0.00148844 SOL |

Most of the cost is refundable rent, not fees.

## What I learned
- A mint defines the token; a token account holds a balance.
- An ATA is a PDA derived from the wallet and the mint.
- Amounts are in the smallest unit: 1_000_000_000 with 6 decimals = 1000 tokens.
- The blockchain does not store the image. The NFT stores a URI that points to a metadata JSON, and the JSON points to the image.
- A Core NFT is one account (owner, update authority, name, URI), unlike the old standard that needs a mint, a token account, and a metadata account.
- Only the update authority can change an NFT's name and URI. A full update has two parts: upload a new metadata JSON, then point the asset's URI to it.
- Owner and update authority are separate roles: transferring the NFT changes the owner but not the update authority.
- Burning an asset closes its account and returns rent to the wallet.

## Why it is interesting and how it can be applied
Tokens can represent money inside an app (for example stablecoin payments held in an escrow), and Core NFTs can represent proof of work, tickets, or licenses that stay cheap to create, transfer, update, and burn.