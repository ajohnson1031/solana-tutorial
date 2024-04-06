import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey, PublicKeyInitData } from "@solana/web3.js";
import "dotenv/config";

const connection = new Connection(clusterApiUrl("devnet"));
const address = new PublicKey(process.env.NEXT_PUBLIC_PUBLIC_KEY as PublicKeyInitData);
const balance = await connection.getBalance(address);
const balanceInSOL = balance / LAMPORTS_PER_SOL;

console.log(`The balance of the account at ${address} os ${balance} lamports`);
console.log(`The balance in SOL is ${balanceInSOL}\n`);
console.log(`🔥 Finished!`);
