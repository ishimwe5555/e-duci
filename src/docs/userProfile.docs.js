/**
 * @swagger
 * /users/profile:
 *   put:
 *     summary: Update user profile information
 *     tags:
 *       - users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               names:
 *                 type: string
 *                 description: The full name of the user
 *               gender:
 *                 type: string
 *                 description: The gender of the user
 *               birthdate:
 *                 type: string
 *                 description: The birthdate of the user in YYYY-MM-DD format
 *               language:
 *                 type: string
 *                 description: The preferred language of the user
 *               city:
 *                 type: string
 *                 description: The city where the user resides
 *               street:
 *                 type: string
 *                 description: The street address of the user
 *               currency:
 *                 type: string
 *                 description: The currency preferred by the user
 *               postalCode:
 *                 type: string
 *                 description: The postal code of the user's address
 *               country:
 *                 type: string
 *                 description: The country where the user resides
 *               accountNumber:
 *                 type: string
 *                 description: The account number of the user
 *               accountName:
 *                 type: string
 *                 description: The name on the user's account
 *               telephone:
 *                 type: string
 *                 description: The telephone number of the user
 *             example:
 *               names: John Smith
 *               gender: male
 *               birthdate: 1985-03-20
 *               language: English
 *               city: New York
 *               street: 123 Main St
 *               currency: USD
 *               postalCode: "10001"
 *               country: USA
 *               accountNumber: "123456789"
 *               accountName: John Smith
 *               telephone: "+11234567890"
 *     responses:
 *       200:
 *         description: Successfully updated user profile
 *         schema:
 *           type: object
 *           properties:
 *             code:
 *               type: integer
 *               example: 200
 *             message:
 *               type: string
 *               example: Successfully updated
 *             info:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 29d59c19-1e12-4d3f-b325-daa11c443496
 *                 names:
 *                   type: string
 *                   example: John Doe
 *                 gender:
 *                   type: string
 *                   enum: [male, female, other]
 *                   example: male
 *                 birthdate:
 *                   type: string
 *                   format: date
 *                   example: 1990-01-01
 *                 language:
 *                   type: string
 *                   example: English
 *                 city:
 *                   type: string
 *                   example: New York
 *                 street:
 *                   type: string
 *                   example: 123 Main St
 *                 currency:
 *                   type: string
 *                   example: USD
 *                 postalCode:
 *                   type: string
 *                   example: "10001"
 *                 country:
 *                   type: string
 *                   example: USA
 *                 accountNumber:
 *                   type: string
 *                   example: "1234567890123456"
 *                 accountName:
 *                   type: string
 *                   example: BK
 *                 telephone:
 *                   type: string
 *                   example: +1 555-555-5555
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid input
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error, Internal server Error
 *                 error:
 *                   type: string
 *                   example: Unexpected token u in JSON at position 0
 */

/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Fetch user profile
 *     description: Fetches the user profile of the authenticated user.
 *     tags:
 *       - users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched user profile
 *         schema:
 *           type: object
 *           properties:
 *             code:
 *               type: integer
 *             message:
 *               type: string
 *             user:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string
 *                 status:
 *                   type: string
 *                 tfa_enabled:
 *                   type: boolean
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *             profile:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 names:
 *                   type: string
 *                 gender:
 *                   type: string
 *                 birthdate:
 *                   type: string
 *                   format: date
 *                 language:
 *                   type: string
 *                 city:
 *                   type: string
 *                 street:
 *                   type: string
 *                 currency:
 *                   type: string
 *                 postalCode:
 *                   type: string
 *                 country:
 *                   type: string
 *                 accountNumber:
 *                   type: string
 *                 accountName:
 *                   type: string
 *                 telephone:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error, Internal server Error
 *                 error:
 *                   type: string
 *                   example: Unexpected token u in JSON at position 0
 */
