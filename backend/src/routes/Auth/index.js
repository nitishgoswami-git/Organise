import { Router } from "express";
import AuthController from "../../controllers/auth.controller.js";
import { verifyUser } from "../../middlewares/auth.Middleware.js";
import {upload} from "../../middlewares/multer.middleware.js"

const authRouter = Router();

authRouter.post("/login", AuthController.login);
authRouter.post("/register", upload.single("avatar"), AuthController.register);
authRouter.get("/me", verifyUser, AuthController.userData);
authRouter.get("/verify", verifyUser, AuthController.userData);
authRouter.post("/logout", verifyUser, AuthController.logout);
// authRouter.post("/refresh", AuthController.refreshToken);

export default authRouter;