import cloudinary from '../config/cloudinary.js';

export const uploadImage = async (req, res) => {

try {

if (!req.file) {
return res.status(400).json({
message:'No image selected',
});
}

const base64 =
`data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

const result =
await cloudinary.uploader.upload(
base64,
{
folder:'ecommerce-products',
}
);

console.log(
'CLOUDINARY URL:',
result.secure_url
);

res.status(200).json({
imageUrl:
result.secure_url,
});

} catch (error) {

console.log(
'UPLOAD ERROR:'
);

console.log(
error
);

res.status(500).json({
message:error.message,
});

}

};