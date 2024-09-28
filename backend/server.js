const express = require("express")
const dotenv = require("dotenv")

const authRouter = require("./routes/auth.route")
const messageRouter = require("./routes/message.route")
const userRouter = require("./routes/user.route")


const ConnectTOMongoose = require("./db/connectMongdb")
const cookieParser = require("cookie-parser")
const { app, server } = require("./sockets/socket")


const PORT = process.env.PORT || 8000; // This will use 5000 if set in .env

dotenv.config()
app.use(express.json())
app.use(cookieParser())

app.get("/", (req, res) => {
    res.send("hello world!")
})


app.use("/api/auth", authRouter)
app.use("/api/messages", messageRouter)
app.use("/api/users", userRouter)


server.listen(PORT, () =>{
    ConnectTOMongoose()
    console.log(`hi there! ${PORT}`)
})