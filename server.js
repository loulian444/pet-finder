// write basic express framework from npm
const express = require(`express`);
const app = express();

// import pets array
const pets = require(`./petsArray.js`);

// write get home page but keep it empty for now
app.get(`/`, (req, res) => {
  res.sendFile(__dirname + `/index.html`);
});

// write get for /pets
app.get(`/pets`, (req, res) => {
  // loop through array and send
  const petNames = pets.map((pet) => pet.name);

  res.send(petNames.join(`, `));
});

// write get for /pets/:name
app.get(`/pets/:name`, (req, res) => {
  // get the name from param
  const petName = req.params.name;
  // loop through array with if statement to find a match
  const foundPet = pets.find((pet) => pet.name === petName);

  console.log(petName);

  foundPet ? res.send(foundPet.name) : res.send(`no pet by that name`);
});

// write get for /pets/owner
app.get(`/owner`, (req, res) => {
  // get the owner's name using query
  const ownerName = req.query.owner;
  // loop through array with if statement to find a match
  const ownerPets = pets.filter((pet) => pet.owner === ownerName);
  const ownerPetNames = ownerPets.map((pet) => pet.name);
  const hasNames = ownerPets.find((pet) => pet.name);

  console.log(ownerPets);
  console.log(hasNames);

  hasNames
    ? res.send(ownerPetNames.join(`, `))
    : res.send(`no pets for that owner`);
});

const PORT = 4444;
app.listen(PORT);
