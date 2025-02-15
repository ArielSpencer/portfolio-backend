const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './.env.local' });

const connectDB = async () => {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    console.error("Erro: MONGODB_URI não está definida!");
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI);
  console.log(`✅  Database connected`);
};

module.exports = { connectDB };