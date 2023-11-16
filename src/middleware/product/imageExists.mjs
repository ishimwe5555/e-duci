const checkImg = (req, res, next) => {
  const { imageId } = req.body;
  const images = req.prodImages;
  let imagesArray = [];
  let hasNewImages;
  let hasNewImage;

  const url = images.map((item) => item.id);

  if (imageId) {
    if (Array.isArray(imageId)) {
      imagesArray = imageId;
    } else {
      imagesArray.push(imageId);
    }

    if (imagesArray.length > 1) {
      hasNewImages = imagesArray.some((data) => !url.includes(data));
    } else {
      hasNewImage = !url.includes(imagesArray[0]);
    }
    if (hasNewImage || hasNewImages) {
      return res
        .status(400)
        .json({ code: 400, message: 'Failed', error: 'Check Your image IDs' });
    }
    req.productImages = url;
    req.imagesToDelete = imagesArray;
    return next();
  }
  req.productImages = url;
  return next();
};
export default checkImg;
