let countiresList = [];

document.addEventListener("DOMContentLoaded", function () {
  addInuptListeners();
});

document.getElementById('country-selector-options').addEventListener("click", function (event) {
  setSelectedOption(event.target.innerHTML);
  toggleCountriesList();
  openModal();
});

function getData(name) {
  showLoader();
  fetch(`https://restcountries.com/v3.1/name/${name}`)
    .then(response => {
      return response.json();
    })
    .then(countries => {
      countiresList = countries;
      console.log(countiresList)
      createCountiersList(countiresList);
      toggleCountriesList();
      hideLoader();
    })
    .catch((error) => {
      console.error("There has been a problem with your fetch operation:", error);
    });
}

function createCountiersList(list) {
  const countrySelectorOptions = document.getElementById('country-selector-options');
  countrySelectorOptions.style.height = `${list.length * 60}px`
  countrySelectorOptions.innerHTML = '';
  list.forEach((country, index) => {
    countrySelectorOptions.innerHTML +=
      `<div value="${country.cca3}" id="option${index}" class="country-selector__option">
        <img class="country-selector__option__flag" src="${country.flags.svg}">
        <p class="country-selector__option__name">${country.name.official}</p>
      </div>`;
  })
}

function displaySelectedCountryDetails() {
  createCountryDetails();
  openModal();
}

function createCountryDetails() {

}

function toggleCountriesList() {
  const countrySelector = document.getElementById('country-selector');
  countrySelector.classList.toggle('opened');
}

function setSelectedOption(name) {
  document.getElementById('country-selector__input').value = name;
}

function toggleIconRemove(event) {
  const icon = document.getElementById('remove-icon');
  if (event.target.value) {
    icon.classList.remove('hide');
  } else {
    icon.classList.add('hide');
  }
}

function removeText() {
  const input = document.getElementById('country-selector__input');
  input.value = '';
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

function addInuptListeners() {
  const input = document.getElementById('country-selector__input');
  // const optionList = document.querySelectorAll('.country-selector__option');

  input.addEventListener("click", () => {
    // toggleCountriesList();
  });

  input.addEventListener("input", (event) => {
    toggleIconRemove(event);

    let inputValue = input.value.toLowerCase();
    if (inputValue.length >= 3) {
      getData(inputValue);
    }

    // const countrySelector = document.getElementById('country-selector');
    // if (inputValue) {
    //   countrySelector.classList.add('filtered');
    // } else {
    //   countrySelector.classList.remove('filtered');
    // }


    // [...optionList].forEach(option => {
    //   const name = option.querySelector('.country-selector__option__name').innerHTML;
    //   if (!name.toLowerCase().includes(inputValue)) {
    //     option.classList.add('hide');
    //   } else {
    //     option.classList.remove('hide');
    //   }
    // })


    //   const filteredList = countiresList.filter(country => {
    //     // const name = option.querySelector('.country-selector__option__name').innerHTML;
    //     // console.log(name.toLowerCase())
    //     // console.log(inputValue)
    //     return country.name.toLowerCase().includes(inputValue)
    //   })

    // this.createCountiersList(filteredList);    
  });

}

// loadCountriesList();
