const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { checkBody } = require("../modules/checkBody");
const uid2 = require('uid2');

/* SIGN UP  */

router.post("/signup", async (req, res) => {
  if (!checkBody(req.body, ["firstname", "username", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }
  
  const { firstname, username, password } = req.body;
  
  const findUser = await User.findOne({ username: username });
  if (findUser) {
    res.json({ result: false, error: "Username already used" });
    return;
  } else {
    const token = uid2(32);
    User.create({
      firstname: firstname,
      username: username,
      password: password,
      token:token,
    });
  }
  res.json({ result: true, message: "User succesfully created" });
  return;
});

/* SIGN IN  */

router.post("/signin", async (req, res) => {
  if (!checkBody(req.body, ["username", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  const { username, password } = req.body;

  const findUser = await User.findOne({
    username: username,
    password: password,
  });

  if (findUser) {
    res.json({ result: true, message: "Login successful" });
  } else {
    res.json({ result: false, error: "Wrong password or username" });
  }
});
module.exports = router;
