import { Connection, PublicKey } from "@solana/web3.js"

const LUMIX_MINT = new PublicKey("5VDLmmWYhaYZjrzXh8r8ve9UA4C5dHbjaSMDUsF368Jo")

export async function checkLumixBalance(wallet: string): Promise<number> {
  const connection = new Connection("https://api.mainnet-beta.solana.com")
  const tokenAccounts = await connection.getParsedTokenAccountsByOwner(new PublicKey(wallet), {
    programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
  })

  for (const { account } of tokenAccounts.value) {
    const info = account.data.parsed.info
    if (info.mint === LUMIX_MINT.toBase58()) {
      return parseFloat(info.tokenAmount.uiAmountString)
    }
  }

  return 0
}
