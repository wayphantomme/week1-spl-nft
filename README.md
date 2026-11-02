# Turbin3 Builders Cohort Q4 2026: Week 1 (SPL Token and Core NFT)

TypeScript scripts that create and manage an SPL token and a Metaplex Core NFT on Solana **devnet**.

> **Note on approach.** I worked on this after the last class with Shrinath, so my implementation differs from the class template ([turbine-spl-nft-26](https://github.com/ShrinathNR/turbine-spl-nft-26)). I only read the template after finishing my version. The differences are listed in [Differences from the class template](#differences-from-the-class-template).

## What this repo does

| Task | What happens | Script |
|---|---|---|
| 1 | Create an SPL token (6 decimals), mint 1,000 to my wallet, transfer 100 to a Solflare wallet | `1a`, `1b`, `1c` |
| 1+ | Attach name, symbol and image to the token with Token Metadata | `1d`, `1e` |
| 2 | Upload image and metadata to Irys, mint a Core NFT | `2a`, `2b` |
| 3 | Upload new metadata, update the NFT as update authority | `3a`, `3b`, `3c` |
| 4 | Transfer the NFT to a Solflare wallet | `4` |
| 5 | Mint a throwaway NFT, burn it, and compare SOL balance before and after | `5a`, `5b` |

## Project structure

```
week1-spl-nft/
├── src/
│   ├── wallet.ts                 # loads the Solana CLI wallet, devnet connection
│   ├── umi.ts                    # Umi client (mpl-core + Irys uploader)
│   ├── 1a-create-mint.ts
│   ├── 1b-mint-tokens.ts
│   ├── 1c-transfer.ts
│   ├── 1d-token-metadata.ts
│   ├── 1e-update-token-metadata.ts
│   ├── 2a-upload-metadata.ts
│   ├── 2b-create-nft.ts
│   ├── 3a-upload-new-metadata.ts
│   ├── 3b-update-nft.ts
│   ├── 3c-rename-nft.ts
│   ├── 4-transfer-nft.ts
│   ├── 5a-create-burn-test-nft.ts
│   └── 5b-burn-nft.ts
├── image.png                     # NFT image (for learning only)
├── token.png                     # token image
├── package.json
└── tsconfig.json
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Use a funded devnet wallet. The scripts read the Solana CLI wallet at `~/.config/solana/id.json`. Check it with:
   ```bash
   solana address
   solana balance --url devnet
   ```
3. Keep `image.png` and `token.png` in the project root.

The wallet file is never copied into the repo. `.gitignore` also excludes `wallet.json`, `.env` and `node_modules`.

## How to run

Each script is run on its own, in order:

```bash
npx tsx src/1a-create-mint.ts
```

Some scripts contain constants (mint address, asset address, metadata URI) that must be pasted from the output of the previous step. Check the top of each file before running it.

## Results (devnet)

| Item | Link |
|---|---|
| Token mint (Turbin Sharingan, TRBS) | [Explorer](https://explorer.solana.com/address/HBm48hWFrQTbuLsDKS79uLT4kwHcbKXvZjfsbPHVUcia?cluster=devnet) |
| Token metadata transaction | [Explorer](https://explorer.solana.com/tx/6vujbBG4JuGUfXi8BGmRK9qRUMU1KWNpTURd9ARZZo6QoBEiAgZv3oZYJ7ruFNtxRYDLH2TDvY9iiiHPWTBRLVd?cluster=devnet) |
| Token image update transaction | [Explorer](https://explorer.solana.com/tx/5NguWh7C7xGsH9kRyFe8WdodXsCrrFDozxoBA7idUNLNE6kvEkRrqYGhUvUChLYD8Bny5GhL9r4i7gNcx9NHGCRR?cluster=devnet) |
| Token transfer transaction | [Explorer](https://explorer.solana.com/tx/22kx1nS9JeoVwzFVFtqTGpA7M7GpfZLRP6n8AfRjcHVt7Y23Ci3u8aGqy69ZBochtgFZXrrJki7G6eCBmD3Ekh3s?cluster=devnet) |
| Core NFT (Turbin Sharingan #1) | [Core Explorer](https://core.metaplex.com/explorer/2UdateFp28HTNg2oRFMRWBRGNZMMNQ9eg7eyzbDttjjg?env=devnet) |
| NFT rename transaction | [Explorer](https://explorer.solana.com/tx/cpVytMLPrBMXPWRA7zF9191tyzkZSFtKLZTU3YJ63ZYpFXejRgj6LUYjqiwUhucK9pajCjVnbCesCfCqQwvoQ8o?cluster=devnet) |
| NFT transfer transaction | [Explorer](https://explorer.solana.com/tx/313VmivPZa6RQp7gCxhgErhQ2D2gB47TNNZpsuvAV2TQU5pvzPCgomqgX4efRbauXjZSJiBcY9sDdFnoVzTzpdMA?cluster=devnet) |
| Burned test NFT (burn transaction) | [Explorer](https://explorer.solana.com/tx/R6ifBzs7pMxAgGuFh1udaeCQ6nzbpz2Dr8keYAX3TAsGQAHZjL14djpLkhBoxh8DuARKcZ13dtEKoKgexeHs14g?cluster=devnet) |
## What each part does

**Task 1: SPL token.**
- `createMint` creates the Mint account (6 decimals, my wallet as mint authority).
- `getOrCreateAssociatedTokenAccount` creates my Associated Token Account (a PDA derived from wallet and mint), and `mintTo` mints 1,000 tokens.
- `transfer` sends 100 tokens to a Solflare wallet. The recipient's ATA is created if it does not exist.
- `1d` and `1e` attach name, symbol and image through Metaplex Token Metadata. The image lives in a metadata JSON uploaded to Irys.

**Tasks 2 to 4: Core NFT.** The image and metadata JSON are uploaded to Irys, and the NFT stores the metadata URI. `create`, `update` and `transfer` come from `mpl-core`. The name is stored on-chain, while the description and image live in the off-chain JSON, so changing them means uploading a new JSON and updating the `uri`. Owner and update authority are separate roles: after I transferred the NFT, my CLI wallet could still update it.

**Task 5: Burn.** A throwaway asset is created and burned, while the SOL balance is printed before and after.

## Cost

| Item | Cost |
|---|---|
| Base transaction fee | 0.000005 SOL per signature |
| Rent for a 165-byte token account | 0.00148844 SOL (refundable deposit for storage, not a fee) |
| Tasks 1 to 5 combined (measured from wallet balance) | about 0.0073 SOL |
| Token image update (`1e`) | about 0.000235 SOL |
| NFT rename (`3c`) | about 0.00003 SOL |

The rent for the token metadata account (`1d`) was not measured separately.

## Differences from the class template

The class template is [turbine-spl-nft-26](https://github.com/ShrinathNR/turbine-spl-nft-26). It has the structure ready and leaves the core logic blank. Here is how my version differs.

| | My version | Class template |
|---|---|---|
| SPL SDK | `@solana/web3.js` and `@solana/spl-token` | `@solana/kit`, `@solana-program/token`, `@solana-program/system` |
| Style | High-level helpers (`createMint`, `getOrCreateAssociatedTokenAccount`, `transfer`) | Builds instructions and transactions by hand (`getInitializeMintInstruction`, `createTransactionMessage`, and so on) |
| Transactions | One helper call per step, helpers send the transaction | Explicit transaction message, instructions grouped into one transaction (for example create ATA plus mint) |
| Transfer | `transfer` | `transferChecked` (also checks decimals) |
| Wallet | Solana CLI wallet at `~/.config/solana/id.json` | `devnet-wallet.json` in the project root |
| NFT upload | Image and JSON uploaded in one script | Split into `nft_image`, `nft_metadata`, `nft_mint` |
| Runner | `tsx`, ES modules | `ts-node`, CommonJS, `npm run` scripts |
| NFT scope | Create, update, rename, transfer, burn | Image, metadata, mint |
| Token metadata | Added later in `1d` and `1e` | `spl_metadata.ts` is part of the template |

In short: the class template teaches how a transaction is built piece by piece with the newer `@solana/kit`. My version uses higher-level helpers that hide those details. Both reach the same result on-chain.

## Lessons learned

- A token has three parts: the Mint account, the Token account (ATA) holding the balance, and an optional metadata account for name, symbol and image.
- Rent is a refundable deposit for on-chain storage. Fees are the small cost of sending a transaction.
- A Core NFT is a single account with plugins, instead of the three accounts used by Token Metadata NFTs.
- The on-chain NFT only stores a name and a URI. Description, image and attributes live in the JSON that the URI points to.
- Owner and update authority are different roles.
- Small commits per step make it easy to see what each script changed.

## Tools

TypeScript, Node.js, tsx, `@solana/web3.js`, `@solana/spl-token`, Umi, `mpl-core`, `mpl-token-metadata`, Irys (devnet), Solana CLI, Solflare.