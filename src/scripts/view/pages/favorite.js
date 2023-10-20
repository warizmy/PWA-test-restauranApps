import FavoriteRestaurantIdb from '../../data/restaurant-idb';
import CONFIG from '../../global/config';

class Favorite extends HTMLElement {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  connectedCallback() {
    this.loadData();
  }

  async loadData() {
    try {
      const restaurant = await FavoriteRestaurantIdb.getAllRestaurant();
      this.processData(restaurant);
    } catch (error) {
      console.error('Error loading restaurant data:', error);
    }
  }

  processData(restaurants) {
    const titleElement = document.querySelector('title');
    titleElement.textContent = 'Favorite - Foodies';

    const sectionContainer = document.createElement('section');
    sectionContainer.setAttribute('class', 'container-content');

    const sectionConHeader = document.createElement('h1');
    sectionConHeader.innerHTML = 'Your <span>Favorite</span> Restaurant';

    const notFoundImg = document.createElement('img');
    notFoundImg.src = './images/not-found.jpg';
    notFoundImg.setAttribute('id', 'not-found-img');
    notFoundImg.setAttribute('alt', 'not-found-img');

    const sectionNotFound = document.createElement('div');
    sectionNotFound.classList.add('not-found-container');

    const descNotFound = document.createElement('p');
    descNotFound.innerHTML = 'It looks like you dont have any favorite restaurant!';

    const goBackBtn = document.createElement('button');
    goBackBtn.textContent = 'Go Back';
    goBackBtn.setAttribute('id', 'goBackBtn');

    goBackBtn.addEventListener('click', () => {
      window.history.back();
    });

    const line = document.createElement('hr');
    line.setAttribute('id', 'line-tag');

    sectionContainer.appendChild(sectionConHeader);
    sectionContainer.appendChild(line);
    this.appendChild(sectionContainer);

    const insideContent = document.createElement('div');
    insideContent.classList.add('inside-content');
    insideContent.setAttribute('id', 'inside-content');

    if (restaurants.length === 0) {
      sectionConHeader.textContent = 'Oops!';
      sectionConHeader.style.fontWeight = 600;
      line.remove();
      sectionContainer.appendChild(notFoundImg);
      sectionContainer.appendChild(sectionNotFound);
      sectionNotFound.appendChild(descNotFound);
      sectionNotFound.appendChild(goBackBtn);
    } else {
      restaurants.forEach((restaurant) => {
        const image = `${CONFIG.IMAGE_URL}${restaurant.pictureId}`;

        const itemContent = document.createElement('div');
        itemContent.classList.add('item-content');

        const img = document.createElement('img');
        img.src = image;
        img.setAttribute('alt', 'item-image');

        const itemDescription = document.createElement('div');
        itemDescription.classList.add('item-description');

        const loc = document.createElement('p');
        loc.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg> ${restaurant.city}`;
        loc.setAttribute('id', 'loc');

        const ratingRes = document.createElement('div');
        ratingRes.classList.add('rating-class');

        const rating = document.createElement('p');
        rating.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
        <span>${restaurant.rating}</span>`;
        rating.setAttribute('id', 'rate');

        const line = document.createElement('hr');
        line.setAttribute('id', 'line-tag');

        const restName = document.createElement('a');
        restName.innerHTML = `-${restaurant.name}`;
        restName.setAttribute('id', 'rest-name');
        restName.setAttribute('href', `/#/detail/${restaurant.id}`);

        const desc = document.createElement('p');
        desc.textContent = restaurant.description;
        desc.setAttribute('id', 'desc');

        ratingRes.appendChild(rating);
        itemDescription.appendChild(loc);
        itemDescription.appendChild(ratingRes);
        itemDescription.appendChild(line);
        itemDescription.appendChild(restName);
        itemDescription.appendChild(desc);

        itemContent.appendChild(img);
        itemContent.appendChild(itemDescription);

        insideContent.appendChild(itemContent);
      });
    }

    sectionContainer.appendChild(insideContent);
  }
}

customElements.define('favorite-restaurant', Favorite);
export default Favorite;
