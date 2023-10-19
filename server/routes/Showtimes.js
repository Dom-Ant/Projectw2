const express = require("express");
const router = express.Router();
const { Showtimes } = require("../models");

router.get("/", async (req, res) => {
  const listOfShowtimes = await Showtimes.findAll();
  res.json(listOfShowtimes);
});

router.get('/byId/:id', async (req, res) => {
  const id = req.params.id;
  const showtime = await Showtimes.findByPk(id);
  res.json(showtime);
});

router.post("/", async (req, res) => {
  const showtimes = req.body;
  await Showtimes.create(showtimes);
  res.json(showtimes);
});

router.put("/update/:id", async(req,res) => {
  const showtime = req.body;
  await Showtimes.update({ movie_id : showtime.movie_id , room_id : showtime.room_id , show_date : showtime.show_date , show_time : showtime.show_time },{where:{id : showtime.id}})
  res.json(showtime);
})


router.delete("/:id", async (req, res) => {
  //res.json(req.params.id);
  const showtimeId = req.params.id;
  res.json(showtimeId);
  await Showtimes.destroy({
    where: {
      id: showtimeId
    },
  });
});

module.exports = router;