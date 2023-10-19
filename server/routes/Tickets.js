const express = require("express");
const router = express.Router();
const { Tickets } = require("../models");

router.get("/", async (req, res) => {
  const listOfTickets = await Tickets.findAll();
  res.json(listOfTickets);
});

router.get('/byId/:id', async (req, res) => {
  const id = req.params.id;
  const ticket = await Tickets.findByPk(id);
  res.json(ticket);
});

router.post("/", async (req, res) => {
  const tickets = req.body;
  await Tickets.create(tickets);
  res.json(tickets);
});

router.put("/update/:id", async(req,res) => {
  const ticket = req.body;
  await Tickets.update({ showtime_id : ticket.showtime_id , ticket_price : ticket.ticket_price , seat_number : ticket.seat_number , user_id : ticket.user_id , payment_status : ticket.payment_status },{where:{id : ticket.id}})
  res.json(ticket);
})


router.delete("/:id", async (req, res) => {
  //res.json(req.params.id);
  const ticketId = req.params.id;
  res.json(ticketId);
  await Tickets.destroy({
    where: {
      id: ticketId
    },
  });
});

module.exports = router;