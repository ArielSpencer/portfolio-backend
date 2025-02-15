const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
  accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
  secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
  region: process.env.CLOUDFLARE_R2_REGION,
  signatureVersion: 'v4',
});

exports.GET = async function (req, res) {
  try {
    const bucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME;

    const params = {
      Bucket: bucketName,
    };

    const data = await s3.listObjectsV2(params).promise();
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

exports.DELETE = async function (req, res) {
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

    await s3.deleteObject(params).promise();
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Erro ao deletar imagem:', error);
    return res.status(500).json({ error: 'Erro ao deletar imagem' });
  }
};