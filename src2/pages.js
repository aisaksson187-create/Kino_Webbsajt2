import { layout, escapeHtml } from "./layout.js";

export function moviesPage(movies) {
  if (!movies) movies = [];

  let items = "";

  for (let i = 0; i < movies.length; i++) {
    const m = movies[i];

    let rawTitle = "Untitled";
    if (m && m.attributes && m.attributes.title) {
      rawTitle = m.attributes.title;
    }

    const title = escapeHtml(rawTitle);

    items += `
      <li class="movie-card">
        <a class="movie-card__link" href="/movies/${m.id}">
          <h2 class="movie-card__title">${title}</h2>
        </a>
      </li>
    `;
  }

  if (items === "") {
    items = `<li>Inga filmer hittades.</li>`;
  }

  const body = `
    <main class="page">
      <a class="back-link" href="/">← Till startsidan</a>
      <h1 class="page__title">Filmlista</h1>

      <ul class="movies-grid">
        ${items}
      </ul>
    </main>
  `;

  return layout({ title: "Filmer", body });
}

export function moviePage(movie) {
  if (!movie) {
    return layout({
      title: "Hittades inte",
      body: `
        <main class="page">
          <a class="back-link" href="/movies">← Till filmlistan</a>
          <h1>404</h1>
          <p>Filmen hittades inte.</p>
          <p><a class="back-link" href="/">← Till startsidan</a></p>
        </main>
      `
    });
  }

  const title = escapeHtml(movie.title ? movie.title : "");

  const intro = movie.intro ? movie.intro : "";

  let imgUrl = "";
  if (movie.image && movie.image.url) {
    imgUrl = escapeHtml(movie.image.url);
  }

  let introHtml = "";
  if (intro) {
    introHtml = `<p class="movie__intro">${intro}</p>`;
  }

  let imageHtml = "";
  if (imgUrl) {
    imageHtml = `
      <figure class="movie__poster-wrap">
        <img class="movie__poster" src="${imgUrl}" alt="${title}">
      </figure>
    `;
  }

  const body = `
    <main class="page movie">
      <nav class="movie__nav">
        <a class="back-link" href="/movies">← Till filmlistan</a>
        <a class="back-link" href="/">← Till startsidan</a>
      </nav>

      <h1 class="movie__title">${title}</h1>
      ${introHtml}
      ${imageHtml}
    </main>
  `;

  return layout({ title, body });
}

export function errorPage(message) {
  const msg = escapeHtml(message ? message : "");

  return layout({
    title: "Fel",
    body: `
      <main class="page">
        <a class="back-link" href="/">← Till startsidan</a>
        <h1>Något gick fel</h1>
        <p>${msg}</p>
        <p><a class="back-link" href="/movies">← Till filmlistan</a></p>
      </main>
    `
  });
}
