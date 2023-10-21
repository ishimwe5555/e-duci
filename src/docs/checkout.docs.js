/**
 * @swagger
 * components:
 *   schemas:
 *     shippingaddress:
 *        type: object
 *        required:
 *          - firstName
 *          - lastName
 *          - phoneNumber
 *          - streetAddress
 *          - country
 *          - city
 *          - postalCode
 *        properties:
 *          firstName:
 *              type: string
 *              description: buyer's first name
 *          lastName:
 *              type: string
 *              description: buyer's last name
 *          phoneNumber:
 *              type: string
 *              description: buyer's phone number
 *          streetAddress:
 *              type: string
 *              description: buyer's street address
 *          country:
 *              type: string
 *              description: buyer's country
 *          city:
 *              type: string
 *              desciption: buyer's city
 *          postalCode:
 *              type: string
 *              description: buyer's postal code
 *        example:
 *          firstName: "testBuyer"
 *          lastName: "client"
 *          phoneNumber: "07888888888"
 *          streetAddress: "kkk876st"
 *          country: "Rwanda"
 *          city: "Kigali"
 *          postalCode: "0"
 */

/**
 * @swagger
 * /users/shipping-address:
 *  get:
 *    tags:
 *      - Checkout
 *    summary: Getting buyer's shipping address
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Retrieved buyer's shipping address.
 *      500:
 *        description: Internal server error
 *  post:
 *     summary: Adds buyer shipping address
 *     tags: [Checkout]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/shippingaddress'
 *     responses:
 *       201:
 *         description: Added buyer's shipping address
 *       500:
 *         description: Internal server error
 *  patch:
 *     summary: Updates buyer's shipping address
 *     tags: [Checkout]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/shippingaddress'
 *     responses:
 *       200:
 *         description: updated buyer's shipping address
 *       500:
 *         description: Internal server error
 * /checkout:
 *  post:
 *    tags:
 *      - Checkout
 *    summary: Creates order of the products in the buyer's cart
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                shippingAddressId:
 *                  type: string
 *                  description: The user's shipping address Id
 *              required:
 *                - shippingAddressId
 *    responses:
 *      201:
 *        description: Checkout done.
 *      406:
 *        description: Cart empty
 *      500:
 *        description: Internal server error
 */
