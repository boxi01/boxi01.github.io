sections = [
  "About",
  "experience"
]
// function onLinkClick(index) {
//   var sectionsList = ['about-me', 'work-experience', 'education']
//   sectionsList.forEach((element, i) => {
//     if (i == index) {
//       var clickedSection = document.getElementById(element);
//       var clickedLink = document.getElementById(element + '-link')
//       clickedSection.classList.remove('hidden-section')
//       clickedLink.classList.add('active')
//     } else {
//       var activeSection = document.getElementById(element);
//       var activeLink = document.getElementById(element + '-link')
//       activeSection.classList.add('hidden-section');
//       activeLink.classList.remove('active');
//     }
//   })
// }

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
  loadEducationData();
  loadExperienceData();
  loadProjectsData();
}