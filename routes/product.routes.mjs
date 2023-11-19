import express from "express";
import productController from "../controllers/product.controller.mjs";
const productRoute = express.Router();
import upload from "../utils/multer.mjs"

productRoute.post("/product", productController.createProduct)
productRoute.get("/products", productController.getProducts)
productRoute.get("/product/:id", productController.getSingleProducts)
productRoute.delete("/product/:id", productController.deleteProduct)
productRoute.put("/product/:id", productController.updateProduct)
productRoute.put("/rating/:id", productController.addRating)

export default productRoute