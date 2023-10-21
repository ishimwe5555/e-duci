/**
 * @swagger
 * /cart/{id}:
 *   post:
 *     summary: Adding product on cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id of the product to added
 *         schema:
 *           type: string
 *     responses:
 *       '201':
 *         description: succssefully added Product on cart
 *       '500':
 *         description: Internal Error
 * tags:
 *   name: Cart
 *   description: APIs for managing user carts
 * /cart:
 *   get:
 *     summary: Get the user's cart
 *     description: Returns the contents of the user's cart.
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful operation. Returns the user's cart.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 200
 *                   description: HTTP status code
 *                 message:
 *                   type: string
 *                   example: Cart Fetched
 *                   description: Response message
 *                 data:
 *                   type: object
 *                   description: Cart data
 *                   properties:
 *                     products:
 *                       type: array
 *                       items:
 *                         type: object
 *                         description: Product in cart
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                             description: ID of the product
 *                           name:
 *                             type: string
 *                             example: Product A
 *                             description: Name of the product
 *                           price:
 *                             type: number
 *                             example: 10.99
 *                             description: Price of the product
 *                           quantity:
 *                             type: integer
 *                             example: 2
 *                             description: Quantity of the product in cart
 *                     total:
 *                       type: number
 *                       example: 21.98
 *                       description: Total price of all items in cart
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 * /cart/clear:
 *   delete:
 *     summary: Clear the user's cart
 *     description: user's cart empty.
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful operation. empty cart.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 200
 *                   description: HTTP status code
 *                 message:
 *                   type: string
 *                   example: Cart cleared
 *                   description: Response message
 *                 data:
 *                   type: object
 *                   description: Cart data
 *                   properties:
 *                     products:
 *                       type: array
 *                       example: []
 *                       description: Empty items remain in cart
 *                     total:
 *                       type: number
 *                       example: 0
 *                       description: Empty items remain in cart
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalError'
 * components:
 *   responses:
 *     Unauthorized:
 *       description: Unauthorized access
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: integer
 *                 example: 401
 *                 description: HTTP status code
 *               message:
 *                 type: string
 *                 example: Unauthorized
 *                 description: Response message
 *               error:
 *                 type: string
 *                 example: Authentication failed
 *                 description: Error message
 *     NotFound:
 *       description: Resource not found
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: integer
 *                 example: 404
 *                 description: HTTP status code
 *               message:
 *                 type: string
 *                 example: Not Found
 *                 description: Response message
 *               error:
 *                 type: string
 *                 example: The requested resource was not found
 *                 description: Error message
 *     InternalError:
 *       description: Internal server error
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: integer
 *                 example: 500
 *                 description: HTTP status code
 *               message:
 *                 type: string
 *                 example: Internal Server Error
 *                 description: Response message
 *               error:
 *                 type: string
 *                 example: An unexpected error occurred
 *                 description: Error message
 */
/**
 * @swagger
 * /cart/add/{id}:
 *   patch:
 *     summary: increase product on cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id of the product to added
 *         schema:
 *           type: string
 *       - in: query
 *         name: quantity
 *         description: quantity to added
 *         schema:
 *           type: number
 *     responses:
 *       '200':
 *         description: succssefully increase cart
 *       '406':
 *         description: Can not order more than in stock.
 *       '500':
 *         description: Internal Error
 */
/**
 * @swagger
 * /cart/reduce/{id}:
 *   patch:
 *     summary: reduce product cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id of the product to added
 *         schema:
 *           type: string
 *       - in: query
 *         name: quantity
 *         description: quantity to be reduced
 *         schema:
 *           type: number
 *     responses:
 *       '200':
 *         description: succssefully cart reduced
 *       '406':
 *         description: Can not reduce
 *       '500':
 *         description: Internal Error
 */
