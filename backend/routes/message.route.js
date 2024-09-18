const express = require("express")
const { sendMessage, getMessages } = require("../Controller/message.controller")
const protectRoute = require("../middleware/protectRouter")

const router = express.Router()

router.post("/send/:id", protectRoute, sendMessage)
router.get("/get/:id", protectRoute, getMessages)


module.exports = router

