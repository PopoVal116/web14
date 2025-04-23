document.addEventListener('DOMContentLoaded', function () {
  const photo = document.getElementById('profileImage');
  const input = document.getElementById('photoInput');

  document.getElementById('photoUpload').onclick = () => input.click();

  input.onchange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        photo.src = reader.result;
        localStorage.setItem('photo', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (localStorage.getItem('photo')) {
    photo.src = localStorage.getItem('photo');
  }

  const profile = document.querySelector('.profile-container');
  if (localStorage.getItem('data')) {
    profile.innerHTML = localStorage.getItem('data');
  }

  profile.addEventListener('input', () => {
    clearTimeout(profile._t);
    profile._t = setTimeout(() => {
      localStorage.setItem('data', profile.innerHTML);
    }, 300);
  });

  document.getElementById('downloadBtn').onclick = () => {
    const clone = profile.cloneNode(true);
    clone.querySelectorAll('button').forEach(b => b.remove());

    html2pdf().from(clone).save('резюме.pdf');
  };

  document.getElementById('addItem').onclick = () => {
    const box = document.createElement('div');
    box.contentEditable = true;
    box.textContent = 'Новый пункт';
    box.className = 'simple-box';
    profile.appendChild(box);
    box.focus();
  };
});
