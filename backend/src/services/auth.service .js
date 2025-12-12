import User from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

class authServices {
  static generateTokens = async (userId) => {
    try {
      const user = await User.findOne({ _id: userId });

      const AccessToken = await user.generateAccessToken();
      const RefreshToken = await user.generateRefreshToken();

      user.refreshToken = RefreshToken;
      await user.save();

      return { AccessToken, RefreshToken };
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  static registerUser = async ({ body, file }) => {
    const { fullname, email, password } = body;

    if (!fullname || !email || !password) {
      throw new ApiError(400, "All fields are required");
    }

    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) throw new ApiError(400, "User already exists");

    try {
      let avatarURL = "";

      if (file?.path) {
        const uploadResult = await uploadOnCloudinary(file.path);
        avatarURL = uploadResult.secure_url || uploadResult.url;
      }

      const newUser = await User.create({
        fullname,
        email: email.toLowerCase(),
        password,
        avatar: avatarURL,
      });

      const { AccessToken, RefreshToken } = await this.generateTokens(
        newUser._id
      );

      newUser.refreshToken = RefreshToken;
      await newUser.save({ validateBeforeSave: false });

      const userData = await User.findById(newUser._id).select(
        "-password -refreshToken"
      );

      return {
        msg: "User registered successfully",
        data: userData,
        AccessToken,
        RefreshToken,
      };
    } catch (e) {
      console.log("REGISTER SERVICE ERROR:", e);
      throw new ApiError(500, "Something went wrong", e);
    }
  };

  static loginUser = async (req, res) => {
    const { email, password } = req?.body;

    if (!email || !password) {
      throw new ApiError(400, "All fields are required");
    }

    const userFound = await User.findOne({ email: email.toLowerCase() });
    if (!userFound) {
      throw new ApiError(400, "User not found");
    }

    const isPasswdCorrect = await userFound.comparePassword(password);
    if (!isPasswdCorrect) {
      throw new ApiError(400, "Incorrect password");
    }

    const { AccessToken, RefreshToken } = await this.generateTokens(
      userFound._id
    );

    const loggedInUser = await User.findById(userFound._id).select(
      "-password -refreshToken"
    );

    return {
      msg: "Login successful",
      data: loggedInUser,
      AccessToken,
      RefreshToken,
    };
  };

  static async logoutUser(userId) {
    try {
      await User.findByIdAndUpdate(
        userId,
        { $set: { refreshToken: null } },
        { new: true }
      );

      return {
        success: true,
        message: "User logged out successfully",
      };
    } catch (error) {
      console.error("Logout Error:", error);
      throw new Error("Logout failed");
    }
  }

  static async getUserData(userId) {
    console.log("getUserData called with userId:", userId);
    const userData = await User.findById(userId).select(
      "-password -refreshToken"
    );
    if (!userData) {
      throw new ApiError(404, "User not found");
    }
    return userData;
  }

  static async refreshAccessToken(refreshToken) {
    try {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );

      const user = await User.findById(decoded._id);
      if (!user || user.refreshToken !== refreshToken) {
        throw new ApiError(401, "Invalid refresh token");
      }

      const { AccessToken } = await this.generateTokens(user._id);

      return { AccessToken };
    } catch (error) {
      throw new ApiError(401, "Invalid or expired refresh token");
    }
  }
}

export default authServices;
