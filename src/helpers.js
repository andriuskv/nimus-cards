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

function classNames(...classNames) {
  return classNames.join(" ");
}

function setDocumentTitle(title) {
  document.title = `${title} | NimusCards`;
}

function getCardsToLearn(cards) {
  return cards.filter(card => !card.nextReview);
}

function getCardsToReview(cards) {
  return cards.filter(card => new Date() > new Date(card.nextReview));
}

function getSeconds(time) {
  const seconds = time % 60;

  return seconds < 10 ? `0${seconds}` : seconds;
}

function getMinutes(time) {
  const minutes = Math.floor(time / 60 % 60);

  return time >= 3600 && minutes < 10 ? `0${minutes}` : minutes;
}

function getHours(time) {
  return Math.floor(time / 3600);
}

function formatTime(time) {
  const seconds = getSeconds(time);
  const minutes = getMinutes(time);
  const hours = getHours(time);

  return `${hours ? `${hours}:` : ""}${minutes}:${seconds}`;
}

export {
  shuffleArray,
  getRandomString,
  classNames,
  setDocumentTitle,
  getCardsToLearn,
  getCardsToReview,
  formatTime
};
