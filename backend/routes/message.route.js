const express = require("express")
const { sendMessage } = require("../Controller/message.controller")
const protectRoute = require("../middleware/protectRouter")

const router = express.Router()

router.post("/send/:id", protectRoute, sendMessage)

module.exports = router

