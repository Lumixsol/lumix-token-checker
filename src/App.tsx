import { useState } from "react"
import { checkLumixBalance } from "./lumixChecker"

export default function App() {
  const [wallet, setWallet] = useState("")
  const [balance, setBalance] = useState<number | null>(null)

  const handleCheck = async () => {
    if (!wallet) return
    const result = await checkLumixBalance(wallet)
    setBalance(result)
  }

  return (
    <div style={{ padding: 40, fontFamily: "sans-serif", textAlign: "center" }}>
      <h1>🔍 Check Your $LUMIX Balance</h1>
      <input
        type="text"
        placeholder="Enter your Solana wallet"
        value={wallet}
        onChange={(e) => setWallet(e.target.value)}
        style={{ padding: 10, width: 300 }}
      />
      <br />
      <button onClick={handleCheck} style={{ marginTop: 20, padding: 10 }}>
        Check Balance
      </button>
      {balance !== null && (
        <p style={{ marginTop: 20 }}>
          You hold <strong>{balance}</strong> $LUMIX
        </p>
      )}
    </div>
  )
}
