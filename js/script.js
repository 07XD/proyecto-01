const switchInput = document.querySelector('.switch input');
const darkIcon = document.querySelector('.dark');
const lightIcon = document.querySelector('.light');
const body = document.querySelector('body');

// Función para guardar el tema seleccionado en localStorage
const saveThemePreference = (theme) => {
  localStorage.setItem('theme', theme);
};

// Función para cargar el tema almacenado en localStorage
const loadThemePreference = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark-theme');
    darkIcon.classList.add('active');
    lightIcon.style.display = 'flex';
    darkIcon.style.display = 'none';
    switchInput.checked = true;
  } else {
    body.classList.add('light-theme');
    lightIcon.classList.add('active');
    darkIcon.style.display = 'flex';
    lightIcon.style.display = 'none';
    switchInput.checked = false;
  }
};

// Detectar tema del dispositivo
const prefersDarkTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

// Aplicar tema inicial
if (prefersDarkTheme) {
  saveThemePreference('dark');
} else {
  saveThemePreference('light');
}

// Cargar tema almacenado
loadThemePreference();

// Cambiar tema al cambiar el estado del checkbox
switchInput.addEventListener('change', () => {
  if (switchInput.checked) {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
    lightIcon.style.display = 'flex';
    darkIcon.style.display = 'none';
    saveThemePreference('dark');
  } else {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
    darkIcon.style.display = 'flex';
    lightIcon.style.display = 'none';
    saveThemePreference('light');
  }
});
