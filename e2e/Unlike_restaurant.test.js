Feature('Unlike restaurant');

Scenario('unliking a previously liked item', ({ I }) => {
  I.amOnPage('/#/home');

  I.seeElement('#rest-name');
  I.click(locate('#rest-name').first());

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.inside-content');

  I.click(locate('#rest-name').last()); // Choose item that already liked before
  I.seeElement('#likeButton');
  I.click('#likeButton'); // Unlike the item

  I.amOnPage('/#/favorite');
  I.see('It looks like you dont have any favorite restaurant! Go Back', '.not-found-container');
});
