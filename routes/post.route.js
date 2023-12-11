const express = require("express");
const { PostModel } = require("../models/post.model");
const { auth } = require("../middlewares/auth.middleware");

const postRouter = express.Router();

postRouter.use(auth);

postRouter.get("/", async (req, res) => {
  try {
    const getUser = await PostModel.find();
    res.status(200).send({ msg: "req sucessful" });
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

postRouter.post("/add", async (req, res) => {
  const userID = req.authorization;
  try {
    const newPost = new PostModel({ ...req.body, userID });
    await newPost.save();
    res.status(200).send({ msg: "post added sucessfully" });
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

postRouter.patch("/update/:ID", async (req, res) => {
  const { ID } = req.params;
  try {
    await PostModel.findByIDAndUpdate(ID, req.body);
    res.status(200).send({ msg: "post updated sucessfully" });
  } catch (error) {
    res.status(400).send({ error: error });
  }
});
postRouter.delete("/delete/:ID", async (req, res) => {
  const { ID } = req.params;
  try {
    await PostModel.findByIDAndDelete(ID);
    res.status(200).send({ msg: "post updated sucessfully" });
  } catch (error) {
    res.status(400).send({ error: error });
  }
});

module.exports = { postRouter };
