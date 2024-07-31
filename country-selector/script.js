let countiresList = [];
let selectedCountry = null;

document.addEventListener("DOMContentLoaded", function () {
  getCountryInput().addEventListener("input", (event) => {
    const searchText = event.target.value;
    toggleIconRemove(event);

    if (searchText.length >= 3) {
      fetchCountries(searchText).then(
        countries => {
          countiresList = countries;
          showCountries(countries);
        }
      )
    }

    if (searchText.length < 3 && countiresList.length > 0) {
      cleanCountryList();
    }
  });
});

async function fetchCountries(name) {
  const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
  return await response.json();
}

function showCountries(countries) {
  createCountiersOptions(countries);
  toggleCountriesOptions();
  setElementsHeight(countries.length);
  hideLoader();
}

function createCountiersOptions(list) {
  const countrySelectorOptions = getCountrySelectorOptions();
  countrySelectorOptions.innerHTML = '';
  list.forEach((country, index) => {
    countrySelectorOptions.innerHTML +=
      `<div id="option${index}" class="country-selector__option" onclick="setSelectedOption(event); displaySelectedCountryDetails(event)">
        <img class="country-selector__option__flag flag" src="${country.flags.svg}">
        <p class="country-selector__option__name">${country.name.common}</p>
      </div>`;
  });
}

function setElementsHeight(number) {
  document.getElementById('main').style.height = number > 0 ? `${150 + number * 40}px` : '150px';
  getCountrySelector().style.height = number > 0 ? `${45 + number * 45}px` : '40px';
  getCountrySelectorOptions().style.height = number > 0 ? `${number * 45}px` : '0px'
}

function cleanCountryList() {
  closeCountriesList();
  setElementsHeight(0);
}

function displaySelectedCountryDetails(e) {
  const countryName = e.currentTarget.children[1].innerHTML;
  createCountryDetails(countryName);
  openModal();
  showBackgroundImage();
  cleanCountryList();
}

function createCountryDetails(countryName) {
  selectedCountry = countiresList.find(country => country.name.common === countryName);

  if (!selectedCountry) {
    return
  }

  const modalContent = document.getElementById('modal-content');
  modalContent.innerHTML = `
  <div class="country-details__title">
    <img class="country-details__title__flag flag" src="${selectedCountry.flags.svg}">
    <h1>${selectedCountry.name.common}</h1>
  </div>

  <table>
    <tr class="country-details__info">
      <td><p>Official name:</p></td>
      <td><p>${selectedCountry.name.official}</p></td>
    </tr>
    <tr class="country-details__info">
      <td><p>Capital:</p></td>
      <td><p>${selectedCountry.capital}</p></td>
    </tr>
    <tr class="country-details__info">
      <td><p>Languages:</p></td>
      <td><p>${getLanguages(selectedCountry.languages)}</p></td>
    </tr>
    <tr class="country-details__info">
      <td><p>Population:</p></td>
      <td><p>${selectedCountry.population}</p></td>
    </tr>
    <tr class="country-details__info">
      <td><p>Continents:</p></td>
      <td><p>${getContinents(selectedCountry.continents)}</p></td>
    </tr>
  </table>
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

function toggleCountriesOptions() {
  const countrySelector = getCountrySelector();
  countiresList && countiresList.length > 0 ? countrySelector.classList.add('opened') : countrySelector.classList.remove('opened');
}

function closeCountriesList() {
  getCountrySelector().classList.remove('opened');
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
  modal.classList.add('modal-fade-in');
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.classList.remove('modal-fade-in');
  modal.classList.add('hide');
}

function getCountrySelector() {
  return document.getElementById('country-selector');
}

function getCountryInput() {
  return document.getElementById('country-selector__input');
}

function getCountrySelectorOptions() {
  return document.getElementById('country-selector-options');
}

function showBackgroundImage() {
  const leftImg = document.getElementById('background-image-left');
  const rightImg = document.getElementById('background-image-right');
  leftImg.src = selectedCountry.coatOfArms.svg;
  rightImg.src = selectedCountry.coatOfArms.svg;
  leftImg.classList.add('image-show-left');
  rightImg.classList.add('image-show-right');
}

function hideImageBackground() {
  // TODO
}
