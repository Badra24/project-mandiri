const { User } = require("../lib/sequelize");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const { generateToken, verifyToken } = require("../lib/jwt");
const mailer = require("../lib/mailer");
const { Error } = require("sequelize")
const { nanoid } = require("nanoid")
const moment = require("moment")
const fs = require("fs")
const mustache = require("mustache")
const Avatar = require("../model_mongo/avatarModel")
const sharp = require("sharp")


const  sendVerification = async (id, email, username) =>{
const verToken = await generateToken({ id, isEmailVerification: true }, "180s");
 const url_verify = process.env.LINK_VERIFY + verToken

  await mailer({
    to: email,
    subject: "Halo" + username + "silahkan verify account anda",
    html: `<div><h1>KLIK LINK UNTUK VERIFY</h1></div>
    <div> Please verify dari sini <a href="${url_verify}">Link</a></div>`,
  });
 return verToken;
}

const userController = {
  login: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      console.log(req.body)
      const user = await User.findOne({
        where: {
          [Op.and]: [{ username }, { email }],
        },
      });
      console.log(user);

      if (!user) {
        throw new Error("username/email/password not found");
      }

      const checkPass = await bcrypt.compareSync(password, user.password);

      if (!checkPass) {
        throw new Error("username/email/password not found");
      }

      const token = generateToken({id: user.id, password: user.password})

      delete user.dataValues.createAt;
      delete user.dataValues.password;
      delete user.dataValues.updateAt;
      
      

      res.status(200).json({
        message: "login succeed",
        result: {user,token},
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: err.toString(),
      });
    }
  },
  register: async (req, res) => {
    try {
      const {  username, password, full_name, email } = req.body;
console.log(req);
      const findUser = await User.findOne({
        where: {
          [Op.or]: [{ username }, { email }],
        },
      });

       if (findUser) {
      throw Error("username/email has been taken");
      }

      const hashedPassword = bcrypt.hashSync(password, 5);

    const user =   await User.create({
        username,
        password: hashedPassword,
        full_name,
        email,
      });

      console.log(user.id);
      const token = await generateToken({
        id: user.id,
        isEmailVerification: true,
      });
      const verToken = await sendVerification(user.id, email, username);
    console.log(token);
    console.log(verToken);

      return res.status(200).json({
        message: "new user has been created",
        result: {user,
          token,
          verToken}
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: err.toString(),
      });
    }
  },
  editUser: async (req, res) => {
   try {
       const { full_name,username, avatar, user_id,bio } = req.body;
       let url = null;      
       if (req.file) {
        let pic = await sharp(req.file.buffer).png().toBuffer();
        const checkAvatar = await Avatar.findOne({
          user_id,
          full_name,
          username,
          avatar,
          bio,

        });

        if (checkAvatar) {
          await Avatar.deleteOne({ user_id})
          
        } 

       let newAva = new Avatar();
       newAva.image = pic;
       newAva.user_id = user_id;
       await newAva.save();

      url =  `${process.env.UPLOAD_FILE_DOMAIN}/${process.env.USER_AVATAR}/${newAva.id}`

     } 

    
   await User.update(
     {
       avatar_url: url? url : avatar,
       full_name: full_name,
       username: username,
       bio: bio,
       user_id : user_id,

    },
    {
       where: {
        id: user_id,
      },
     }
   );

  const user = await User.findByPk(user_id)
   console.log(user)

  return res.status(200).json({
    message: "user edited",
    result : user 
  });
 } catch (err) {
   console.log(err);
  res.status(400).json({
     message: "Error",
   });
 }
    },
   renderAvatar: async (req, res) => {
    try {
      // Get user
      const { user_id } = req.params;

      const user = await Avatar.findOne({ user_id });

      if (!user) {
        throw new Error("No Avatar Found");
      }

      // Config untuk mengirim image
      res.set("Content-type", "image/png");

      // Kirim image
      res.send(user.image);
    } catch (err) {
      res.send(err);
    }
  },

  keepLogin: async (req, res) => {
    // Terima token
    // Check kalau token valid
    // Renew token
    // Kirim token + user data
    try {
      const { token } = req;
      console.log(token)

      const renewedToken = generateToken({ id: token.id });

      const findUser = await User.findByPk(token.id);

      delete findUser.dataValues.password;

      return res.status(200).json({
        message: "Renewed user token",
        result: {
          user: findUser,
          token: renewedToken,
        },
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Server error",
      });
    }
  },
  verifyUser: async (req, res) => {
    const { vertoken } = req.params;
// console.log(isTokenVerified?.id)

    try {
      const isTokenVerified = await verifyToken(vertoken, process.env.JWT_SECRET_KEY);
console.log(isTokenVerified)

      if (!isTokenVerified || !isTokenVerified.isEmailVerification) {
        throw new Error("token is invalid");
      }
      const user = await User.update(
        { is_verified: true },
        {
          where: {
            id: isTokenVerified.id,
          },
          attributes: ["id", "username", "is_verified"],
        }
      );

      return res.status(200).json({
        message: "user verified",
        user,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: err.message,
      });
    }
  },
  verifySend : async( req, res) =>{
    try{
      const {id,email,username} = req.body
      const token = generateToken({id, isEmailVerification:true})
      const verToken = await sendVerification(id,email,username)



      return res.status(200).json({
        message:"verification send",
        result : {token,verToken}
      })

    }catch(err) {
      console.log("error");
      return res.status(500).json({
message:err.toString(),
      })

    }
  },

  registerUserV2: async (req, res) => {
    try {
      const { username, password, full_name, email } = req.body;

      const findUser = await User.findOne({
        where: {
          [Op.or]: [{ username }, { email }],
        },
      });
      console.log(findUser);

      const hashedPassword = bcrypt.hashSync(password, 5);

      const user = await User.create({
        username,
        password: hashedPassword,
        full_name,
        email,
      });
      // Verification email
      const verificationToken = nanoid(40);

      await VerificationToken.create({
        token: verificationToken,
        user_id: user.id,
        valid_until: moment().add(1, "hour"),
        is_valid: true
      })

      const verificationLink =
        `http://localhost:3000/auth/v2/verify/${verificationToken}`

      const template = fs.readFileSync(__dirname + "/../templates/verify.html").toString()

      const renderedTemplate = mustache.render(template, {
        username,
        verify_url: verificationLink,
        full_name
      })

      await mailer({
        to: email,
        subject: "Verify your account!",
        html: renderedTemplate
      })

      return res.status(201).json({
        message: "Registered user"
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: "Server error"
      })
    }
  },
  loginV2: async (req, res) => {
    try {
      const { email, password, username } = req.body;

      const user = await User.findOne({
        where: {
          [Op.or]: [{ username }, { email }],
        },
      });

      if (!user) {
        throw new Error("username/email/password not found");
      }

      const checkPass = await bcrypt.compareSync(password, user.password);
      console.log(checkPass);
      if (!checkPass) {
        throw new Error("password salah");
      }
      const token = nanoid(64);

      // Create new session for logged in user
      await Session.create({
        user_id: user.id,
        is_valid: true,
        token: token,
        valid_until: moment().add(1, "day")
      })


      delete user.dataValues.password;
      delete user.dataValues.createdAt;
      delete user.dataValues.updatedAt;

      console.log(user);

      res.status(200).json({
        message: "login succeed",
        result: { user, token },
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: err.toString(),
      });
    }
  },
  renderAvatar2: async (req, res) => {
    try {
      // Get user
      const { mongoid} = req.params;
      console.log(mongoid)

      const user = await Avatar.findOne({ _id: mongoid});

      if (!user) {
        throw new Error("No Avatar Found");
      }

      // Config untuk mengirim image
      res.set("Content-type", "image/png");

      // Kirim image
      res.send(user.image);
    } catch (err) {
      res.send(err);
    }
  },
};

module.exports = userController
