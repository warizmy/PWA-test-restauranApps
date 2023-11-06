/* eslint-disable import/prefer-default-export */
import FavoriteRestaurantIdb from '../src/scripts/data/restaurant-idb';
import LikeButtonInitiator from '../src/scripts/utils/like-button-initiator';

const createLikeButtonPresenterWithRestaurant = async (restaurant) => {
  await LikeButtonInitiator.init({
    likeButtonContainer: document.querySelector('#likeButtonContainer'),
    favoriteRestaurant: FavoriteRestaurantIdb,
    restaurant,
  });
};

export { createLikeButtonPresenterWithRestaurant };
