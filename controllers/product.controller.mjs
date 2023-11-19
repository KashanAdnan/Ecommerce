import Product from "../models/product.model.mjs"


const createProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            category,
            image
        } = req.body
        const product = await Product.create({
            name,
            description,
            price,
            image,
            category
        })
        res.status(200).json({
            success: false,
            message: "Product Created Succesfully!",
            product
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json({
            success: true,
            products
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getSingleProducts = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const product = await Product.findById({
            _id: id
        })
        if (!product) {
            res.status(400).json({
                success: false,
                message: `Id is Incorrect !`
            })
            return;
        }
        res.status(200).json({
            success: true,
            product
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const product = await Product.findByIdAndDelete({
            _id: id
        })
        if (!product) {
            res.status(400).json({
                success: false,
                message: `Id is Incorrect !`
            })
            return;
        }
        res.status(200).json({
            success: true,
            message: `Product Deleted With Id ${id}`
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const updateProduct = async (req, res) => {
    try {
        const body = req.body;
        const {
            id
        } = req.params
        const product = await Product.findByIdAndUpdate({
            _id: id
        }, {
            ...body
        }, {
            new: true
        })
        if (!product) {
            res.status(400).json({
                success: false,
                message: `Id is Incorrect !`
            })
            return;
        }
        res.status(200).json({
            success: true,
            message: "Product Updated !",
            product
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const addRating = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const {
            user,
            comment,
            rating
        } = req.body
        const productFind = await Product.findById({
            _id: id
        })
        const reviews = [
            ...productFind.reviews
        ]
        const ratingObj = {
            user,
            comment,
            rating
        }
        reviews.push(ratingObj)
        const product = await Product.findByIdAndUpdate({
            _id: id
        }, {
            reviews: reviews,
            ratings: reviews.length
        }, {
            new: true
        })
        res.status(200).json({
            success: true,
            product
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export default {
    createProduct,
    getProducts,
    getSingleProducts,
    deleteProduct,
    updateProduct,
    addRating
}