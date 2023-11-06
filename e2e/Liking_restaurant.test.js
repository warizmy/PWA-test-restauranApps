Feature('Liking restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});
Scenario('showing empty liked items', ({ I }) => {
  I.seeElement('.container-content');
  I.see('It looks like you dont have any favorite restaurant! Go Back', '.not-found-container');
});

Scenario('liking one item', ({ I }) => {
  I.see('It looks like you dont have any favorite restaurant! Go Back', '.not-found-container');
  I.amOnPage('/#/home');

  I.seeElement('#rest-name');
  I.click(locate('#rest-name').first());

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.inside-content');
});
