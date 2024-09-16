const jwt  = require("jsonwebtoken");
const { User } = require("../modles/user.modle");


const protectRoute =  async (req, res, next) => {
    try {
        const token = req.cookies.jwt

        if (!token){
            return res.status(401).json({error: "UnAuthorized - No token exists"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({error: "InValid Token"})
        }

        const user = await User.findById(decoded.userId).select("-password")
        console.log(user)

        if (!user){
            return res.status(404).json({
                error: "User not found"
            })
        }

        req.user = user
        next()
        
    } catch (error) {
        console.log("error from protectedRouter : ", error.message)
        res.status(500).json({
            error: "internal server error"
        })
    }
}

module.exports = protectRoute