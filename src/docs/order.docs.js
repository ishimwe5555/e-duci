/**
 * @swagger
 * /orders:
 *   get:
 *    tags:
 *      - Orders
 *    summary: User should retrieve all orders of a user
 *    security:
 *      - bearerAuth: []
 *    description: Gets the order details and status based on ID.
 *    responses:
 *      '200':
 *        description: Order Fetched.
 *      '500':
 *        description: Internal Error.
 * /orders/{orderId}:
 *   get:
 *     summary: User should retrieve order status from the database
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         description: id of the order to be updated
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Order has successfully been updated
 *       '400':
 *         description: Failed to update the order
 *   patch:
 *     summary: Updating order status
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         description: id of the order to be updated
 *         schema:
 *           type: string
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *          example:
 *            status: 'succeeded'
 *     responses:
 *       '200':
 *         description: Order has successfully been updated
 *       '400':
 *         description: Failed to update the order
 */
