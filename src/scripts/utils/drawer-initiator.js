const DrawerInitiator = {
  init({ button, navbarList }) {
    button.addEventListener('click', (event) => {
      this._toggleDrawer(event, navbarList);
    });

    document.addEventListener('click', (e) => {
      if (!button.contains(e.target) && !navbarList.contains(e.target)) {
        this._closeDrawer(e, navbarList);
      }
    });
  },

  _toggleDrawer(event, navbarList) {
    event.stopPropagation();
    navbarList.classList.toggle('active');
  },

  _closeDrawer(event, navbarList) {
    event.stopPropagation();
    navbarList.classList.remove('active');
  },
};

export default DrawerInitiator;
