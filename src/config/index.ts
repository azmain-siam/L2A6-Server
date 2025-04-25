import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
  stripe_publishable: process.env.STRIPE_PUBLISHABLE,
  stripe_secret: process.env.STRIPE_SECRET,
  client_url: process.env.CLIENT_URL,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
};
