// Author: Allan Wu

//Function that gets a random set of questions for the quiz
//It gets a new set of random question when the user wants to play the same quiz again. 
const getRandomQuestions = (arr, num) => {
  // Shuffle the array
  const shuffled = arr.sort(() => 0.5 - Math.random());
  // Get sub-array of first n elements after shuffle
  return shuffled.slice(0, num);
};

export default getRandomQuestions;