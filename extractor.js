function extractToObject(inputString) {
  const categories = inputString.split(';');
  const extractedObjects = [];

  categories.forEach((categoryString) => {
    const splitResult = categoryString.split('///');
    try {
      const [category, subcategory, subsubcategory] = splitResult;
      const extractedObject = {
        category: category.trim(),
        subcategory: subcategory ? subcategory.trim() : '',
        subsubcategory: subsubcategory ? subsubcategory.trim() : '',
      };
      extractedObjects.push(extractedObject);
    } catch (error) {
      console.log(error);
    }
  });
  return extractedObjects;
}
