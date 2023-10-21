/**
 * @swagger
 * /products/update/image/{id}:
 *   patch:
 *     summary: update images
 *     parameters :
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description : productId
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                imageId:
 *                 type: string
 *                 description: imageId
 *                image:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: product images
 *     responses:
 *       200:
 *         description: successfully updated images
 *       400:
 *         description: error in while updating images
 */
