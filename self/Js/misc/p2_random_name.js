/* Create a business name generator by combining list of adjectives and shop name and another word

Adjectives:
Crazy 
Amazing
Fire 

Shop Name:
Engine
Foods
Garments

Another Word:
Bros
Limited
Hub

*/

/*

let adj = {
  a: "Crazy",
  b: "Amazing",
  c: "Fire",
};

let shop = {
  a: "Engine",
  b: "Foods",
  c: "Garments",
};

let word = {
  a: "Bros",
  b: "Limited",
  c: "Hub",
};

const keys1 = Object.keys(adj);
const randomKey1 = keys1[Math.floor(Math.random() * keys1.length)];

const keys2 = Object.keys(shop);
const randomKey2 = keys2[Math.floor(Math.random() * keys2.length)];

const keys3 = Object.keys(shop);
const randomKey3 = keys3[Math.floor(Math.random() * keys3.length)];

console.log(adj[randomKey1] + " " + shop[randomKey2] + " " + word[randomKey3]);

*/

let rand = Math.random();
let first, second, third;

// Generate the first word
if (rand < 0.33) {
  first = "Crazy";
} else if (rand < 0.66 && rand >= 0.33) {
  first = "Amazing";
} else {
  first = "Fire";
}

// Generate the second word
rand = Math.random();
if (rand < 0.33) {
  second = "Engine";
} else if (rand < 0.66 && rand >= 0.33) {
  second = "Foods";
} else {
  second = "Garments";
}

// Generate the third word
rand = Math.random();
if (rand < 0.33) {
  third = "Bros";
} else if (rand < 0.66 && rand >= 0.33) {
  third = "Limited";
} else {
  third = "Hub";
}

console.log(`${first} ${second} ${third}`);
