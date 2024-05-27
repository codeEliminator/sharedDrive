const wordToNumber = {
  "ноль": 0,
  "один": 1,
  "два": 2,
  "три": 3,
  "четыре": 4,
  "пять": 5,
  "шесть": 6,
  "семь": 7,
  "восемь": 8,
  "девять": 9,
  "десять": 10
};

const convertWordToNumber = (word) => {
  console.log(word)
  console.log(wordToNumber[word.toLowerCase()])
  return wordToNumber[word.toLowerCase()] || null;
};

export default convertWordToNumber
