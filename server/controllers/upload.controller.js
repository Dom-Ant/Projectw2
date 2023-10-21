const upload = require('../helpers/upload.helper');
const sharp = require('sharp');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const s3Client = require('../utils/s3Client.js');

exports.uploadToS3 = async (req, res) => {
    const file = req.file;
    const key = Date.now().toString() + '-' + file.originalname;
    const thumbnailKey = 'thumbnail-' + key;

    // Generate thumbnail using sharp
    const thumbnailBuffer = await sharp(file.buffer).resize(200).toBuffer();

    // Upload original image
    const uploadParams = {
        Bucket: '5-star-bucket',
        Key: key,
        Body: file.buffer,
        ACL: 'public-read'
    };
    await s3Client.send(new PutObjectCommand(uploadParams));

    // Upload thumbnail
    const thumbnailUploadParams = {
        Bucket: '5-star-bucket',
        Key: thumbnailKey,
        Body: thumbnailBuffer,
        ACL: 'public-read'
    };
    await s3Client.send(new PutObjectCommand(thumbnailUploadParams));

    const imageUrl = `https://5-star-bucket.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    const thumbnailUrl = `https://5-star-bucket.s3.${process.env.AWS_REGION}.amazonaws.com/${thumbnailKey}`;

    res.send({ imageUrl, thumbnailUrl });
};
