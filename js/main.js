import { createRandomNumber } from './functions.js';
import { NAMES, DESCRIPTIONS, MESSAGES } from './mocks.js';

const createMessage = (messagesArray) => {
  let messageString = '';
  const messagesAmount = createRandomNumber(1, 2);
  for (let currentMessage = 0; currentMessage < messagesAmount; currentMessage++) {
    messageString += messagesArray[createRandomNumber(0, messagesArray.length - 1)];
    if (currentMessage > 0 && currentMessage !== messagesAmount - 1) {
      messageString += ' ';
    }
  }
  return messageString;
};

const createComment = (id, message, name) => (
  {
    id,
    avatar: `img/avatar-${createRandomNumber(1, 6)}.svg`,
    message,
    name,
  }
);

const createArrayOfComments = (commentsAmount, messagesArray, namesArray) => {
  const arrayOfComments = [];
  for (let currentComment = 0; currentComment < commentsAmount; currentComment++) {
    const id = createRandomNumber(1, 10000);
    const message = createMessage(messagesArray);
    const name = namesArray[createRandomNumber(0, namesArray.length - 1)];
    arrayOfComments.push(createComment(id, message, name));
  }
  return arrayOfComments;
};

const createPhotoCard = (id, description, likes, comments) => (
  {
    id,
    url: `photos/${id}.jpg`,
    description,
    likes,
    comments,
  }
);

const createArrayOfPhotoCards = (photoCardsAmount, messagesArray, namesArray, descriptionsArray) => {
  const arrayOfPhotoCards = [];
  for (let currentPhotoCard = 0; currentPhotoCard < photoCardsAmount; currentPhotoCard++) {
    const description = descriptionsArray[createRandomNumber(0, descriptionsArray.length - 1)];
    const likes = createRandomNumber(15, 200);
    const commentsAmount = createRandomNumber(0, 30);
    const comments = createArrayOfComments(commentsAmount, messagesArray, namesArray);
    arrayOfPhotoCards.push(createPhotoCard(currentPhotoCard, description, likes, comments));
  }
  return arrayOfPhotoCards;
};
createArrayOfPhotoCards(25, MESSAGES, NAMES, DESCRIPTIONS);
