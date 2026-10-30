# Week 1: SPL Token and Core NFT

Turbin3 Builders Cohort Q4 2026, Week 1 assignment. Everything runs on **devnet**.

## Project structure
Each step is its own small script so I can run it, inspect the result in Solana Explorer, and understand one concept at a time.

| File | What it does |
|---|---|
| `src/wallet.ts` | Loads my local Solana CLI wallet and connects to devnet |
| `src/1a-create-mint.ts` | Creates the token mint (the "blueprint" of the token) |
| `src/1b-mint-tokens.ts` | Creates my token account (ATA) and mints 1000 tokens |
| `src/1c-transfer.ts` | Transfers 100 tokens to another wallet |

## Run it
```bash
npm install
npx tsx src/1a-create-mint.ts
# copy the mint address into 1b and 1c, then:
npx tsx src/1b-mint-tokens.ts
npx tsx src/1c-transfer.ts
```
Requires a Solana CLI wallet at `~/.config/solana/id.json` with devnet SOL.

## Task 1: SPL token
- Mint: [HBm48h...VUcia](https://explorer.solana.com/address/HBm48hWFrQTbuLsDKS79uLT4kwHcbKXvZjfsbPHVUcia?cluster=devnet)
- Transfer tx: [22kx1n...Ekh3s](https://explorer.solana.com/tx/22kx1nS9JeoVwzFVFtqTGpA7M7GpfZLRP6n8AfRjcHVt7Y23Ci3u8aGqy69ZBochtgFZXrrJki7G6eCBmD3Ekh3s?cluster=devnet)

## What I learned
- A mint defines the token; a token account holds a balance.
- An ATA is a PDA derived from the wallet and the mint.
- Amounts are in the smallest unit: 1_000_000_000 with 6 decimals = 1000 tokens.
