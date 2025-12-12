import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
  {
    FirstName: {
      type: String,
      required: true,
      trim: true,
    },
    LastName: {
      type: String,
      required: true,
      trim: true,
    },
    Password: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    Boards: [
      {
        type: new mongoose.Schema.Types.ObjectId(),
        ref: "Board",
      },
    ],
  },
  { timestamps: true }
);

// hash Password before saving
UserSchema.pre("save", async function () {
  if (!this.isModified("Password")) return "";
  this.Password = await bcrypt.hash(this.Password, 10);
});

//Compare Passwords for verfication
UserSchema.methods.comparePassword = async function (Password) {
  return bcrypt.compare(Password, this.Password);
};

//generate refreshTokens
UserSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.Email,
      firstName: this.FirstName,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

UserSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.Email,
      firstName: this.FirstName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};


const User = mongoose.model("User", UserSchema);
export default User