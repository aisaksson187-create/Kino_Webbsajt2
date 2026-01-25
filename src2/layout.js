function escapeHtml(str) {

  if (str === null || str === undefined) str = "";

  str = "" + str;

  str = str.split("&").join("&amp;");
  str = str.split("<").join("&lt;");
  str = str.split(">").join("&gt;");
  str = str.split('"').join("&quot;");
  str = str.split("'").join("&#039;");

  return str;
}

function layout(data) {
  const safeTitle = escapeHtml(data.title);

  return `<!doctype html>
<html lang="sv">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${safeTitle}</title>
  <link rel="stylesheet" href="/main.css" />
</head>
<body>
  <header class="header">
    <a class="brand" href="/movies">Filmer</a>
  </header>

  ${data.body}
</body>
</html>`;
}

export { layout, escapeHtml };
