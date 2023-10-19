const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images")
  },
  filename: (req, file, cb) => {
    console.log(file)
    cb(null, file.originalname)
  }
})

const upload = multer({storage: storage})

app.use(express.json());
app.use(cors());

app.set("view engine", "ejs");

const db = require("./models");

// Routers
const userRouter = require("./routes/Users");
const authRoutes = require('./routes/AuthRoutes');
app.use('/users', authRoutes);
app.use("/users", userRouter);

/* const userRouter = require("./routes/Users"); */
/* app.use("/users", userRouter); */

/* const movieShowtimesRouter = require('./routes/MoviesShowtimes');
app.use("/movies", movieShowtimesRouter); */

const movieRouter = require("./routes/Movies");
app.use("/movies", movieRouter);

const commentRouter = require("./routes/Comments");
app.use("/comments", commentRouter);

const ticketRouter = require("./routes/Tickets");
app.use("/tickets", ticketRouter);

const showtimeRouter = require("./routes/Showtimes");
app.use("/showtimes", showtimeRouter);

const theaterroomRouter = require("./routes/Theaterrooms");
app.use("/theaterrooms", theaterroomRouter);

app.get("/upload", (req, res) => {
  res.render("upload");
});

app.post("/upload", upload.single("image"), (req, res) => {
  res.send("Image Uploaded");
});

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});