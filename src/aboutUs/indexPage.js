export default (teamData) =>
  `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Our Amazing Team</title>
  <link rel="stylesheet" href="assets/styles.css">
</head>
<body>
  <header>
    <img class="icon" src="assets/personIcon.svg">
    <h1>Our Amazing Team</h1>
  </header>
  <ul class="tileGrid">
${tiles(teamData)}  </ul>
</body>
</html>`;

const tiles = (team) =>
  Object.values(team)
    .map((person) => tile(person))
    .join("");

const tile = (person) => `    <li class="tile">
      <a href="team/${person.name}.html">
        <img class="avatar" src="thumbnails/${person.image}" alt="${person.name}">
        <h2 class="name">${person.name}</h2>
        <div class="location">${person.location}</div>
      </a>
    </li>
`;
