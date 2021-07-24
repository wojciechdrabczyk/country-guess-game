// Inputs and flag
const button = document.querySelector("#checkButton");
const inputTextBox = document.querySelector("#name");
const randomFlag = document.querySelector("#flag");

// Score
const scoreElement = document.querySelector("#score");

// Country hint queryselectors
const currency = document.querySelector("#currency");
const population = document.querySelector("#population");
const languages = document.querySelector("#languages");

// Application state
let countriesArray = [];
let currentCountry = {};
let score = 0;
let randomNumber;

function setCountry(randomNumber) {
  currentCountry = countriesArray[randomNumber];
  population.textContent = `Population of the country is: ${currentCountry.population} people `;
  const currencyText = currentCountry.currencies
    .map(getTextFromInput)
    .join(", ");

  const languagesText = currentCountry.languages
    .map(getTextFromInput)
    .join(", ");
  currency.textContent = `Currencies: ${currencyText}`;
  languages.textContent = `Languages: ${languagesText}`;
  randomFlag.src = currentCountry.flag;
}

function getRandomNumber(data) {
  return Math.floor(Math.random() * data.length);
}

function getTextFromInput(object) {
  return object.name;
}

async function run() {
  const url = "https://restcountries.eu/rest/v2/all";
  const response = await fetch(url);
  countriesArray = await response.json();
  randomNumber = getRandomNumber(countriesArray);
  setCountry(randomNumber);
}

button.addEventListener("click", () => {
  console.log(currentCountry);
  if (inputTextBox.value.toLowerCase() === currentCountry.name.toLowerCase()) {
    alert(`Right answer! The country was ${currentCountry.name}`);
    score++;
  } else {
    alert(`Wrong answer, the country is ${currentCountry.name}`);
    score = 0;
  }
  randomNumber = getRandomNumber(countriesArray);
  setCountry(randomNumber);
  scoreElement.textContent = `Score: ${score}`;
});

run();
