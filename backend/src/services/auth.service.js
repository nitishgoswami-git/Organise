import User from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

class AuthServices {
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
    const { FirstName, LastName, Email, Password } = body;

    if (!FirstName || !LastName || !Email || !Password) {
      throw new ApiError(400, "All fields are required");
    }

    const userExists = await User.findOne({
      Email: Email.toLowerCase(),
    });

    if (userExists) {
      throw new ApiError(400, "User already exists");
    }

    try {
      let photoURL = "";

      if (file?.path) {
        const uploadResult = await uploadOnCloudinary(file.path);
        photoURL = uploadResult.secure_url || uploadResult.url;
      }

      const newUser = await User.create({
        FirstName,
        LastName,
        Email: Email.toLowerCase(),
        Password,
        photo: photoURL,
      });

      const AccessToken = newUser.generateAccessToken();
      const RefreshToken = newUser.generateRefreshToken();

      newUser.refreshToken = RefreshToken;
      newUser.accessToken = AccessToken;
      await newUser.save({ validateBeforeSave: false });

      const userData = await User.findById(newUser._id).select(
        "-Password -refreshToken"
      );

      return {
        msg: "User registered successfully",
        data: userData,
        AccessToken,
      };
    } catch (e) {
      console.error("REGISTER SERVICE ERROR:", e);
      throw new ApiError(500, "Something went wrong");
    }
  };

  static loginUser = async (req, res) => {
    // console.log("login service hit");

    const { email, password } = req?.body;
    // console.log(email, password);

    if (!email || !password) {
      throw new ApiError(400, "All fields are required");
    }

    const userFound = await User.findOne({ Email: email.toLowerCase() });
    if (!userFound) {
      throw new ApiError(400, "User not found");
    }

    const isPasswdCorrect = await userFound.comparePassword(password);
    if (!isPasswdCorrect) {
      throw new ApiError(400, "Incorrect password");
    }
    // console.log("Login service hit");
    // console.log("Email:", email, "Password:", password);
    // console.log("User found:", userFound);
    // console.log("Password match:", isPasswdCorrect);

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

export default AuthServices;
