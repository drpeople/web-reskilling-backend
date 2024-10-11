const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

//locahost port
const port = 3000;

// use cors middleware gobablly
app.use(cors());

const apiUrlPosts = "https://jsonplaceholder.typicode.com/posts";
const apiUrlPhotos = "https://jsonplaceholder.typicode.com/photos";

// retrieve posts
// app.get("/posts", async (req, res) => {
//   const response = await axios.get(apiUrlPosts);
//   res.status(200).json(response.data);
// });

app.get("/posts", async (req, res) => {
  try {
    // fetch data
    const [response1, response2] = await Promise.all([
      axios.get(apiUrlPosts),
      axios.get(apiUrlPhotos),
    ]);
    // combine data

    const combineData = {
      posts: response1.data,
      photos: response2.data,
    };

    res.json(combineData);
  } catch {
    res.status(500).send("Server Error");
  }
});

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [response1, response2] = await Promise.all([
      axios.get(`${apiUrlPosts}/${id}`),
      axios.get(apiUrlPhotos),
    ]);

    const photo = response2.data.find((photo) => photo.id === parseInt(id));

    // compine post and photo data
    const result = { ...response1.data, photoUrl: photo ? photo.url : null };
    res.json(result);
  } catch {
    res.status(500).send("Server Error");
  }
});

app.listen(port, () => {
  console.log("Backend server running");
});
