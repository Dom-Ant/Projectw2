const express = require("express");
const router = express.Router();
const { Users } = require("../models");

router.get("/", async (req, res) => {
  const listOfUsers = await Users.findAll();
  res.json(listOfUsers);
});

router.get('/byId/:id', async (req, res) => {
  const id = req.params.id;
  const user = await Users.findByPk(id);
  res.json(user);
});

router.post("/", async (req, res) => {
  const user = req.body;
  await Users.create(user);
  res.json(user);
});

router.put("/update/:id", async(req,res) => {
  const user = req.body;
  await Users.update({ username : user.username , email : user.email , password : user.password , role : user.role },{where:{id : user.id}})
  res.json(user);
})

router.delete("/:id", async (req, res) => {
  //res.json(req.params.id);
  const userId = req.params.id;
  res.json(userId);
  await Users.destroy({
    where: {
      id: userId
    },
  });
});

module.exports = router;