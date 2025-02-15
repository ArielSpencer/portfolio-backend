const { S3Client, ListObjectsV2Command, DeleteObjectCommand } = require('@aws-sdk/client-s3');

const s3 = new S3Client({
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
  region: process.env.CLOUDFLARE_R2_REGION,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
  },
});

exports.getImages = async (req, res) => {
  try {
    const bucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME;

    const params = {
      Bucket: bucketName,
    };

    const command = new ListObjectsV2Command(params);
    const data = await s3.send(command);
    const images = data.Contents.map(item => ({
      key: item.Key,
      url: `https://${bucketName}.${process.env.CLOUDFLARE_R2_ENDPOINT.replace(/^https?:\/\//, '')}/${item.Key}`,
    }));

    return res.status(200).json(images);
  } catch (error) {
    console.error('Erro ao listar imagens:', error);
    return res.status(500).json({ error: 'Erro ao listar imagens' });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const { key } = req.body;

    if (!key) {
      return res.status(400).json({ error: 'Chave da imagem é obrigatória' });
    }

    const bucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME;

    const params = {
      Bucket: bucketName,
      Key: key,
    };

    const command = new DeleteObjectCommand(params);
    await s3.send(command);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Erro ao deletar imagem:', error);
    return res.status(500).json({ error: 'Erro ao deletar imagem' });
  }
};