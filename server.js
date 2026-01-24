import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import { getMovies, getMovie } from "./src2/api2.js";
import { moviesPage, moviePage, errorPage } from "./src2/pages.js";

const app = express();
const PORT = 5080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1) Statiskt: dina gamla filer
app.use(express.static("public"));
app.use("/scripts", express.static(path.join(__dirname, "scripts")));
app.use("/css", express.static(path.join(__dirname, "css")));
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use(express.static(__dirname)); // index.html, main.css, etc

// 2) Startsidan: visa din gamla startsida
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html")); // eller index2.html
});

// 3) SSR: lista
app.get("/movies", async (req, res) => {
  try {
    const movies = await getMovies();
    res.type("html").send(moviesPage(movies));
  } catch (err) {
    res.status(500).type("html").send(errorPage(err.message));
  }
});

// 4) SSR: detalj
app.get("/movies/:id", async (req, res) => {
  try {
    const movie = await getMovie(req.params.id);
    if (!movie) {
      res.status(404).type("html").send(moviePage(null));
      return;
    }
    res.type("html").send(moviePage(movie));
  } catch (err) {
    res.status(500).type("html").send(errorPage(err.message));
  }
});

// (valfritt) 404 för allt annat som inte är en fil
app.use((req, res) => {
  res.status(404).type("html").send(`
    <h1>404</h1>
    <p>Sidan finns inte.</p>
    <p><a href="/">Till start</a></p>
  `);
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
