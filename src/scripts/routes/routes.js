import DetailRestaurant from '../view/pages/detail';
import Favorite from '../view/pages/favorite';
import RestaurantContent from '../view/pages/homepage';

const routes = {
  '/home': RestaurantContent, // default page
  '/detail/:id': DetailRestaurant,
  '/favorite': Favorite,
};

export default routes;
