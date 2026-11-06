// Read-only: no private key, no transactions. Lists perps markets on the
// dreamDEX Hideki (Somnia Tokyo) testnet using the Somnia Markets SDK.
import { SomniaMarkets, SOMNIA_HIDEKI_TESTNET_ADDRESSES } from "@somnia-chain/markets-sdk";
import { hidekiTestnet } from "@somnia-chain/markets-sdk/chains";
import { formatUnits } from "viem";

// Indexer URL as given on the dreamDEX "Perps on testnet for developers" page.
const INDEXER_URL = process.env.INDEXER_URL ?? "https://hideki-dev.smk.somnia.host/v1/graphql";

const exchange = new SomniaMarkets({
  chain: hidekiTestnet,
  indexerUrl: INDEXER_URL,
  addresses: SOMNIA_HIDEKI_TESTNET_ADDRESSES,
});

try {
  // `exchange.client` is the lower-level SDK client that exposes the perps reads.
  const markets = await exchange.client.listPerpMarkets();
  console.log(`Found ${markets.length} perps market(s) on chain ${hidekiTestnet.id}`);
  for (const m of markets.slice(0, 10)) {
    // Markets expose baseSymbol/quoteSymbol (not `symbol`); prices are 18-decimal integers.
    const price = m.markPrice != null ? formatUnits(BigInt(m.markPrice), m.quoteDecimals ?? 18) : "n/a";
    console.log(`- ${m.baseSymbol}/${m.quoteSymbol}  mark price: ${price}  pool: ${m.id}`);
  }
} catch (err) {
  console.error("Request failed:", err?.name ?? "Error", "-", err?.message ?? err);
  process.exitCode = 1;
}
