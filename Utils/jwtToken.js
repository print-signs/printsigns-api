//Create Token and saving in cookie

const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();
    // consolelog(token)
    //options for cookie
    const options = {
        expires: new Date(
            Date.now() + 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };

    res.status(statusCode).cookie("token", token, options).json({
        // res.status(statusCode).json({

        success: true,
        // user,
        token,
    });
};

export default sendToken;