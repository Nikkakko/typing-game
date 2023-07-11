import wordList from './wordList';

const availableWords = [...wordList];

function getWord() {
  const index = Math.floor(Math.random() * availableWords.length);
  return availableWords.splice(index, 1);
}

export default function generateText() {
  return new Array(25)
    .fill('')
    .map(() => getWord())
    .join(' ');
}
