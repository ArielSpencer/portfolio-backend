const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { v4: uuidv4 } = require('uuid');

const s3 = new S3Client({
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
  region: process.env.CLOUDFLARE_R2_REGION,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
  },
});

exports.uploadFile = async (req, res) => {
  try {
    const { fileName, fileType } = req.body;

    if (!fileName || !fileType) {
      return res.status(400).json({ error: 'Nome do arquivo e tipo do arquivo são obrigatórios' });
    }

    const fileKey = `${uuidv4()}-${fileName}`;
    const bucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME;

    const params = {
      Bucket: bucketName,
      Key: fileKey,
      ContentType: fileType,
    };

    const command = new PutObjectCommand(params);
    const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 300 }); // expires in 5 minutes (300 seconds)
    const fileUrl = `https://${bucketName}.${process.env.CLOUDFLARE_R2_ENDPOINT}/${fileKey}`;

    return res.status(200).json({ uploadUrl, fileUrl });
  } catch (error) {
    console.error('Erro ao gerar URL de upload:', error);
    return res.status(500).json({ error: 'Erro ao gerar URL de upload' });
  }
};