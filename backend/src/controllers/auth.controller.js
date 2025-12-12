import AuthServices from "../services/auth.service.js";

class AuthController {
  static async login(req, res, next) {
    try {
      const res_obj = await AuthServices.loginUser(req, res);
      const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        path: "/",
      };

      return res
        .status(200)
        .cookie("AccessToken", res_obj.AccessToken, options)
        .json({
          msg: res_obj.msg,
          data: res_obj.data,
        });
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: error.message || "Login failed",
      });
    }
  }

  static async register(req, res) {
    try {
      const res_obj = await AuthServices.registerUser({
        body: req.body,
        file: req.file, // pass multer file directly
      });

      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        path: "/",
      };

      // Set access token cookie
      res.cookie("AccessToken", res_obj.AccessToken, cookieOptions);

      // Optional: if you want refresh token in cookies
      // res.cookie("RefreshToken", res_obj.RefreshToken, cookieOptions);

      return res.status(201).json({
        msg: res_obj.msg,
        data: res_obj.data,
      });
    } catch (error) {
      console.error("Registration error:", error);

      return res.status(400).json({
        success: false,
        message: error.message || "Registration failed",
      });
    }
  }

  static async logout(req, res) {
    try {
      console.log("logout called in auth.controller");

      const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        path: "/",
      };

      await AuthServices.logoutUser(req.user._id);

      return res.status(200).clearCookie("AccessToken", options).json({
        success: true,
        message: "User logged out successfully",
      });
    } catch (error) {
      console.error("Logout Error:", error);
      return res.status(500).json({
        success: false,
        message: "Logout failed",
        error: error.message,
      });
    }
  }

  static async userData(req, res) {
    console.log("userData called in auth.controller", req.user._id);
    const userId = req.user._id;
    const userData = await AuthServices.getUserData(userId);
    return res.status(200).json({
      msg: "User data fetched successfully",
      data: userData,
    });
  }
}

export default AuthController;
