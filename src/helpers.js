function shuffleArray(array) {
  const arrayCopy = [].concat(array);
  let index = arrayCopy.length;

  while (index) {
    const randomIndex = Math.floor(Math.random() * index);

    index -= 1;
    [arrayCopy[index], arrayCopy[randomIndex]] = [arrayCopy[randomIndex], arrayCopy[index]];
  }
  return arrayCopy;
}

function getRandomString() {
  return Math.random().toString(32).slice(2, 10);
}

export {
  shuffleArray,
  getRandomString
};
