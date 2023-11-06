Feature('Costumer Review');

Scenario('See a Costumer Review', ({ I }) => {
  I.amOnPage('/#/home');

  I.seeElement('#rest-name');
  I.click(locate('#rest-name').first());

  I.seeElement('#rev');
  I.seeElement('#reviews-container');
  I.scrollTo('#reviews-container');
});
