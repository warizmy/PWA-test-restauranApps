import '../styles/main.css';
import Main from './app';
import swRegister from './utils/sw-register';

const app = new Main({
  button: document.getElementById('hamburger-menu'),
  navbarList: document.querySelector('.navbar .navbar-nav .list'),
  content: document.querySelector('#main-content'),
  loadingCircle: document.querySelector('#loading-circle'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
  window.scrollTo(0, 0);
});

window.addEventListener('load', async () => {
  app.loadingProgress();
  app.renderPage();
  swRegister();
});
