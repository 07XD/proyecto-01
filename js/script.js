const switchInputs = document.querySelectorAll('.switch input');
const darkIcons = document.querySelectorAll('.dark');
const lightIcons = document.querySelectorAll('.light');
const body = document.querySelector('body');

// Función para guardar el tema seleccionado en localStorage
const saveThemePreference = (theme) => {
  localStorage.setItem('theme', theme);
};

// Función para cargar el tema almacenado en localStorage
const loadThemePreference = () => {
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme) {
    body.classList.remove('dark-theme', 'light-theme');
    body.classList.add(savedTheme + '-theme');
    for (let i = 0; i < darkIcons.length; i++) {
      darkIcons[i].style.display = savedTheme === 'dark' ? 'none' : 'flex';
    }
    for (let i = 0; i < lightIcons.length; i++) {
      lightIcons[i].style.display = savedTheme === 'light' ? 'none' : 'flex';
    }
    for (let i = 0; i < switchInputs.length; i++) {
      switchInputs[i].checked = savedTheme === 'dark';
    }
  } else {
    const prefersDarkTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (prefersDarkTheme) {
      body.classList.add('dark-theme');
      saveThemePreference('dark');
    } else {
      body.classList.add('light-theme');
      saveThemePreference('light');
    }
  }
};

// Cargar tema almacenado
loadThemePreference();

// Cambiar tema al cambiar el estado del checkbox o al hacer clic en el icono
const changeTheme = (checked) => {
  const userTheme = checked ? 'dark' : 'light';

  body.classList.remove('dark-theme', 'light-theme');
  body.classList.add(userTheme + '-theme');
  for (let i = 0; i < darkIcons.length; i++) {
    darkIcons[i].style.display = userTheme === 'dark' ? 'none' : 'flex';
  }
  for (let i = 0; i < lightIcons.length; i++) {
    lightIcons[i].style.display = userTheme === 'light' ? 'none' : 'flex';
  }
  saveThemePreference(userTheme);
};

// Actualizar estado del botón en ambas barras al cambiar el tema
for (let i = 0; i < switchInputs.length; i++) {
  switchInputs[i].addEventListener('change', () => {
    const checked = switchInputs[i].checked;

    // Actualizar estado del botón en ambas barras
    for (let j = 0; j < switchInputs.length; j++) {
      switchInputs[j].checked = checked;
    }

    changeTheme(checked);
  });
}

// Agregar evento de clic al icono para cambiar el tema
const darkIconsArray = Array.from(darkIcons);
const lightIconsArray = Array.from(lightIcons);
const iconsArray = darkIconsArray.concat(lightIconsArray);

for (let i = 0; i < iconsArray.length; i++) {
  iconsArray[i].addEventListener('click', () => {
    const checked = !switchInputs[0].checked;

    // Actualizar estado del botón en ambas barras
    for (let j = 0; j < switchInputs.length; j++) {
      switchInputs[j].checked = checked;
    }

    changeTheme(checked);
  });
}
