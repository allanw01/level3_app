// Author: Allan Wu

//Importing the expo print and sharing module / library
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

// Function to generate HTML content for the PDF
const createTableHTML = (exportData, score, time) => {
  const totalQuestions = exportData.length; //Finds the total number of the question (for future proofing if I decided to add more questions)
  
  // Map over the data array and generate a table row for each question
  let tableRows = exportData.map(row => {
    return `
      <tr>
        <td>${row[0]}</td> <!-- Questions -->
        <td>${row[1]}</td> <!-- User's Answers -->
        <td>${row[2]}</td> <!-- Correct Answers -->
      </tr>
    `;
  }).join(''); // Join the rows (items) from the array into a single string for the HTML table

  return `
    <html>
      <body>
        <h1>MANA Quiz Results</h1>
        <p>You Score: ${score} out of ${totalQuestions}</p> <!-- Display the user's quiz score -->
        <p>The time you took is: ${time}</p> <!-- Display the time the user took -->
        <table border="1" style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr>
              <th>Question</th>
              <th>Your Answer</th>
              <th>Correct Answer</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows} <!-- Insert the generated rows into the table body -->
          </tbody>
        </table>
      </body>
    </html>
  `;
};

// Function to create and share the PDF when the share or export button is pressed in the finish screen
export const createAndSharePDF = async (exportData, score, time) => {
  const htmlContent = createTableHTML(exportData, score,time); // Call createTableHTML (function found above) to generate the HTML content for the PDF

  try {
    // Generate the PDF file using the expo print api
    const file = await Print.printToFileAsync({
      html: htmlContent, //Converts the HTML to the pdf format
      base64: false,
    });

    // Share the PDF file
    await Sharing.shareAsync(file.uri); // Share the generated PDF file using the Sharing API
  } catch (error) {
    //Logs the error that occur during the pdf generation process
    console.error('Error generating or sharing PDF:', error);
  }
};