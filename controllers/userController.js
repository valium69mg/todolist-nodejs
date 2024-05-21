const User = require('../models/User.js');
const bcrypt = require('bcrypt');

module.exports.updatePassword = async (req,res) => {
    const mail = req.mail;
    const {newPassword} = req.body;
    bcrypt.hash(newPassword, parseInt(process.env.SALT_ROUNDS), async function(err, hash) {
      // Store hash in your password DB.
      const updateUserPassword = await User.updateUserPassword(mail,hash);
        if (updateUserPassword === true) {
        res.status(200).json({action: "User's password updated."});
        } else {
        res.status(400).send("Oops, something went wrong");

        }
    });
};

module.exports.deleteUser = async (req,res) => {
  const mail = req.mail;
  const deleteUser = User.deleteUser(mail);
  if (deleteUser instanceof Error) {
    res.status(400).json({error: deleteUser});
  } else {
    res.cookie()
    res.clearCookie("token").redirect("/");
  }
}

module.exports.getAllUsers = async (req,res) => {
    const mail = req.mail;
    if (mail !== process.env.ADMIN) {
      res.status(403).json({error: 'User not authorized'});
    } else {
      const getUsers = await User.getAllUsers();
      res.status(200).json(getUsers);
    }
};