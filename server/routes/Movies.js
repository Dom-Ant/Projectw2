const express = require("express");
const router = express.Router();
const { Movies, Showtimes } = require("../models");
const uploadController = require('../controllers/upload.controller');
const upload = require('../helpers/upload.helper');


router.get("/", async (req, res) => {
  const listOfMovies = await Movies.findAll();
  res.json(listOfMovies);
});

router.get('/byId/:id', async (req, res) => {
  const id = req.params.id;
  const movie = await Movies.findByPk(id);
  res.json(movie);
});

router.post("/", async (req, res) => {
  const movies = req.body;
  await Movies.create(movies);
  res.json(movies);
});

router.put("/update/:id", upload.single('poster'), async (req, res) => {
  try {
    const movie = req.body;

    if (!movie.title && !movie.genre && !movie.duration && !movie.synopsis && !req.file) {
      return res.status(400).json({ error: "At least one field must be provided for update." });
    }

    const { imageUrl, thumbnailUrl } = await uploadController.uploadToS3(req, res);

    // Save the returned URLs (original image and thumbnail) in the database
    await Movies.update({
      title: movie.title,
      genre: movie.genre,
      duration: movie.duration,
      poster_url: imageUrl,
      poster_thumbnail_url: thumbnailUrl,
      synopsis: movie.synopsis
    }, { where: { id: req.params.id } });

    res.json({ message: "Movie updated successfully!" });
  } catch (error) {
    console.error("Error updating movie:", error);
    res.status(500).json({ error: "Internal server error. Please try again later." });
  }
});


router.delete("/:id", async (req, res) => {
  //res.json(req.params.id);
  const movieId = req.params.id;
  res.json(movieId);
  await Movies.destroy({
    where: {
      id: movieId
    },
  });
});

// get the showtimes for a movieid
router.get("/:movieId/showtimes", async (req, res) => {
  const movieId = req.params.movieId;

  const showtimes = await Showtimes.findAll({
    where: {
      movie_id: movieId
    }
  });

  if (!showtimes.length) {
    return res.status(404).json({ message: "There are no showtimes scheduled for this movie." })
  }

  res.json(showtimes);

});

// get a specific showtime
router.get("/:movieId/showtimes/:showtimeId", async (req, res) => {
  const movieId = req.params.movieId;
  const showtimeId = req.params.showtimeId;

  const showtime = await Showtimes.findOne({
    where: {
      id: showtimeId,
      movie_id: movieId
    }
  });

  if (!showtime) {
    return res.status(404).json({ message: "Showtime not found for this movie." });
  }

  res.json(showtime);

});

module.exports = router;