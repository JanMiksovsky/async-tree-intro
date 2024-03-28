export default (person) =>
  `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${person.name}</title>
  <link rel="stylesheet" href="../assets/styles.css">
</head>
<body>
  <a class="headerLink" href="..">
    <header>
      <img class="icon" src="../assets/personIcon.svg">
      <h1>Our Amazing Team</h1>
    </header>
  </a>
  <main class="person">
    <img class="avatar large" src="../images/${person.image}" alt="${person.name}" />
    <h2 class="name">${person.name}</h2>
    <div class="location">${person.location}</div>
    <p class="bio">${person.bio}</p>
  </main>
</body>
</html>`;
