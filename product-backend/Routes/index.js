import { Router } from "express";
import authroutes from "./authRotes.js";
import productRoutes from "./productRoutes.js";

const route = Router();

route.use('/auth', authroutes);
route.use('/product', productRoutes)

export default route;