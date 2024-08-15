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
