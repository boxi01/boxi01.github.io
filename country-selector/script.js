let countiresList = [];

document.addEventListener("DOMContentLoaded", function () {
  addInuptListeners();
});


function getData(name) {
  showLoader();
  fetch(`https://restcountries.com/v3.1/name/${name}`)
    .then(response => {
      return response.json();
    })
    .then(countries => {
      countiresList = countries;
      if (countiresList.length > 0) {
        createCountiersList(countiresList);
      }
    })
    .catch((error) => {
      console.error("There has been a problem with your fetch operation:", error);
    });
}

function createCountiersList(list) {
  const countrySelectorOptions = document.getElementById('country-selector-options');
  countrySelectorOptions.style.height = `${list.length * 45}px`
  countrySelectorOptions.innerHTML = '';
  list.forEach((country, index) => {
    countrySelectorOptions.innerHTML +=
      `<div id="option${index}" class="country-selector__option" onclick="setSelectedOption(event); displaySelectedCountryDetails(event)">
        <img class="country-selector__option__flag flag" src="${country.flags.svg}">
        <p class="country-selector__option__name">${country.name.common}</p>
      </div>`;
  });
  toggleCountriesList();
  hideLoader();
}

function cleanCountryList() {
  const countrySelectorOptions = document.getElementById('country-selector-options');
  countrySelectorOptions.style.height = `0px`
  countrySelectorOptions.innerHTML = '';
}

function displaySelectedCountryDetails(e) {
  const countryName = e.currentTarget.children[1].innerHTML;
  createCountryDetails(countryName);
  openModal();
}

function createCountryDetails(countryName) {
  const selectedCountry = countiresList.find(country => country.name.common === countryName);

  if (!selectedCountry) {
    return
  }

  const modalContent = document.getElementById('modal-content');
  modalContent.innerHTML = `
  <div class="country-details__title">
    <img class="country-details__title__flag flag" src="${selectedCountry.flags.svg}">
    <h1>${selectedCountry.name.common}</h1>
  </div>

  <div class="country-details__info">
    <p>Official name:</p>
    <p>${selectedCountry.name.official}</p>
  </div>
  <div class="country-details__info">
    <p>Capital:</p>
    <p>${selectedCountry.capital}</p>
  </div>
  <div class="country-details__info">
    <p>Languages:</p>
    <p>${getLanguages(selectedCountry.languages)}</p>
  </div>
  <div class="country-details__info">
    <p>Population:</p>
    <p>${selectedCountry.population}</p>
  </div>
  <div class="country-details__info">
    <p>Continents:</p>
    <p>${getContinents(selectedCountry.continents)}</p>
  </div>
  <div class="country-details__coat-of-arms">
    <p>Coat of arms:</p>
    <div class="country-details__coat-of-arms__wrapper">
      <img src="${selectedCountry.coatOfArms.svg}">
    </div>
  </div>
  `;
}

function getLanguages(languages) {
  let langArray = [];
  for (const [key, value] of Object.entries(languages)) {
    langArray.push(value)
  }
  return langArray.join(', ');
}

function getContinents(continents) {
  return continents.length === 1 ? continents[0] : continents.join(', ');
}

function toggleCountriesList() {
  const countrySelector = document.getElementById('country-selector');
  countiresList && countiresList.length > 0 ? countrySelector.classList.add('opened') : countrySelector.classList.remove('opened')

}

function setSelectedOption(e) {
  const name = e.currentTarget.children[1].innerHTML;
  document.getElementById('country-selector__input').value = name;
}

function toggleIconRemove(event) {
  const icon = document.getElementById('remove-icon');
  event.target.value ? icon.classList.remove('hide') : icon.classList.add('hide');
}

function removeText() {
  const input = document.getElementById('country-selector__input');
  input.value = '';
  cleanCountryList();
}

function hideLoader() {
  const loader = document.getElementById('loader');
  loader.classList.add('hide');
}

function showLoader() {
  const loader = document.getElementById('loader');
  loader.classList.remove('hide');
}

function openModal() {
  const modal = document.getElementById('modal');
  modal.classList.remove('hide');
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.classList.add('hide');
}

function addInuptListeners() {
  const input = document.getElementById('country-selector__input');

  input.addEventListener("input", (event) => {
    toggleIconRemove(event);

    let inputValue = input.value.toLowerCase();
    if (inputValue.length >= 3) {
      getData(inputValue);
    } else {
      cleanCountryList();
    }
  });

}
