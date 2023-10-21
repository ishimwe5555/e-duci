import { reviewsServices } from '../services';

const getReviews = (req, res) => {
  const productId = req.params.pid;
  reviewsServices.getReviews(productId).then((data) =>
    res.status(200).json({
      code: 200,
      message: 'Reviews Fetched.',
      data,
    })
  );
};

const addReview = (req, res) => {
  const reviewObj = {
    productId: req.params.pid,
    userId: req.user.id,
    feedback: req.body.feedback,
    rating: req.body.rating,
  };
  reviewsServices.addReview(reviewObj).then((data) => {
    res.status(201).json({
      code: 201,
      message: 'Review Added.',
      data,
    });
  });
};

const removeReview = async (req, res) => {
  const isRemoved = await reviewsServices.removeReviewAsUser(
    req.user.id,
    req.params.rid
  );
  if (isRemoved) {
    return res.status(200).json({
      code: 200,
      message: 'Review was removed',
    });
  }
  return res.status(400).json({
    code: 400,
    message: 'Review was not removed',
  });
};

const averageRating = (req, res) => {
  reviewsServices.getAverageRating(req.params.pid).then((rating) =>
    res.status(200).json({
      code: 200,
      message: 'Average Rating',
      rating,
    })
  );
};

export default { getReviews, addReview, removeReview, averageRating };
