import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import { getMovies, getMovie } from "./src2/api2.js";
import { moviesPage, moviePage, errorPage } from "./src2/pages.js";

export const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));
app.use("/scripts", express.static(path.join(__dirname, "scripts")));
app.use("/css", express.static(path.join(__dirname, "css")));
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use(express.static(__dirname)); 


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});


app.get("/movies", async (req, res) => {
  try {
    const movies = await getMovies();
    res.type("html").send(moviesPage(movies));
  } catch (err) {
    res.status(500).type("html").send(errorPage(err.message));
  }
});


app.get("/movies/:id", async (req, res) => {
  try {
    const movie = await getMovie(req.params.id);
    if (!movie) return res.status(404).type("html").send(moviePage(null));
    res.type("html").send(moviePage(movie));
  } catch (err) {
    res.status(500).type("html").send(errorPage(err.message));
  }
});

app.use((req, res) => {
  res.status(404).type("html").send(`
    <h1>404</h1>
    <p>Sidan finns inte.</p>
    <p><a href="/">Till start</a></p>
  `);
});
