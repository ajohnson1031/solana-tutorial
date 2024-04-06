import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import "dotenv/config";

const keypair = getKeypairFromEnvironment("NEXT_PUBLIC_SECRET_KEY");
console.log(keypair);
console.log(`✅ Finished! We've loaded our secret key securely, using an env file!`);
