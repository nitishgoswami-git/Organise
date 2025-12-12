import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';

export const verifyUser = async (req, res, next) => {
    try {
        const token = req.cookies?.AccessToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized Access - No Token"
            });
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken.id).select("-password -refreshToken");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized Access - User not found"
            });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error('Auth middleware error:', err);
        return res.status(401).json({
            success: false,
            message: "Unauthorized Access - Invalid Token",
            error: err.message
        });
    }
}