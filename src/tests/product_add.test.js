import chai from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';
import path from 'path';
import Jwt from 'jsonwebtoken';
import { redisClient } from '../helpers';
import app from '../index';
import Products from '../database/models/products.model.js';
import Collection from '../database/models/collection.model';
import { productControllers, productImageController } from '../controllers';
import productsService from '../services/products.service';

const { expect } = chai;
chai.use(chaiHttp);
const pathOne = path.join(__dirname, '..', 'assets', 'images', '1.jpg');
const pathTwo = path.join(__dirname, '..', 'assets', 'images', '2.jpg');
const pathThree = path.join(__dirname, '..', 'assets', 'images', '3.jpg');
const pathFour = path.join(__dirname, '..', 'assets', 'images', '4.jpg');
const file = path.join(__dirname, '..', 'assets', 'images', 'testFile.txt');

const testUserLogin = {
  email: 'seller@example.com',
  password: 'Qwert@12345',
};

describe('adding product', function () {
  let token;
  let product;
  let data;
  let collectionID;

  before(async function () {
    data = await Collection.findOne({ where: { name: 'testing Collection' } });
    collectionID = data.id;
    const body = {
      id: data.userId,
      username: 'rock',
      role: 'SELLER',
    };
    token = Jwt.sign(body, process.env.JWT_SECRET);
    redisClient.set(body.id, token);
  });

  after(async function () {
    const find = await Products.findOne({ where: { name: 'testname' } });
    const images = await find.getProductImages();
    const promises = images.map(async (item) => {
      await productsService.deleteImage(item.id);
    });
    await Promise.all(promises);
    await Products.destroy({ where: { name: 'testname' } });
  });
  it('should not add a new product due to few images', async function () {
    const response = await chai
      .request(app)
      .post(`/products/collection/${collectionID}`)
      .set('authorization', `Bearer ${token}`)
      .set('user', JSON.stringify({ id: data.userId }))
      .field('productName', 'testname')
      .field('productPrice', '0000')
      .field('category', 'test')
      .field('quantity', '1')
      .field('expDate', '2000-02-02')
      .field('bonus', '0')
      .attach('image', fs.readFileSync(pathOne), '1.jpg');
    expect(response).to.have.status(400);
  });
  it('should add a new product', async function () {
    const response = await chai
      .request(app)
      .post(`/products/collection/${collectionID}`)
      .set('authorization', `Bearer ${token}`)
      .set('user', JSON.stringify({ id: data.userId }))
      .field('productName', 'testname')
      .field('productPrice', '0000')
      .field('category', 'test')
      .field('quantity', '1')
      .field('expDate', '2000-02-02')
      .field('bonus', '0')
      .attach('image', fs.readFileSync(pathOne), '1.jpg')
      .attach('image', fs.readFileSync(pathTwo), '2.jpg')
      .attach('image', fs.readFileSync(pathThree), '3.jpg')
      .attach('image', fs.readFileSync(pathFour), '4.jpg');
    expect(response).to.have.status(200);
  });

  it('collection do not exists ', async function () {
    const response = await chai
      .request(app)
      .post(`/products/collection/1a10c0fa-be02-45d9-8c39-3f78e993cd6b`)
      .set('authorization', `Bearer ${token}`)
      .set('user', JSON.stringify({ id: data.userId }))
      .field('productName', 'testname')
      .field('productPrice', '0000')
      .field('category', 'test')
      .field('expDate', '2000-02-02')
      .field('bonus', '0');
    expect(response).to.have.status(404);
  });

  it('it should update if the product exists with single images ', async function () {
    product = await Products.findOne({ where: { name: 'testname' } });
    const images = await product.getProductImages();
    const response = await chai
      .request(app)
      .patch(`/products/update/image/${product.id}`)
      .set('authorization', `Bearer ${token}`)
      .set('user', JSON.stringify({ id: data.userId }))
      .field('imageId', images[0].id)
      .attach('image', fs.readFileSync(pathOne), '1.jpg')
      .attach('image', fs.readFileSync(pathOne), '1.jpg');
    expect(response).to.have.status(200);
  });
  it('it should update if the product exists with multiple images ', async function () {
    product = await Products.findOne({ where: { name: 'testname' } });
    const images = await product.getProductImages();
    const response = await chai
      .request(app)
      .patch(`/products/update/image/${product.id}`)
      .set('authorization', `Bearer ${token}`)
      .set('user', JSON.stringify({ id: data.userId }))
      .field('imageId', images[0].id)
      .field('imageId', images[1].id)
      .attach('image', fs.readFileSync(pathOne), '1.jpg')
      .attach('image', fs.readFileSync(pathOne), '1.jpg');
    expect(response).to.have.status(200);
  });

  it('it should update if the product exists with no images ', async function () {
    product = await Products.findOne({ where: { name: 'testname' } });
    const response = await chai
      .request(app)
      .patch(`/products/update/${product.id}`)
      .set('authorization', `Bearer ${token}`)
      .set('user', JSON.stringify({ id: data.userId }))
      .field('productName', 'testname')
      .field('productPrice', '0000')
      .field('category', 'test')
      .field('expDate', '2000-02-02')
      .field('quantity', '1')
      .field('bonus', '0');
    expect(response).to.have.status(200);
  });

  it('product already exists', async function () {
    const req = {
      body: { productName: 'testname' },
      params: { cid: `${collectionID}` },
      files: [1, 2, 3, 4, 5],
    };
    const res = {
      status(statusCode) {
        expect(statusCode).to.equal(409);
        return this;
      },
      json(responseBody) {
        expect(responseBody).to.have.property('message');
      },
    };
    await productControllers.addproduct(req, res);
  });

  it('images less than 4 on update with deletion ', async function () {
    product = await Products.findOne({ where: { name: 'testname' } });
    const req = {
      user: { id: `${data.userId}` },
      params: { id: `${product.id}` },
      imagesToDelete: ['1', '2'],
      productImages: ['1', '2', '3', '4'],
      files: [],
    };
    const res = {
      status(statusCode) {
        expect(statusCode).to.equal(401);
        return this;
      },
      json(responseBody) {
        expect(responseBody).to.have.property('error');
      },
    };
    await productImageController.updtImages(req, res);
  });

  it('no update made', async function () {
    product = await Products.findOne({ where: { name: 'testname' } });
    const req = {
      user: { id: `${data.userId}` },
      params: { id: `${product.id}` },
    };
    const res = {
      status(statusCode) {
        expect(statusCode).to.equal(400);
        return this;
      },
      json(responseBody) {
        expect(responseBody).to.have.property('message');
      },
    };
    await productImageController.updtImages(req, res);
  });
  it('images higher than 8 on update with no deletion ', async function () {
    product = await Products.findOne({ where: { name: 'testname' } });
    const req = {
      user: { id: `${data.userId}` },
      params: { id: `${product.id}` },
      imagesToDelete: [],
      productImages: ['1', '2', '3', '4'],
      files: [1, 2, 3, 4, 5, 6],
    };
    const res = {
      status(statusCode) {
        expect(statusCode).to.equal(401);
        return this;
      },
      json(responseBody) {
        expect(responseBody).to.have.property('error');
      },
    };
    await productImageController.updtImages(req, res);
  });

  it('should fail if the product is not for the seller', async function () {
    product = await Products.findOne({ where: { name: 'testname' } });
    const user = await chai
      .request(app)
      .post('/users/login')
      .send(testUserLogin);
    const fToken = user.body.token;
    const response = await chai
      .request(app)
      .patch(`/products/update/${product.id}`)
      .set({ Authorization: `Bearer ${fToken}` })
      .field('productName', 'testname')
      .field('productPrice', '0000')
      .field('category', 'test')
      .field('expDate', '2000-02-02')
      .field('quantity', '1')
      .field('bonus', '0');
    expect(response).to.have.status(401);
  });

  it('product not found', async function () {
    product = await Products.findOne({ where: { name: 'testname' } });
    const user = await chai
      .request(app)
      .post('/users/login')
      .send(testUserLogin);
    const fToken = user.body.token;
    const response = await chai
      .request(app)
      .patch(`/products/update/51ea5366-ea5c-4501-9ade-4cd50009c84c`)
      .set({ Authorization: `Bearer ${fToken}` })
      .field('productName', 'testname')
      .field('productPrice', '0000')
      .field('category', 'test')
      .field('expDate', '2000-02-02')
      .field('quantity', '1')
      .field('bonus', '0');
    expect(response).to.have.status(404);
  });

  it('unsupported file', async function () {
    const response = await chai
      .request(app)
      .post(`/products/collection/${collectionID}`)
      .set('authorization', `Bearer ${token}`)
      .field('productName', 'testname')
      .field('productPrice', '0000')
      .field('category', 'test')
      .field('expDate', '2000-02-02')
      .field('bonus', '0')
      .field('quantity', '1')
      .attach('image', fs.readFileSync(file), 'testfile.txt');
    expect(response).to.have.status(500);
  });
});
