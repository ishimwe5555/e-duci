/**
 *@swagger
 * /notifications/all:
 *   get:
 *     summary: getting all notification of a user
 *     tags:
 *         - Notifications
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Notifications for user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 product:
 *                   type: object
 *       '401':
 *         description: Please login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 * */
