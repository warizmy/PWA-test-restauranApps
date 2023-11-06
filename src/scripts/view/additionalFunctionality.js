import messageCount from '../utils/message-count';

const initMessageCount = () => {
  const myText = document.getElementById('mytext');
  const textLimit = document.getElementById('numberOftextlimit');

  if (myText && textLimit) {
    messageCount.init({ myText, textLimit });
  } else {
    console.error('Elements with ID mytext or numberOftextlimit not found.');
  }
};

const buttonInteractive = () => {
  const insideContent = document.querySelector('.container-content');
  if (insideContent) {
    insideContent.scrollIntoView({ behavior: 'smooth' });
  }
};

// eslint-disable-next-line import/prefer-default-export
export { initMessageCount, buttonInteractive };
