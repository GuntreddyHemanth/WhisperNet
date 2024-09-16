const jwt = require("jsonwebtoken")

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn:"10d",
    })

    res.cookie("jwt", token, {
        maxAge: 10 * 24 * 60 * 60 * 1000,
        httpOnly: true,     // prevent  attacks from XSS (cross-site scripting attack)
        sameSite: "strict", // prevent attacks from CSRF(cross-site request forgery attack)
        secure: process.env.NODE_ENV !== "development",
    })
}

module.exports = generateTokenAndSetCookie