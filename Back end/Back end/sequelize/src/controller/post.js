const { Post, User,Like,Comment} = require("../lib/sequelize");


const postController = {
  getAllPost: async (req, res) => {
    try {
      const findPosts = await Post.findAll({
         limit : 100,
         offset : 0,
         include : [User,Like,Comment,]

        
        // where: {
        //   user_id: 2,
        // },
      });

      return res.status(200).json({
        message: "fetched data post",
        results: findPosts,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "error",
      });
    }
  },
  getPostPaging: async (req, res) => {
    try {
      const { limit = 5, page = 1 } = req.query;

      const findPost = await Post.findAll({
        offset: (page - 1) * limit,
        limit: limit ? parseInt(limit) : undefined,
        include : [User,Like,Comment,],
        order : [["createdAt","DESC"]]
      });

      return res.status(200).json({
        message: "fetching data",
        result: findPost,
      });
    } catch (err) {
      console.log(err);

      res.status(400).json({
        message: "error ",
      });
    }
  },
  getPostByUser: async (req, res) => {
    try {
      const { id } = req.params;

      const findPost = await Post.findAll({
        include: [
          {
            model: User,
          },
        ],
        where: {
          user_id: id,
        },
      });

      return res.status(200).json({
        message: "fetching data",
        result: findPost,
      });
    } catch (err) {
      console.log(err);

      res.status(400).json({
        message: "error ",
      });
    }
  },
  addPost: async (req, res) => {
    try {
      const { image_url, caption, location,user_id } = req.body;

      await Post.create({
        image_url,
        caption,
        location,
        user_id
      });

      return res.status(200).json({
        message: "new post added",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Error",
      });
    }
  },
  deletePost: async (req, res) => {
    try {
      const { id } = req.params;

      await Post.destroy({
        where: {
          id,
        },
      });

      return res.status(200).json({
        message: "1 data deleted",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Error",
      });
    }
  },
  editPost: async (req, res) => {
    try {
      const { id } = req.params;

      await Post.update(
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
        message: "post edited",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Error",
      });
    }
  },
  uploadPost: async (req, res) => {
    try {
      const { caption, location, user_id } = req.body;
      const uploadFileDomain = process.env.UPLOAD_FILE_DOMAIN;
      const filePath = "post_images";
      const { filename } = req.file;
      console.log("halo");

      const newPost = await Post.create({
        image_url: `${uploadFileDomain}/${filePath}/${filename}`,
        caption,
        location,
        user_id,
      });

      return res.status(201).json({
        message: "Post created",
        result: newPost,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Server error",
      });
    }
  },
  postDetail: async (req, res) => {
    try {
      const { id } = req.params;

      const findPost = await Post.findOne({
        include: [
          
         User,Comment,Like
          
        ],
        where: {
          id: id,
        },
      });

      return res.status(200).json({
        message: "fetching data",
        result: findPost,
      });
    } catch (err) {
      console.log(err);

      res.status(400).json({
        message: "error ",
      });
    }
  }

  
};

module.exports = postController;
