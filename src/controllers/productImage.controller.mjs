import { productsServices } from '../services/index.mjs';

const updtImages = async (req, res) => {
  const { id } = req.params;
  const img = req.files;
  const imgId = req.imagesToDelete;
  let images = req.productImages;
  let url = [];
  let newAddedImages = [];

  if (!imgId && (!img || img.length === 0)) {
    return res
      .status(400)
      .json({ code: 400, message: 'No update changes made' });
  }

  if (imgId) {
    if (imgId.length > 0) {
      const sizes = images.length + img.length - imgId.length;
      if (sizes < 4 || sizes > 8) {
        console.log('here');
        return res.status(401).json({
          code: '401',
          message: 'failed',
          error: 'product images must be in Range of 4 to 8',
        });
      }
      if (imgId.length > 1) {
        const deleteImages = imgId.map(async (idi) => {
          const { data } = await productsServices.deleteImage(idi);
          return data;
        });
        await Promise.all(deleteImages);

        imgId.forEach(async (idi) => {
          images = await productsServices.removeUrlFromImages(images, idi);
        });
      } else {
        await productsServices.deleteImage(imgId[0]);
      }
    }
  }

  if (img.length >= 1) {
    const fileSize = img.length + images.length - (imgId || []).length;
    if (fileSize < 4 || fileSize > 8) {
      return res.status(401).json({
        code: '401',
        message: 'fail',
        error: 'product images must be in Range of 4 to 8',
      });
    }
    const promises = img.map(async (file) => {
      const { image } = await productsServices.uploadImage(file.path);
      return image.url;
    });
    url = await Promise.all(promises);
  }

  if (img.length >= 1 || imgId.length > 0) {
    if (img.length >= 1) {
      const imageAdd = url.map(async (item) => {
        const imageBody = { url: item, productId: id };
        const { data } = await productsServices.AddImage(imageBody);
        return data;
      });
      newAddedImages = await Promise.all(imageAdd);
    }
    res.status(200).json({
      code: '200',
      message: 'Successful Updated The Product images',
      updatedImages: newAddedImages,
    });
  }
};

export default { updtImages };
