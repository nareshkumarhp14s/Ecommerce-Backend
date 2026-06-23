import Product from "../models/Product.js";

export const createProduct = async (req,res) => {
try {
    const {title,description,price,stock,category,image,} = req.body;


const product =
  await Product.create({title,description,price,stock,category,image,});

res.status(201).json({
  message:
    "Product Created Successfully",
  product,
});
} catch (error) {res.status(500).json({message: error.message,});}
};


export const getProducts = async (req,res) => {
try {
const products =
await Product.find();


res.status(200).json(
  products
);


} catch (error) {
res.status(500).json({
message: error.message,
});
}
};
export const updateProduct =
async (req, res) => {
try {

const product =
await Product.findByIdAndUpdate(
req.params.id,
req.body,
{
new: true,
}
);

if (!product) {
return res.status(404).json({
message:
'Product not found',
});
}

res.status(200).json({
message:
'Product updated',
product,
});

} catch (error) {
res.status(500).json({
message:
error.message,
});
}
};

export const deleteProduct =
async (req, res) => {
try {

const product =
await Product.findById(
req.params.id
);

if (!product) {
return res.status(404).json({
message:
'Product not found',
});
}

await product.deleteOne();

res.status(200).json({
message:
'Product deleted',
});

} catch (error) {
res.status(500).json({
message:
error.message,
});
}
};

export const addReview =
async (req,res) => {

try {

const {
rating,
comment,
} = req.body;

const product =
await Product.findById(
req.params.id
);

product.reviews.push({
user:req.user._id,
name:req.user.name,
rating,
comment,
});

product.averageRating =
product.reviews.reduce(
(sum,item)=>
sum + item.rating,
0
) /
product.reviews.length;

await product.save();

res.status(200).json({
message:
'Review Added',
});

} catch(error) {

res.status(500).json({
message:error.message,
});

}

};
