const messageCount = {
  init({ myText, textLimit }) {
    const limit = 300;
    textLimit.textContent = `0/${limit}`;

    myText.addEventListener('input', () => {
      const textLength = myText.value.length;
      textLimit.textContent = `${textLength}/${limit}`;

      if (textLength > limit) {
        myText.style.border = '1px solid #FF0000';
        textLimit.style.color = '#FF0000';
      } else {
        myText.style.border = '1px solid #ffff';
        textLimit.style.color = '#ffff';
      }
    });
  },
};

export default messageCount;
