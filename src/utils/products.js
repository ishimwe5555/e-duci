import csv from 'csvtojson';

async function convertCSVtoJSON(filePath) {
  try {
    const jsonArray = await csv().fromFile(filePath.path);
    return jsonArray;
  } catch (error) {
    console.error('Error converting CSV to JSON:', error.message);
    throw new Error('Error converting CSV to JSON');
  }
}

// function performDataTransformations(jsonData) {
//   try {
//     const transformedData = jsonData.map((data) => {
//       // Perform desired transformations, such as trimming values
//       const transformedValue = data.value.trim();
//       return {
//         ...data,
//         transformedValue,
//       };
//     });

//     return transformedData;
//   } catch (error) {
//     throw new Error('Error performing data transformations');
//   }
// }

// function decomposeString(input) {
//   const [category, subcategory, subsubcategory] = input
//     .split('///')
//     .map((item) => item.trim());

//   return {
//     category,
//     subcategory,
//     subsubcategory,
//   };
// }

// module.exports = { performDataTransformations };

export default convertCSVtoJSON;
