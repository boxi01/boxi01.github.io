function onLinkClick(index) {
  var sectionsList = ['about-me', 'work-experience', 'education']
  sectionsList.forEach( (element, i) => {
    if (i == index) {
      var clickedSection = document.getElementById(element);
      var clickedLink = document.getElementById(element + '-link')
      clickedSection.classList.remove('hidden-section')
      clickedLink.classList.add('active')
    } else {
      var activeSection = document.getElementById(element);
      var activeLink = document.getElementById(element + '-link')
      activeSection.classList.add('hidden-section');
      activeLink.classList.remove('active');
    }
  })

}