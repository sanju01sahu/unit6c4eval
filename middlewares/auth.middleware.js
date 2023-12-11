const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");

const auth = async (req, res, next) => {
  const token = req.headers?.authroization?.split(" ")[1] || null;
  try {
    if (token) {
      const decoded = jwt.verify(token, "masai");
      const userExist = await UserModel.findOne({ _id: decoded.userID });
      if (userExist.length > 0) {
        return res.status(200).send({ msg: "authrntication Sucessful" });
      } else {
        return res.status(400).send({ msg: "please login again" });
      }
    } else {
      return res.status(400).send({ msg: "please login again" });
    }
    next();
  } catch (error) {
    res.status(400).send({ error: error });
  }
};

module.exports = { auth };
