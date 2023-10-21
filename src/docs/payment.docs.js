/**
 *
 * @swagger
 * /checkout/payment/{orderId}:
 *   post:
 *     summary: Make a payment for an order
 *     description: Endpoint to create a payment for an order
 *     tags:
 *       - Payments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         description: The ID of the order
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *           schema:
 *             type: object
 *           example:
 *             cardNumber: '4242424242424242'
 *             expMonth: '12'
 *             expYear: '2050'
 *             cvc: '123'
 *     responses:
 *       '200':
 *         description: Payment succedded
 *       '401':
 *         description: Additional action required
 *       '500':
 *         description: Payment failed
 */
