import { Router } from "express";
import { Login, Register, getCurrentUser } from "../Controllers/authController.js";

const authroutes = Router();

authroutes.post('/login', Login);
authroutes.post('/register', Register);
authroutes.post('/get-current-user', getCurrentUser);

export default authroutes;