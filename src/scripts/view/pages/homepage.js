import RestaurantDB from '../../data/restaurant-source';
import CONFIG from '../../global/config';

class RestaurantContent extends HTMLElement {
  constructor() {
    super();
    this.startIndex = 4; // Track the starting index of displayed cards
    this.cardsPerPage = 8; // Number of cards to display per "Load More" click
  }

  connectedCallback() {
    this.loadData();
  }

  async loadData() {
    try {
      const restaurants = await RestaurantDB.listRestaurant();
      this.processData(restaurants);
    } catch (error) {
      console.error('Error loading restaurant data:', error);
    }
  }

  processData(restaurants) {
    const titleElement = document.querySelector('title');
    titleElement.textContent = 'Foodies - Explore Restaurant';

    // -------------- Hero Section Start --------------
    const sectionHero = document.createElement('section');
    sectionHero.setAttribute('class', 'hero');
    sectionHero.id = 'home';

    const heroContent = document.createElement('div');
    heroContent.setAttribute('class', 'hero-content');

    const pictureHeader = document.createElement('picture');

    const sourceHeader = document.createElement('source');
    sourceHeader.media = '(max-width: 600px)';
    sourceHeader.srcset = './images/hero-image_2-small.jpg';

    const imageHeader = document.createElement('img');
    imageHeader.src = './images/hero-image_2-large.jpg';
    imageHeader.setAttribute('alt', 'image-hedaer');
    imageHeader.setAttribute('id', 'hero-image');

    const headerText = document.createElement('p');
    headerText.innerHTML = '<span>food</span>ies';
    headerText.setAttribute('id', 'header-text');

    const headerText2 = document.createElement('p');
    headerText2.innerHTML = 'Have a look for some best<span> Restaurant';

    const buttonCta = document.createElement('button');
    buttonCta.setAttribute('id', 'cta');
    buttonCta.innerHTML = `<svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 448 512"
    >
      <style>
        svg {
          fill: #ffffff;
        }
      </style>
      <path
        d="M416 0C400 0 288 32 288 176V288c0 35.3 28.7 64 64 64h32V480c0 17.7 14.3 32 32 32s32-14.3 32-32V352 240 32c0-17.7-14.3-32-32-32zM64 16C64 7.8 57.9 1 49.7 .1S34.2 4.6 32.4 12.5L2.1 148.8C.7 155.1 0 161.5 0 167.9c0 45.9 35.1 83.6 80 87.7V480c0 17.7 14.3 32 32 32s32-14.3 32-32V255.6c44.9-4.1 80-41.8 80-87.7c0-6.4-.7-12.8-2.1-19.1L191.6 12.5c-1.8-8-9.3-13.3-17.4-12.4S160 7.8 160 16V150.2c0 5.4-4.4 9.8-9.8 9.8c-5.1 0-9.3-3.9-9.8-9L127.9 14.6C127.2 6.3 120.3 0 112 0s-15.2 6.3-15.9 14.6L83.7 151c-.5 5.1-4.7-9-9.8 9c-5.4 0-9.8-4.4-9.8-9.8V16zm48.3 152l-.3 0-.3 0 .3-.7 .3 .7z"
      />
    </svg>
    Explore Now`;

    pictureHeader.appendChild(sourceHeader);
    pictureHeader.appendChild(imageHeader);

    heroContent.appendChild(headerText);
    heroContent.appendChild(headerText2);
    heroContent.appendChild(buttonCta);
    sectionHero.appendChild(pictureHeader);
    sectionHero.appendChild(heroContent);

    this.appendChild(sectionHero);
    // -------------- Hero Section Ends --------------

    // -------------- Cards Section Start --------------
    const sectionContainer = document.createElement('section');
    sectionContainer.setAttribute('class', 'container-content');

    const sectionConHeader = document.createElement('h1');
    sectionConHeader.innerHTML = 'Find Your<span> Restaurant</span>';

    const line = document.createElement('hr');
    line.setAttribute('id', 'line-tag');

    sectionContainer.appendChild(sectionConHeader);
    sectionContainer.appendChild(line);
    this.appendChild(sectionContainer);

    const insideContent = document.createElement('div');
    insideContent.classList.add('inside-content');
    insideContent.setAttribute('id', 'inside-content');

    this.loadMoreButton = document.createElement('button');
    this.loadMoreButton.textContent = 'More';
    this.loadMoreButton.setAttribute('id', 'load-more');

    this.loadMoreButton.addEventListener('click', this.loadMore.bind(this));

    // cards
    restaurants.forEach((restaurant, index) => {
      const image = `${CONFIG.IMAGE_URL}${restaurant.pictureId}`;

      const itemContent = document.createElement('a');
      itemContent.classList.add('item-content');
      itemContent.setAttribute('href', `#/detail/${restaurant.id}`);

      const img = document.createElement('img');
      img.src = image;
      img.setAttribute('alt', 'item-image');
      img.setAttribute('data-src', image);
      img.classList.add('lazyload');

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

      // Hide cards that should not be displayed initially
      if (index >= this.cardsPerPage) {
        itemContent.style.display = 'none';
      }
      insideContent.appendChild(itemContent);
    });

    // If there are more cards, display the "Load More" button
    if (restaurants.length > this.cardsPerPage) {
      insideContent.appendChild(this.loadMoreButton);
    }

    sectionContainer.appendChild(insideContent);
    // -------------- Cards Section Ends --------------

    // -------------- Contact Us Section Start --------------
    const sectionContactUs = document.createElement('section');
    sectionContactUs.setAttribute('id', 'contact-us');

    const headerContactUs = document.createElement('p');
    headerContactUs.setAttribute('id', 'hd-contact-us');
    headerContactUs.innerHTML = 'Contact<span> Us</span>';

    const contentContactUs = document.createElement('div');
    contentContactUs.classList.add('content');

    sectionContactUs.appendChild(headerContactUs);
    sectionContactUs.appendChild(contentContactUs);

    const iframePanel = document.createElement('iframe');
    iframePanel.setAttribute('src', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.1197620225585!2d116.08437717595437!3d-8.584482491460252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dcdc10f89b8df1d%3A0x4ae9795903b0be42!2snamnam.coffee!5e0!3m2!1sid!2sid!4v1692794646048!5m2!1sid!2sid');
    iframePanel.setAttribute('allowfullscreen', ' ');
    iframePanel.classList.add('lazyload');
    iframePanel.setAttribute('class', 'map');
    iframePanel.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');

    contentContactUs.appendChild(iframePanel);

    const formPanel = document.createElement('form');
    formPanel.innerHTML = `<div class="input-group">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="#fff"
      stroke="#000"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="feather feather-user"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
    <input type="text" placeholder="Name" id="name-user" />
  </div>
  <div class="input-group" style="color: #fff">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="#ffff"
      stroke="#000"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="feather feather-mail"
    >
      <path
        d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
      ></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
    <input type="text" placeholder="E-Mail" id="e-mail" />
  </div>
  <div class="input-textarea">
    <textarea
      name="pesan"
      id="mytext"
      cols="30"
      rows="10"
      placeholder="Type your message..."
    ></textarea>
  </div>
  <p id="numberOftextlimit" style="color: #fff"></p>
  <button type="submit" id="btn">Send Message!</button>`;

    contentContactUs.appendChild(formPanel);
    this.appendChild(sectionContactUs);
    // -------------- Contact Us Section ends --------------

    const inputText = document.querySelector('.input-textarea');

    inputText.addEventListener('click', async () => {
      const additionalFunctionality = await import('../additionalFunctionality');
      additionalFunctionality.initMessageCount();
    });

    buttonCta.addEventListener('click', async () => {
      const additionalFunctionality = await import('../additionalFunctionality');
      additionalFunctionality.buttonInteractive();
    });
  }

  loadMore() {
    const displayedCards = Array.from(
      this.getElementsByClassName('item-content'),
    );

    for (let i = this.startIndex; i < this.startIndex + this.cardsPerPage; i++) {
      if (i < displayedCards.length) {
        displayedCards[i].style.display = 'block';
      }
    }

    this.startIndex += this.cardsPerPage;

    // Hide the "Load More" button if there are no more cards to display
    if (this.startIndex >= displayedCards.length) {
      this.loadMoreButton.style.display = 'none';
    }
  }
}

customElements.define('restaurant-content', RestaurantContent);

export default RestaurantContent;
