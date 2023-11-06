import FavoriteRestaurantIdb from '../../data/restaurant-Idb';
import RestaurantDB from '../../data/restaurant-source';
import CONFIG from '../../global/config';
import UrlParser from '../../routes/url-parser';
import LikeButtonInitiator from '../../utils/like-button-initiator';

class DetailRestaurant extends HTMLElement {
  connectedCallback() {
    this.loadData();
  }

  async loadData() {
    try {
      const parsedUrl = UrlParser.parseActiveUrlWithoutCombiner();
      const restaurantId = parsedUrl.id;

      if (!restaurantId) {
        console.error('Restaurant ID not found in the URL');
        return;
      }
      const response = await RestaurantDB.detailRestaurant(restaurantId);
      console.log('API Response:', response);

      if (response && response.error === false && response.restaurant) {
        const { restaurant } = response;
        this.processData(restaurant);
      } else {
        console.error('Invalid or missing data in the API response');
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }

  processData(restaurant) {
    const image = `${CONFIG.IMAGE_URL}${restaurant.pictureId}`;
    const titleElement = document.querySelector('title');
    titleElement.textContent = `${restaurant.name} - Foodies`;

    this.innerHTML = `
    <div class = 'detail-container'>
       <h1>Detail<span> Restaurant</span></h1>
        <div class='details'>
              <img src='${image}' alt = 'image-detail-restaurant'>
           <div class="restaurant">
              <h2 id='name'>
                  ${restaurant.name} - <span> <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
                  ${restaurant.rating}</span>
              </h2>
              <p id='loc'><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg> 
              ${restaurant.address}, ${restaurant.city}</p>
              <p id = 'categ'><strong>Categories :</strong> ${restaurant.categories.map((category) => category.name).join(', ')}</p>
              <p id='desc'>"${restaurant.description}"</p>
              <p id = 'foodMenu'><strong>Food Menu :</strong> ${restaurant.menus.foods.map((food) => food.name).join(', ')}</p>
              <p id = 'drinkMenu'><strong>Drink Menu :</strong> ${restaurant.menus.drinks.map((drink) => drink.name).join(', ')}</p>
           </div>
        </div>   

        <h2 id = 'rev'>Reviews</h2>
          <div id="reviews-container">
            ${restaurant.customerReviews.map((review) => `
              <div class="review">
                <p id = 'rev-name'>${review.name}</p>
                <p id = 'rev-txt'>"${review.review}"</p>
                <p id = 'rev-date'>${review.date}</p>
              </div>
            `).join('')}
          </div>       
    </div>

    <div id="likeButtonContainer"></div>
     `;
    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteRestaurant: FavoriteRestaurantIdb,
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        pictureId: restaurant.pictureId,
        city: restaurant.city,
        rating: restaurant.rating,
        description: restaurant.description,
      },
    });
  }
}

customElements.define('detail-restaurant', DetailRestaurant);

export default DetailRestaurant;
