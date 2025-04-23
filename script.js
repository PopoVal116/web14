document.addEventListener('DOMContentLoaded', () => {
  // Волновой эффект
  function createWaveEffect(event) {
    const rect = this.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const wave = this.querySelector('.wave');
    if (!wave) return;

    wave.style.left = `${x}px`;
    wave.style.top = `${y}px`;

    wave.classList.remove('active');
    void wave.offsetWidth; // перезапуск анимации
    wave.classList.add('active');
  }

  // Применение эффекта на кнопки и фото
  document.querySelectorAll('#photoUpload, button').forEach(button => {
    button.addEventListener('click', function (e) {
      createWaveEffect.call(this, e);
    });
  });

  // Фото
  const photoUpload = document.getElementById('photoUpload');
  const photoInput = document.getElementById('photoInput');
  const profileImage = document.getElementById('profileImage');

  if (photoUpload && photoInput && profileImage) {
    photoUpload.addEventListener('click', () => photoInput.click());

    photoInput.addEventListener('change', e => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = evt => {
        profileImage.src = evt.target.result;
        localStorage.setItem('profileImage', evt.target.result);
      };
      reader.readAsDataURL(file);
    });

    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
      profileImage.src = savedImage;
    }
  }

  // Универсальная функция добавления
  function setupAddButton(buttonId, containerId, template) {
    const button = document.getElementById(buttonId);
    const container = document.getElementById(containerId);

    if (!button || !container) return;

    button.addEventListener('click', () => {
      const newItem = document.createElement('div');
      newItem.innerHTML = template;
      newItem.setAttribute('contenteditable', 'true');
      newItem.classList.add(buttonId.includes('Language') ? 'language-item' : 'tag');
      container.insertBefore(newItem, button);
      newItem.focus();
    });
  }

  // Опыт работы
  const addExperience = document.getElementById('addExperience');
  if (addExperience) {
    addExperience.addEventListener('click', () => {
      const container = document.getElementById('experienceContainer');
      if (!container) return;

      const newItem = document.createElement('div');
      newItem.className = 'exp-item';
      newItem.setAttribute('contenteditable', 'true');
      newItem.innerHTML = `
        <div class="exp-header">
          <h3>Должность</h3>
          <div class="exp-date">MM/YYYY - MM/YYYY</div>
        </div>
        <div class="exp-company">Название компании</div>
        <div class="exp-desc">Описание ваших обязанностей и достижений.</div>
      `;
      container.insertBefore(newItem, addExperience);
    });
  }

  // Образование
  const addEducation = document.getElementById('addEducation');
  if (addEducation) {
    addEducation.addEventListener('click', () => {
      const container = document.getElementById('educationContainer');
      if (!container) return;

      const newItem = document.createElement('div');
      newItem.className = 'edu-item';
      newItem.setAttribute('contenteditable', 'true');
      newItem.innerHTML = `
        <div class="edu-header">
          <h3>Степень/Квалификация</h3>
          <div class="edu-date">MM/YYYY - MM/YYYY</div>
        </div>
        <div class="edu-place">Название учебного заведения</div>
        <div class="edu-desc">Описание вашего образования и достижений.</div>
      `;
      container.insertBefore(newItem, addEducation);
    });
  }

  // Кнопки добавления
  setupAddButton('addLanguage', 'languagesContainer', '<span class="flag">🇷🇺</span> Новый язык <span class="level">(Уровень)</span>');
  setupAddButton('addTool', 'toolsContainer', 'Новый навык');
  setupAddButton('addInterest', 'interestsContainer', 'Новый интерес');

  // Сохранение контента
  const profileContainer = document.querySelector('.profile-container');
  if (profileContainer) {
    profileContainer.addEventListener('input', () => {
      localStorage.setItem('profileContent', profileContainer.innerHTML);
    });

    const savedContent = localStorage.getItem('profileContent');
    if (savedContent) {
      profileContainer.innerHTML = savedContent;
    }
  }

  // Скачивание PDF
  const downloadBtn = document.getElementById('downloadBtn');
  if (downloadBtn && profileContainer) {
    downloadBtn.addEventListener('click', () => {
      const clone = profileContainer.cloneNode(true);

      clone.querySelectorAll('.controls button, .add-btn').forEach(btn => btn.remove());

      const opt = {
        margin: 10,
        filename: 'резюме.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, logging: false, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      html2pdf().set(opt).from(clone).save();
    });
  }
});
