import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        ref: "user"
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: false,
        default: "N/A"
    },
    variants: {
        type: [String],
        required: false,
        default: []
    },
    price: {
        type: Number,
        required: false,
    },
    offerPrice: {
        type: Number,
        required: true,
    },
    image: {
        type: Array,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    date: {
        type: Number,
        required: true,
    },
    itemType: {
        type: String,
        required: true,
    },
    size: {
        type: [String],
        required: false,
    },
});

const Product = mongoose.models.product || mongoose.model('product', productSchema);

export default Product;
