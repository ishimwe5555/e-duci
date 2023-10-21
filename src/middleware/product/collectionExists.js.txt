import { collectionServices } from '../../services';

const isCollectionExists = async (req, res, next) => {
  const isCollection = await collectionServices.getCollectionByName(
    req.body.name
  );
  if (isCollection) {
    return res
      .status(409)
      .json({ code: 409, message: 'Collection Already Exists.' });
  }
  return next();
};

const isValidCollection = async (req, res, next) => {
  const isCollection = await collectionServices.getCollectionByIdAndUserId(
    req.params.cid,
    req.user.id
  );
  if (!isCollection) {
    return res
      .status(404)
      .json({ code: 404, message: 'Collection Does not Exists.' });
  }
  return next();
};

export { isCollectionExists, isValidCollection };
