const { Comment, User } = require("../lib/sequelize");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const { generateToken } = require("../lib/jwt");
const commentController = {

  fetchComment: async (req, res) => {
    try {
      
      const { id,  } = req.params


      
      const comments = await Comment.findAll({
        include: User,
        where: {
          PostId : id,
        },

    
      });
      console.log(comments);

      res.status(200).json({
        message: "fetching comments",
        result: comments,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: err.toString(),
      });
    }
  },
  postComment: async (req, res) => {
    try {
      const { UserId, content, PostId } = req.body;
      console.log("aaaa");

      console.log(req.body);

      const newComment = await Comment.create({
        content,
        UserId,
        PostId,
      });

      return res.status(200).json({
        message: "new comment added",
        result: newComment,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: err.toString(),
      });
    }
  },
  editComment: async (req, res) => {
    try {
      const { id } = req.params;

      await Comment.update(
        {
          ...req.body,
        },
        {
          where: {
            id,
          },
        }
      );

      return res.status(200).json({
        message: "Comment success edited",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: err.toString(),
      });
    }
  },

  deleteComment: async (req, res) => {
    try {
      const { id } = req.params;

      await Comment.destroy({
        where: { id },
      });

      return res.status(200).json({
        message: "Comment success deleted",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: err.toString(),
      });
    }
  },
};


module.exports = commentController;
