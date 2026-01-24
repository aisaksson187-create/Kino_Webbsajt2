import { layout, escapeHtml } from "./layout.js";

export function moviesPage(movies) {
  const items = movies.map(m => {
    const title = escapeHtml(m.attributes?.title ?? "Untitled");
    return `<li class="card">
      <a href="/movies/${m.id}">
        <h2>${title}</h2>
      </a>
    </li>`;
  }).join("");

  const body = `
    <h1>Filmlista</h1>
    <ul class="grid">${items}</ul>
  `;

  return layout({ title: "Filmer", body });
}

export function moviePage(movie) {
  if (!movie) {
    return layout({
      title: "Hittades inte",
      body: `<h1>404</h1><p>Filmen hittades inte.</p><p><a href="/movies">Till filmlistan</a></p>`
    });
  }

  const title = escapeHtml(movie.title ?? "");
  const intro = escapeHtml(movie.intro ?? "");
  const imgUrl = movie.image?.url ? escapeHtml(movie.image.url) : "";

  const body = `
    <a class="back" href="/movies">← Tillbaka</a>
    <h1>${title}</h1>
    ${imgUrl ? `<img class="poster" src="${imgUrl}" alt="${title}">` : ""}
    ${intro ? `<p class="intro">${intro}</p>` : ""}
  `;

  return layout({ title, body });
}

export function errorPage(message) {
  const msg = escapeHtml(message);
  return layout({
    title: "Fel",
    body: `<h1>Något gick fel</h1><p>${msg}</p><p><a href="/movies">Till filmlistan</a></p>`
  });
}
