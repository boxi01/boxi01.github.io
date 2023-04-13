function loadProjectsData() {
  fetch('data/projects.json')
    .then(response => response.json())
    .then(data => {
      const section = document.getElementById('projects');

      // Title
      const sectionTitle = document.createElement('div');
      sectionTitle.classList.add('section__title');

      const sectionNumber = document.createElement('div');
      sectionNumber.classList.add('section__title__number');
      sectionNumber.innerHTML = '04';

      const sectionH1 = document.createElement('h1');
      sectionH1.innerHTML = data.title;

      sectionTitle.appendChild(sectionNumber);
      sectionTitle.appendChild(sectionH1);
      section.appendChild(sectionTitle);

      // Content
      const sectionContent = document.createElement('div');
      sectionContent.classList.add('section__content');

      data.projects.forEach(project => {
        const item = document.createElement('div');
        item.classList.add('projects__item');
        item.innerHTML = `<h5 class="projects__item__title">${project.name}</h5>
        <p>${project.description}</p>
        <div class="projects__item__icons">
          <a href="${project.url}" target="_blank"><img src="img/arrow-up.svg" alt="open-page" /></a>
        </div>`;

        sectionContent.appendChild(item);
      });

      section.appendChild(sectionContent);
    })
}