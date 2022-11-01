import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import ErrorHander from "../Utils/errorhander.js"

export const isAuthenticatedUser = async (req, res, next) => {
    try {

        if (!req.headers.authorization) {
            return res.status(400).json({
                success: false,
                message: "Login to Access this resource",
            });
        }
        const getToken = req.headers;


        //remove Bearer from token
        const fronttoken = getToken.authorization.slice(7);

        const frontdecoded = jwt.verify(fronttoken, process.env.JWT_SECRET);
        if (!frontdecoded) {
            return res.status(200).json({
                success: false,
                message: "incorrect token",
            });
        }
        const fuser = await User.findById(frontdecoded.id);

        req.user = fuser;

        next();
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
export const authorizeRoles = (...roles) => {//pass admin
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHander(
                    `Role: ${req.user.role} is not allowed to access this resouce `,
                    403
                )
            );
        }

        next();
    };
};