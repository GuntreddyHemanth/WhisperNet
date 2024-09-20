const express = require("express")
const { getUsersForSidebar } = require("../Controller/user.controller")
const protectRoute = require("../middleware/protectRouter")

const router = express.Router()


router.get("/", protectRoute, getUsersForSidebar)

module.exports = router