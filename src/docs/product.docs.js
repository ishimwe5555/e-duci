/**
 * @swagger
 * components:
 *   schemas:
 *     product:
 *        type: object
 *        required:
 *          - productName
 *          - productPrice
 *          - category
 *          - expDate
 *          - bonus
 *          - quantity
 *          - images
 *        properties:
 *          collectionId:
 *              type: string
 *              description: product collection
 *          productName:
 *              type: string
 *              description: product name
 *          productPrice:
 *              type: double
 *              description: product price
 *          category:
 *              type: string
 *              description: category
 *          expDate:
 *              type: string
 *              format: date
 *              description: expiration date
 *          bonus:
 *              type: double
 *              desciption: bonus on product
 *          quantity:
 *              type: double
 *              description: product quantity
 *          images:
 *              type: string
 *              format: binary
 *              description: product images
 */

/**
 * @swagger
 * /products/{pid}:
 *  get:
 *    tags:
 *      - Product
 *    summary: Gets a single product from a collection.
 *    parameters :
 *      - in: path
 *        name: pid
 *        schema:
 *          type: string
 *        required: true
 *        description : object id of product
 *    description: Gets a product in a collection using collection ID and Product ID.
 *    responses:
 *      '200':
 *        description: Product Fetched.
 *      '500':
 *        description: Internal Error.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *            example:
 *              code: 500
 *              message: 'Internal Error.'
 * /products/create-collection:
 *  post:
 *    tags:
 *      - Product
 *    summary: Creates a Collection
 *    security:
 *      - bearerAuth: []
 *    description: Created a collection.
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *          example:
 *            name: 'example collection name'
 *    responses:
 *      '201':
 *        description: Collection Created.
 *      '406':
 *        description: Unacceptable
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *            example:
 *              code: 406
 *              message: 'Not Acceptable'
 *
 *  */

/**
 * @swagger
 * /products/collection/{cid}:
 *   post:
 *     summary: adding a new product to the database
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         description: id of the collection to add the product
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *                 description: product name
 *               productPrice:
 *                 type: string
 *                 description: product price
 *               category:
 *                 type: string
 *                 description: category
 *               expDate:
 *                 type: string
 *                 format: date
 *                 description: expiration date
 *               bonus:
 *                 type: string
 *                 description: bonus
 *               quantity:
 *                 type: double
 *                 description: quantity
 *               image:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: product images
 *     responses:
 *       '200':
 *         description: succssefully added the product
 *       '400':
 *         description: Failed to add the product
 */

/**
 * @swagger
 * /products/update/{id}:
 *   patch:
 *     summary: updating a product on add
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id of the product to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               productName:
 *                 type: string
 *                 description: product name
 *               productPrice:
 *                 type: string
 *                 description: product price
 *               category:
 *                 type: string
 *                 description: category
 *               expDate:
 *                 type: string
 *                 format: date
 *                 description: expiration date
 *               bonus:
 *                 type: string
 *                 description: bonus
 *               quantity:
 *                 type: double
 *                 description: quantity
 *     responses:
 *       '200':
 *         description: succssefully updated  the product
 *       '400':
 *         description: Failed to update a product
 */
/**
 * @swagger
 * /products/{cid}/delete:
 *   delete:
 *     summary: Delete Collection
 *     parameters :
 *       - in: path
 *         name: cid
 *         schema:
 *           type: string
 *         required: true
 *         description : object id of collection
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Collection Deleted
 * /products/{cid}/delete/{pid}:
 *   delete:
 *     summary: Delete Product From collection.
 *     parameters :
 *       - in: path
 *         name: cid
 *         schema:
 *           type: string
 *         required: true
 *         description : object id of collection
 *       - in: path
 *         name: pid
 *         schema:
 *           type: string
 *         required: true
 *         description : object id of product
 *     tags: [Product]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Product Deleted
 */
/**
 * @swagger
 * /wishlist/products/add/{pid}:
 *  post:
 *    summary: adding product to the wishlist
 *    tags: [Product]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: pid
 *        schema:
 *          type: string
 *        required: true
 *        description: The product id
 *    responses:
 *      '200':
 *        description: Added successfully
 *      '404':
 *        description: Unacceptable
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *            example:
 *              Message: 'Not found'
 */

/**
 * @swagger
 * /wishlist/products/delete/{pid}:
 *  delete:
 *    tags:
 *      - Product
 *    summary: delete a product
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: pid
 *        schema:
 *          type: string
 *        required: true
 *        description: The product id
 *    description: delete the product from the wishlist
 *    responses:
 *      '200':
 *        description: Deleted successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *            example:
 *              Message: 'successfully'
 */
/**
 * @swagger
 * /wishlist/all:
 *  get:
 *    tags:
 *      - Product
 *    summary: retrieve all products in the wishlist
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      '200':
 *        description: Retrieve all user product from the wishlist
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *            example:
 *              Message: 'Successfully'
 */
/**
 * @swagger
 * /products/search:
 *   get:
 *     summary: Search for a product
 *     tags:
 *       - Product
 *     parameters:
 *       - name: key
 *         in: query
 *         description: Product name and category
 *         schema:
 *           type: string
 *       - name: minPrice
 *         in: query
 *         description: Minimum product price
 *         schema:
 *           type: number
 *       - name: maxPrice
 *         in: query
 *         description: Maximum product price
 *         schema:
 *           type: number
 *     responses:
 *       "200":
 *         description: search list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                  type: integer
 *                 message:
 *                  type: string
 *                 products:
 *                  type: object
 *       "404":
 *         description: product not found
 *       "500":
 *         description: Server Error
 */
/**
 * @swagger
 * /products/list-items/{cid}:
 *   get:
 *     summary: Retrieve a paginated list of items in a collection
 *     tags:
 *     - Product
 *     parameters:
 *     - name: cid
 *       in: path
 *       required: true
 *       description: The ID of the collection to retrieve items from
 *       schema:
 *         type: string
 *     - name: page
 *       in: query
 *       required: false
 *       description: The page number to retrieve
 *       schema:
 *         type: integer
 *         default: 1
 *     - name: limit
 *       in: query
 *       required: false
 *       description: The number of items to retrieve per page
 *       schema:
 *         type: integer
 *         default: 10
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns a JSON array of items in the collection, along with pagination information
 *       400:
 *         description: Bad request, invalid parameter values
 *       401:
 *         description: Unauthorized, user not authenticated
 *       404:
 *         description: Collection not found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /products/all:
 *   get:
 *     summary: Retrieve a paginated list of items in a collection
 *     tags:
 *     - Product
 *     parameters:
 *     - name: page
 *       in: query
 *       required: false
 *       description: The page number to retrieve
 *       schema:
 *         type: integer
 *         default: 1
 *     - name: limit
 *       in: query
 *       required: false
 *       description: The number of items to retrieve per page
 *       schema:
 *         type: integer
 *         default: 10
 *     responses:
 *       200:
 *         description: Returns a JSON array of items in the collection, along with pagination information
 *       500:
 *         description: Internal server error
 */
