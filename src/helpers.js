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

export {
  shuffleArray,
  getRandomString,
  classNames,
  setDocumentTitle,
  getCardsToLearn,
  getCardsToReview
};