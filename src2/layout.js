function escapeHtml(str = "") {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function layout({ title, body }) {
  const safeTitle = escapeHtml(title);

  return `<!doctype html>
<html lang="sv">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${safeTitle}</title>
  <link rel="stylesheet" href="/styles.css" />
</head>
<body>
  <header class="header">
    <a class="brand" href="/movies">🎬 Filmer</a>
  </header>

  <main class="container">
    ${body}
  </main>
</body>
</html>`;
}

export { escapeHtml };
