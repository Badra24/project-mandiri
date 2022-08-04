const express = require("express");
const router = express.Router();

const { likeController } = require("../controller")

router.post( "/", likeController.addLike )
router.get("/post/:id",likeController.getLikebyPost)
router.delete("/user/:UserId/post/:PostId" , likeController.deleteLike)

module.exports = router