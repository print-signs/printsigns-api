import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import ErrorHander from "../Utils/errorhander.js"

export const isAuthenticatedUser = async (req, res, next) => {
    try {
        // const { token } = req.cookies;
        const getToken = req.headers;

        // // console.log(getToken.authorization)
        // console.log(getToken)

        // //remove Bearer from token
        const fronttoken = getToken.authorization.slice(7);
        //console.log(token)

        if (!fronttoken) {
            return res.status(400).json({
                success: false,
                message: "Login to Access this resource",
            });
        }
        // if (!fronttoken) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Login to Access this resource",
        //     });
        // }

        //const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const frontdecoded = jwt.verify(fronttoken, process.env.JWT_SECRET);
        // console.log(decoded)
        //const user = await User.findById(decoded.id);
        const fuser = await User.findById(frontdecoded.id);
        // if (fuser != null) {
        //     req.user = fuser;
        //     //console.log(fuser)
        // }
        // console.log(user)
        req.user = fuser;
        // console.log(req.user)

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