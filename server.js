const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const postRoutes = require('./routes/postRoutes'); 
const imageRoutes = require('./routes/imageRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const authRoutes = require('./routes/authRoutes');
const { verifyAuth } = require('./utils/middleware');
const dotenv = require('dotenv');

dotenv.config({ path: './.env.local' });

const app = express();
const PORT = process.env.PORT || 5003;

app.use(cors());
app.use(express.json());

connectDB().catch(err => {
  console.error('Erro ao conectar ao banco de dados:', err);
  process.exit(1);
});

app.use('/api/auth', authRoutes);
app.use('/api/post', verifyAuth, postRoutes);
app.use('/api/images', verifyAuth, imageRoutes);
app.use('/api/upload', verifyAuth, uploadRoutes);

app.listen(PORT, () => {
  console.log(`🔥  Server running on http://localhost:${PORT}`);
});