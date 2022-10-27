const { Router } = require("express");
const { user, videos } = require("../model/user");
var jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const userRoutes = Router();

//admin
userRoutes.post("/admin", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hash = await argon2.hash(password);
    const payload = {
      name: name,
      email: email,
      password: hash,
      role: "Admin",
    };
    const saveUser = new user(payload);
    const checkAlready = await user.find({ email: email });
    if (checkAlready.length === 0) {
      await saveUser.save();
      return res.status(200).send("Registration Sucess");
    } else {
      return res.send("Email already exists");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

//Customer
userRoutes.post("/custmor", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hash = await argon2.hash(password);
    const payload = {
      name: name,
      email: email,
      password: hash,
      role: "Customer",
    };
    const saveUser = new user(payload);
    const checkAlready = await user.find({ email: email });
    if (checkAlready.length === 0) {
      await saveUser.save();
      return res.status(200).send("Registration Sucess");
    } else {
      return res.send("Email already exists");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

//common login
userRoutes.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const User = await user.find({ email: email });
    if (!User) {
      return res.status(401).send("User Not Available");
    }
    const verify = await argon2.verify(User[0].password, password);
    if (verify) {
      const token = jwt.sign(
        {
          name: User[0].name,
          role: User[0].role,
        },
        process.env.SECERET_KEY || "SECERTKEY123456789",
        { expiresIn: "1h" }
      );
      res.status(200).send({ message: "Login Sucess", token });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//Upload Video API only for Admin

userRoutes.post("/video", isAdmin, async (req, res) => {
  const { video } = req.body;
  if (!video) {
    return res.send("Plese Upload Video");
  }
  const saveVideo = new videos({
    video,
  });

  saveVideo.save();
  res.send("Video Uploded Succesfully")
});

//middleware for admin
  async function isAdmin(req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("No User");
  try {
    var decoded = jwt.verify(
      token,
      process.env.SECERET_KEY || "SECERTKEY123456789"
    );

    if (decoded.role == "Admin") {
      return next();
    }
  } catch (err) {
    return res.status(401).send({ msg: "Admin token is not valid" });
  }
};

module.exports = userRoutes;
