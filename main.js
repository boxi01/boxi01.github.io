sections = [
  "About",
  "experience"
]

window.addEventListener('DOMContentLoaded', (event) => {
  loadSectionData();
  changeTab('epam', 0)
  const navigationBtn = document.querySelector('.navigation__btn');
  let menuOpen = false

  navigationBtn.addEventListener('click', () => {
    if (!menuOpen) {
      navigationBtn.classList.add('open');
      navigationBtn.parentElement.classList.add('open');
      menuOpen = true;
    } else {
      navigationBtn.classList.remove('open');
      navigationBtn.parentElement.classList.remove('open');
      menuOpen = false;
    }
  })
});

function loadSectionData() {
  loadExperienceData(1);
  loadEducationData(2);
  loadProjectsData(3);
}