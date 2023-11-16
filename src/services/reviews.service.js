import Reviews from '../database/models/reviews.model.mjs';

async function getReviews(productId) {
  const reviews = await Reviews.findAll({ where: { productId } });
  return reviews;
}

async function addReview(data) {
  const addedReview = await Reviews.create(data);
  return addedReview;
}

async function removeReviewAsUser(userId, reviewId) {
  const rmReview = await Reviews.destroy({ where: { id: reviewId, userId } });
  return rmReview;
}

async function getAverageRating(productId) {
  const allReviews = await Reviews.findAll({ where: { productId } });
  let totalRating = 0;
  for (let i = 0; i < allReviews.length; i += 1) {
    const rev = allReviews[i].rating;
    totalRating = parseInt(rev, 10) + totalRating;
  }
  const averageRating = totalRating / allReviews.length;
  return averageRating;
}

export default { getReviews, addReview, removeReviewAsUser, getAverageRating };
