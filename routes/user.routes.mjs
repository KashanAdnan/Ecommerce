import express from "express";
import userController from "../controllers/user.controller.mjs";
import authentication from "../middleware/authentication.mjs"
const userRoute = express.Router();

userRoute.post("/register", userController.userRegister);
userRoute.post("/otp", userController.otpCode);
userRoute.post("/login", userController.loginUser);
userRoute.get("/logout", authentication, userController.logout);
userRoute.get("/me", authentication, userController.profile);
userRoute.put("/user/:id", userController.updateProfile);
userRoute.delete("/user/:id", userController.deleteUser);
userRoute.get("/users", userController.getUsers);
userRoute.get("/user/:id", userController.getSingleUsers);

export default userRoute;