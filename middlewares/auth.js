import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
    try {
        // const { token } = req.cookies;
        const getToken = req.headers;
        // // console.log(getToken.authorization)

        // //remove Bearer from token
        const token = getToken.authorization.slice(7);
        // // console.log(token)

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Login to Access this resource",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded)
        const user = await User.findById(decoded.id);
        // console.log(user)
        req.user = user;
        // console.log(req.user)

        next();
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
