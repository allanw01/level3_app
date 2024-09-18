import React from "react";
import { View,Text, StyleSheet, Touchable, TouchableOpacity, Image } from "react-native";

// import * as Print from 'expo-print';
// import * as Sharing from 'expo-sharing';

// const ExportPDF = ({ data, score}) => {

//   const createTableHTML = (data, score) => {
//     const totalQuestions = data.length;

//     let tableRows = data.map(row => {
//       return `
//         <tr>
//           <td>${row[0]}</td>
//           <td>${row[1]}</td>
//           <td>${row[2]}</td>
//         </tr>
//       `;
//     }).join('');

//     return `
//       <html>
//         <body>
//           <h1>Quiz Results</h1>
//           <p>Your Score: ${score} out of ${totalQuestions}</p>
//           <table border="1" style="width: 100%; border-collapse: collapse;">
//             <thead>
//               <tr>
//                 <th>Question</th>
//                 <th>Your's Answer</th>
//                 <th>Correct Answer</th>
//               </tr>
//             </thead>
//             <tbody>
//               ${tableRows}
//             </tbody>
//           </table>
//         </body>
//       </html>
//     `;
//   };

//   const createAndSharePDF = async () => {
//     const htmlContent = createTableHTML(data, score);

//     try {
//       const { uri } = await Print.printToFileAsync({
//         html: htmlContent,
//         base64: false,
//       });

//       await Sharing.shareAsync(uri);
//     } catch (error) {
//       console.error('Error generating or sharing PDF:', error);
//     }
//   };

//   return (
//     null
//   )
// }

// export default ExportPDF;


import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

// Function to generate HTML content for the PDF
const createTableHTML = (exportData, score, time) => {
  const totalQuestions = exportData.length;
  console.log(time)
  let tableRows = exportData.map(row => {
    return `
      <tr>
        <td>${row[0]}</td>
        <td>${row[1]}</td>
        <td>${row[2]}</td>
      </tr>
    `;
  }).join('');

  return `
    <html>
      <body>
        <h1>MANA Quiz Results</h1>
        <p>You Score: ${score} out of ${totalQuestions}</p>
        <p>The time you took is: ${time}</p>
        <table border="1" style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr>
              <th>Question</th>
              <th>Your Answer</th>
              <th>Correct Answer</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
      </body>
    </html>
  `;
};

// Function to create and share the PDF
export const createAndSharePDF = async (exportData, score, time) => {
  const htmlContent = createTableHTML(exportData, score,time);

  try {
    // Generate the PDF file
    const file = await Print.printToFileAsync({
      html: htmlContent,
      base64: false,
    });

    // Share the PDF file
    await Sharing.shareAsync(file.uri);
  } catch (error) {
    console.error('Error generating or sharing PDF:', error);
  }
};