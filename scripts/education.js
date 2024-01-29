function loadEducationData(index) {
  fetch('data/education.json')
    .then(response => response.json())
    .then(data => {
      const section = document.getElementById('education');

      // Title
      const sectionTitle = document.createElement('div');
      sectionTitle.classList.add('section__title');

      const sectionNumber = document.createElement('div');
      sectionNumber.classList.add('section__title__number');
      sectionNumber.innerHTML = `0${index}`;

      const sectionH1 = document.createElement('h1');
      sectionH1.innerHTML = data.title;

      sectionTitle.appendChild(sectionNumber);
      sectionTitle.appendChild(sectionH1);
      section.appendChild(sectionTitle);

      // Content
      const sectionContent = document.createElement('div');
      sectionContent.classList.add('section__content');

      data.levels.forEach(level => {
        const item = document.createElement('div');
        item.classList.add('education__item');

        const itemTitle = document.createElement('div');
        itemTitle.classList.add('education__item__title');
        itemTitle.innerHTML = `<h4>${level.title}</h4>
        <span class="text-separator"></span>
        <span class="text-alternative">${level.date}</span>`;

        item.appendChild(itemTitle);

        const itemContent = document.createElement('div');
        itemContent.classList.add('education__item__content');
        itemContent.innerHTML = `<p>${level.uni}</p>
        <p>${level.faculty}</p>
        <p>${level.specialization ? level.specialization : ''}</p>
        <p class="text-lighter">${level.thesis}</p>`;

        if (level.additionalInfo) {
          const itemSubtitle = document.createElement('div');
          itemSubtitle.classList.add('education__item__subtitle', 'mt-2');
          itemSubtitle.innerHTML = `<p>${level.additionalInfo}</p>`;
          itemContent.appendChild(itemSubtitle);
        }

        item.appendChild(itemContent);
        sectionContent.appendChild(item);
      });

      section.appendChild(sectionContent)
    });
}