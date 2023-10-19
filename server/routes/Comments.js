const express = require("express");
const router = express.Router();
const { Comments } = require("../models");

router.get("/", async (req, res) => {
  const listOfComments = await Comments.findAll();
  res.json(listOfComments);
});

router.get('/byId/:id', async (req, res) => {
  const id = req.params.id;
  const comment = await Comments.findByPk(id);
  res.json(comment);
});

router.post("/", async (req, res) => {
  const comments = req.body;
  await Comments.create(comments);
  res.json(comments);
});

router.put("/update/:id", async(req,res) => {
  const comment = req.body;
  await Comments.update({ user_id : comment.user_id , movie_id : comment.movie_id , comment_text : comment.comment_text , timestamp : comment.timestamp },{where:{id : comment.id}})
  res.json(comment);
})


module.exports = router;