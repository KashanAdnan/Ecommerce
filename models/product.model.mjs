import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    ratings: {
        type: Number,
        required: true,
        default: 0
    },
    reviews: {
        type: Array,
        required: true,
        default: []
    }
}, {
    timestamps: true
})

const productModel = mongoose.model("product", productSchema)

export default productModel