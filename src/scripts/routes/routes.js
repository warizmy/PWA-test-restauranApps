import DetailRestaurant from '../view/pages/detail-restaurant';
import Favorite from '../view/pages/favorite';
import RestaurantContent from '../view/pages/homepage-RestaurantContent';

const routes = {
  '/home': RestaurantContent, // default page
  '/detail/:id': DetailRestaurant,
  '/favorite': Favorite,
};

export default routes;
