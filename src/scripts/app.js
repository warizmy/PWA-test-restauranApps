import routes from './routes/routes';
import UrlParser from './routes/url-parser';
import DrawerInitiator from './utils/drawer-initiator';

class Main {
  constructor({
    button, navbarList, content, loadingCircle,
  }) {
    this._button = button;
    this._navbarList = navbarList;
    this._content = content;
    this._loading = loadingCircle;

    this.InitialAppShell();
  }

  InitialAppShell() {
    DrawerInitiator.init({
      button: this._button,
      navbarList: this._navbarList,
    });
  }

  loadingProgress() {
    this._loading.style.display = 'none';
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const Page = routes[url];

    if (Page) {
      const page = new Page();
      this._content.innerHTML = '';
      this._content.appendChild(page);
    }
  }
}

export default Main;
