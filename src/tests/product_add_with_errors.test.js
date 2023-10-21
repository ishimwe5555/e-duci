/* eslint-disable no-unused-vars */
import chai from 'chai';
import chaiHttp from 'chai-http';
import assert from 'assert';
import Sinon from 'sinon';
import passport from 'passport';
import path from 'path';
import Jwt from 'jsonwebtoken';
import fs from 'fs';
import app from '../index';
import { isCollectionExists } from '../middleware';
import { redisClient } from '../helpers';
import Collection from '../database/models/collection.model';
import Products from '../database/models/products.model';

chai.use(chaiHttp);
const { expect } = chai;
const pathOne = path.join(__dirname, '..', 'assets', 'images', '1.jpg');
const pathTwo = path.join(__dirname, '..', 'assets', 'images', '2.jpg');
const pathThree = path.join(__dirname, '..', 'assets', 'images', '3.jpg');
const pathFour = path.join(__dirname, '..', 'assets', 'images', '4.jpg');

describe('catching error when adding and updating a product', function () {
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
  it('should call next when the collection by name do not exist', async function () {
    const req = { body: { name: 'Test' } };
    const res = {
      status() {},
      json() {},
    };
    const next = Sinon.stub();
    await isCollectionExists(req, res, next);
    assert.ok(next.calledOnce);
  });

  it('should call deserializeUser function', async function (done) {
    const user = { id: 1, name: 'the test man' };
    passport.deserializeUser(user, function (err, deserializedUser) {
      assert.deepStrictEqual(deserializedUser, user);
      assert.strictEqual(err, null);
      done();
    });
  });

  it('url does not exist on single image delete', async function () {
    product = await Products.findOne({
      where: { name: 'testing review product' },
    });
    const response = await chai
      .request(app)
      .patch(`/products/update/image/${product.id}`)
      .set('authorization', `Bearer ${token}`)
      .set('user', JSON.stringify({ id: data.userId }))
      .field('imageId', '2a01c0fa-be02-45d9-8c39-3f78e993cd6b')
      .attach('image', fs.readFileSync(pathOne), '1.jpg')
      .attach('image', fs.readFileSync(pathTwo), '1.jpg')
      .attach('image', fs.readFileSync(pathThree), '1.jpg')
      .attach('image', fs.readFileSync(pathFour), '1.jpg')
      .attach('image', fs.readFileSync(pathFour), '1.jpg');
    expect(response).to.have.status(400);
  });

  it('url does not exist on multiple images delete', async function () {
    product = await Products.findOne({
      where: { name: 'testing review product' },
    });
    const response = await chai
      .request(app)
      .patch(`/products/update/image/${product.id}`)
      .set('authorization', `Bearer ${token}`)
      .set('user', JSON.stringify({ id: data.userId }))
      .field('imageId', '2a01c0fa-be02-45d9-8c39-3f78e993cd6b')
      .field('imageId', '2a01c0fa-be02-45d9-8c39-3f78e993cd6b')
      .attach('image', fs.readFileSync(pathOne), '1.jpg')
      .attach('image', fs.readFileSync(pathTwo), '1.jpg')
      .attach('image', fs.readFileSync(pathThree), '1.jpg')
      .attach('image', fs.readFileSync(pathFour), '1.jpg')
      .attach('image', fs.readFileSync(pathFour), '1.jpg')
      .attach('image', fs.readFileSync(pathFour), '1.jpg');
    expect(response).to.have.status(400);
  });

  it('if no image to delete provided', async function () {
    product = await Products.findOne({
      where: { name: 'testing review product' },
    });
    const response = await chai
      .request(app)
      .patch(`/products/update/image/${product.id}`)
      .set('authorization', `Bearer ${token}`);
    expect(response).to.have.status(400);
  });
});
