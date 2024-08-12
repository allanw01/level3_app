const SaveUserData = (userScore, userTime, file) => {

    const fs = require('fs');
  
    const getCurrentDate=()=>{
      var date = new Date().getDate();
      var month = new Date().getMonth() + 1;
      var year = new Date().getFullYear();
      return date + '-' + month + '-' + year;//format: d-m-y;
    };
  
    // Function to read existing scores from the file
    const readScores = (filePath) => {
      try {
        const data = fs.readFileSync(filePath, 'utf8');
        if (!data.trim()) {
          return []; // File is empty, return empty array
        }
        const scores = data.trim().split('\n\n').map(entry => {
          const lines = entry.split('\n');
          if (lines.length !== 3) {
            return null; // Invalid entry format
          }
          const score = parseInt(lines[0].split(': ')[1]);
          const date = lines[1].split(': ')[1];
          const time = lines[2].split(': ')[1];
          return { score, date, time };
        }).filter(entry => entry !== null);
        return scores;
      } catch (err) {
        if (err.code === 'ENOENT') {
          return []; // File doesn't exist yet, return empty array
        } else {
          throw err;
        }
      }
    };
  
    // Function to write scores to the file
  const writeScores = (filePath, scores) => {
    const data = scores.map(({ score, date, time }) => `Score: ${score}\nDate: ${date}\nTime: ${time}`).join('\n\n') + '\n\n';
    fs.writeFileSync(filePath, data, 'utf8');
  };
  
  // Function to get only the values of scores, dates, and times
  const getScoreValues = (scores) => {
    return scores.map(({ score, date, time }) => ({ score, date, time }));
  };
  
  // New score to add with separate date and time
  const newScore = { score: userScore, date: getCurrentDate(), time: userTime };
  
  const filePath = file;
  
  // Read existing scores
  const existingScores = readScores(filePath);
  
  // Display existing score values
  // const existingValues = getScoreValues(existingScores);
  // console.log('Existing score values:');
  // console.log(existingValues);
  
  // Add the new score
  existingScores.push(newScore);
  
  // Write updated scores back to the file
  writeScores(filePath, existingScores);
  
  // Read and display updated score values
  const updatedScores = readScores(filePath);
  const updatedValues = getScoreValues(updatedScores);
  // console.log('Updated score values:');
  // console.log(updatedValues);
  
  
    return(
      updatedValues
    )
  };

  export default SaveUserData;