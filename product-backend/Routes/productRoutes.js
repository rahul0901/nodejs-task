import { Router } from "express";
import { addProduct } from "../Controllers/productController.js";

const productRoutes = Router();

productRoutes.get('add-product', addProduct)

export default productRoutes();