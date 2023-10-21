/**
 * @swagger
 * /notifications/read:
 *  post:
 *    tags:
 *      - Notifications
 *    summary: Marks all notifications as read
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: All notifications marked as read.
 *      500:
 *        description: Internal server error
 */

/**
 * @swagger
 * /notifications/{notificationId}/read:
 *  post:
 *     summary: Marks one notification as read
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters :
 *      - in: path
 *        name: notificationId
 *        schema:
 *          type: string
 *        required: true
 *        description : notification Id
 *     responses:
 *       200:
 *         description: Added buyer's shipping address
 *       500:
 *         description: Internal server error
 */
