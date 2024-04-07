import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import "dotenv/config";

const suppliedPublicKey = process.argv[2];

if (!suppliedPublicKey) throw new Error("Please provide a public key.");

try {
  const env = process.argv[3] || "--D";
  const connectionURLs = { "--D": process.env.NEXT_PUBLIC_DEVNET_URL, "--M": process.env.NEXT_PUBLIC_MAINNET_URL };

  const connection = new Connection(connectionURLs[env], "confirmed");
  const publicKey = new PublicKey(suppliedPublicKey);
  const balanceInLamports = await connection.getBalance(publicKey);
  const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

  console.log(`🔥 Finished! The balance for the wallet address at ${publicKey} is ${balanceInSOL}`);
} catch (error) {
  if (error.message === "Invalid public key input") {
    console.error("🙁 Please provide a valid public key in the form of a base58 encoded string.");
  } else console.error(error);
}
