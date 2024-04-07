import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { Connection, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js";
import "dotenv/config";

const suppliedPublicKey = process.argv[2] || null;

try {
  if (!suppliedPublicKey) {
    console.log("Please provide a public key.");
    process.exit(1);
  }

  const senderKeyPair = getKeypairFromEnvironment("NEXT_PUBLIC_SECRET_KEY");
  console.log(`suppliedPublicKey: ${suppliedPublicKey}`);

  const toPubkey = new PublicKey(suppliedPublicKey);
  const connection = new Connection(process.env.NEXT_PUBLIC_DEVNET_URL!, "confirmed");

  console.log(`✅ Loaded our own keypair, the destination public key, and connected to Solana`);

  const transaction = new Transaction();
  const LAMPORTS_TO_SEND = 5000;

  const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: senderKeyPair.publicKey,
    toPubkey,
    lamports: LAMPORTS_TO_SEND,
  });

  transaction.add(sendSolInstruction);

  const signature = await sendAndConfirmTransaction(connection, transaction, [senderKeyPair]);

  console.log(`💸 Finished! Sent ${LAMPORTS_TO_SEND} to the address ${toPubkey}`);
  console.log(`Transaction signature is ${signature}`);
} catch (error) {
  console.error(error);
  process.exit(1);
}
