/**
 * @swagger
 * /reviews/rating/{pid}:
 *   get:
 *     summary: Get average product rating
 *     parameters :
 *       - in: path
 *         name: pid
 *         schema:
 *           type: string
 *         required: true
 *         description : object id of product
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: Reviews Fetched.
 * /reviews/{pid}:
 *   get:
 *     summary: Get product reviews
 *     parameters :
 *       - in: path
 *         name: pid
 *         schema:
 *           type: string
 *         required: true
 *         description : object id of product
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: Reviews Fetched.
 *   post:
 *     summary: add product review on specific product
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *           example:
 *             feedback: 'Example review'
 *             rating: 5
 *     parameters :
 *       - in: path
 *         name: pid
 *         schema:
 *           type: string
 *         required: true
 *         description : object id of product
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Reviews Fetched.
 * /reviews/{rid}:
 *   delete:
 *     summary: Deletes product review on specific product by user
 *     parameters :
 *       - in: path
 *         name: rid
 *         schema:
 *           type: string
 *         required: true
 *         description : object id of review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Reviews Deleted.
 */
