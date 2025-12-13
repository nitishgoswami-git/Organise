import { Router } from "express";
import AuthController from "../../controllers/auth.controller.js";
import { verifyUser } from "../../middlewares/auth.middleware.js";
import {upload} from "../../middlewares/multer.middleware.js"

const authRouter = Router();

authRouter.post("/login", AuthController.login);
authRouter.post("/register", upload.single("photo"), AuthController.register);
authRouter.get("/me", verifyUser, AuthController.userData);
authRouter.get("/verify", verifyUser, AuthController.userData);
authRouter.post("/logout", verifyUser, AuthController.logout);
// authRouter.post("/refresh", AuthController.refreshToken);

export default authRouter;