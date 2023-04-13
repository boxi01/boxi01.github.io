function loadExperienceData() {
  fetch('data/experience.json')
    .then(response => response.json())
    .then(data => {
      const section = document.getElementById('experience');

      // Title
      const sectionTitle = document.createElement('div');
      sectionTitle.classList.add('section__title');

      const sectionNumber = document.createElement('div');
      sectionNumber.classList.add('section__title__number');
      sectionNumber.innerHTML = '03';

      const sectionH1 = document.createElement('h1');
      sectionH1.innerHTML = data.title;

      sectionTitle.appendChild(sectionNumber);
      sectionTitle.appendChild(sectionH1);
      section.appendChild(sectionTitle);

      // Content
      const sectionContent = document.createElement('div');
      sectionContent.classList.add('section__content');
      const tab = document.createElement('div');
      tab.classList.add('experience__tab');

      data.companies.forEach((company, index) => {
        const tabItem = document.createElement('div');
        tabItem.classList.add('experience__tab__item');
        tabItem.addEventListener('click', () => changeTab(company.code, index));
        tabItem.innerHTML = `<p>${company.name}</p>`;


        const tabContent = document.createElement('div');
        tabContent.classList.add('experience__tab__content');
        tabContent.setAttribute("id", company.code);

        const tabContentTitle = document.createElement('h4');
        tabContentTitle.innerHTML = company.name;

        company.roles.forEach(role => {
          const tabContentPosition = document.createElement('div');
          tabContentPosition.classList.add('experience__tab__content__position');

          let responsibilities = '';
          role.responsibilities.forEach(responsibility => {
            responsibilities += `<li>${responsibility}</li>`
          });

          tabContentPosition.innerHTML = `
          <div class="experience__tab__content__position__title">
            <p class="text-bold">${role.name}</p>
            <span class="text-separator"></span>
            <span class="text-alternative">${role.date}</span>
          </div>
          <ul class="experience__tab__content__position__description">${responsibilities}</ul>`;

          tabContent.appendChild(tabContentPosition);
        });

        tab.appendChild(tabItem);
        sectionContent.appendChild(tabContent);
      });

      section.appendChild(tab);
      section.appendChild(sectionContent);
      changeTab('epam', 0)
    });
}

function changeTab(sectionName, index) {
  showTabContent(sectionName);
  markTabAsSelected(index);
}

function markTabAsSelected(index) {
  const tabsNameList = document.querySelectorAll('.experience__tab__item');
  tabsNameList.forEach((name, id) => {
    if (id === index) {
      name.classList.add('experience__tab__item--selected');
    } else {
      name.classList.remove('experience__tab__item--selected');
    }
  });
}

function showTabContent(sectionName) {
  const tabsContentList = document.querySelectorAll('.experience__tab__content');
  tabsContentList.forEach(tab => {
    tab.id === sectionName
      ? tab.style.display = 'block'
      : tab.style.display = 'none';
  });
}
