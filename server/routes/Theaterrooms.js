const express = require("express");
const router = express.Router();
const { TheaterRooms } = require("../models");

router.get("/", async (req, res) => {
  const listOfTheaterRooms = await TheaterRooms.findAll();
  res.json(listOfTheaterRooms);
});

router.get('/byId/:id', async (req, res) => {
  const id = req.params.id;
  const theaterroom = await TheaterRooms.findByPk(id);
  res.json(theaterroom);
});

router.post("/", async (req, res) => {
  const theaterRooms = req.body;
  await TheaterRooms.create(theaterRooms);
  res.json(theaterRooms);
});

router.put("/update/:id", async(req,res) => {
  const theaterroom = req.body;
  await TheaterRooms.update({ venue_id : theaterroom.venue_id , name : theaterroom.name , seat_capacity : theaterroom.seat_capacity },{where:{id : theaterroom.id}})
  res.json(theaterroom);
})

router.delete("/:id", async (req, res) => {
  //res.json(req.params.id);
  const theaterRoomId = req.params.id;
  res.json(theaterRoomId);
  await TheaterRooms.destroy({
    where: {
      id: theaterRoomId
    },
  });
});

module.exports = router;