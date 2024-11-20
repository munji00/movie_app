const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/movie_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const movieSchema = new mongoose.Schema({
  Title: String,
  Year: String,
  imdbID: String,
  Type: String,
  Poster: String,
});

const Movie = mongoose.model('Movie', movieSchema);


app.post('/api/favourites', async (req, res) => {
  const movie = new Movie(req.body);
  await movie.save();
  res.send({ message: 'Movie added to favourites!' });
});

app.get('/api/favourites', async (req, res) => {
  const favourites = await Movie.find();
  res.send(favourites);
});

app.listen(5000, () => console.log('Server is running on port 5000'));
