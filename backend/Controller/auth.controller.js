const bcrypt = require("bcryptjs")
const { User } = require("../modles/user.modle")

module.exports.signup = async (req, res) => {
    try {
        const {fullName, userName, password, confirmPassword, gender} = req.body

        if (password !== confirmPassword){
            return res.status(400).json({error: "Password is incorrect"})
        }

        const user = await User.findOne({
            userName
        })

        if (user) {
            return res.status(400).json({error: "user already exits"})
        }

        const salt = 10
        const hashpassword = await bcrypt.hash(password, salt)

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`

        const newUser = new User({
            fullName,
            userName,
            password: hashpassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        })

        if (newUser) {
            await newUser.save()
            
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                userName: newUser.userName,
                profilePic: newUser.profilePic
        })
        } else {
            res.status(400).json({error: "invalid user data"})
        }

    } catch (error) {
        console.log("Error in signup Controller", error.message)
        res.status(500).json({error:"Internal server error"})
    }
}

module.exports.login = (req, res) => {
    res.send("router login")
}

module.exports.logout = (req, res) => {
    res.send("router logout")
}
