const express = require("express");
const router = express.Router();

const { commentController } =require("../controller")


router.get("/post/:id", commentController.fetchComment );

router.post("/post/", commentController.postComment );

router.delete("/:id", commentController.deleteComment );

router.patch("/:id", commentController.editComment)

module.exports = router;
