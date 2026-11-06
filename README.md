# dreamdex-perps-sdk-check

A tiny, read-only script that uses the Somnia Markets SDK (`@somnia-chain/markets-sdk`)
to connect to the dreamDEX perps testnet (Somnia Tokyo / Hideki, chain id 50383) and
list the available perps markets with their mark prices.

- Read-only: no private key, no wallet, no transactions, no faucet claims.
- Built as a first step for the dreamDEX Perps Builder Bounty.
- Written with help from an AI assistant (Claude). I ran it myself on my own computer; the results are below.

## Run it

Needs Node.js 20 or newer.

```bash
npm install
npm run check
```

Expected: a line like `Found N perps market(s) on chain 50383`, followed by up to 10 markets.
If it fails, the error is printed and the process exits with a non-zero code.

## Notes

- The indexer URL comes from the dreamDEX "Perps on testnet for developers" page.
  Override it with `INDEXER_URL=... npm run check`.
- `SomniaMarkets` is a facade; the perps read `listPerpMarkets()` lives on `exchange.client`,
  so the script calls `exchange.client.listPerpMarkets()`.
- Prices come back as 18-decimal integers; the script formats them with `viem`'s `formatUnits`.

## Results

Run by me (Suneet Bhardwaj) on 2026-11-06 on Windows, Node v24.20.0, `@somnia-chain/markets-sdk` 0.32.1.
`npm run check` exited with code 0. Output:

```
Found 22 perps market(s) on chain 50383
- ADLT/USDso  mark price: 3000  pool: 0xe3f6dcda98595764970e5a6ffd167af1d1b35123
- ZRO/USDso  mark price: 1.605737513238  pool: 0x2a1822b02039ddf0e293f3f7243673fc03eaf16c
- LIT/USDso  mark price: 3.442359791755  pool: 0xdcb0ad226727b2ce92857f0af5751389d42b2a3f
- VVV/USDso  mark price: 20.515305584238  pool: 0x352636ab146039851ef06d6367a106d5fb4e6409
- 1000PEPE/USDso  mark price: 0.004895273372  pool: 0xfa9b9e50cc1745113d57893991af200a74c86b6f
- PUMP/USDso  mark price: 0.003945327915  pool: 0x76c981a52530cdf9497559140aafcd8cd16836e7
- ZEC/USDso  mark price: 1266.064833550451  pool: 0x2a73129f26917124bd2a47a9b355c395c537f050
- TAO/USDso  mark price: 217.1784914370845  pool: 0xd9b6a347a3ae9fd6ba21179d3343f2c8a922f697
- WLD/USDso  mark price: 0.34200230324  pool: 0x0f464d57c1fd839e4d87a408bbccdab8f77e6394
- NEAR/USDso  mark price: 3.6720585005305  pool: 0x1cd15ae8bff0fe0a7f49233be8b90734775ba454
```

Testnet prices change, so your numbers will differ.

## License

MIT