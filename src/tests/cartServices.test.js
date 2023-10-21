import { expect } from 'chai';
import { cartServices, userServices } from '../services';

let userId;
const fakeUserId = 'a2dafc4b-35a3-44f5-84a4-e8772b37ca39';
const arrProducts = [
  { productId: '710440ba-6dbd-4ad9-a55f-27ee605c4e62', quantity: 1 },
  { productId: 'a2dafc4b-35a3-44f5-84a4-e8772b37ca39', quantity: 2 },
  { productId: '0f1548b0-b7ce-49e3-a2ef-baffffd383ab', quantity: 0 },
];
describe('Cart Services', function () {
  describe('getProductsInCart()', function () {
    it('should return an array of products or an empty array if cart is empty', async function () {
      const user = await userServices.getUserByEmail('testing@example.com');
      userId = user.id;
      const result = await cartServices.getProductsInCart(userId);
      expect(result).to.be.a('array');
    });
  });
  describe('getProductDetails()', function () {
    it('should return a null object of products details as id is not valid', async function () {
      const result = await cartServices.getProductDetails(userId);
      expect(result).to.be.a('object');
      expect(result.name).to.equal('');
      expect(result.price).to.equal(0);
    });
    it('should return products details if productId exists', async function () {
      const result = await cartServices.getProductDetails(
        arrProducts[0].productId
      );
      expect(result).to.be.a('object');
    });
  });
  describe('getCart()', function () {
    it('should return cat items as an object with products array and total price', async function () {
      const newid = 'a974dd84-931a-47ba-9ee9-c74eb2282040';
      const result = await cartServices.getCart(newid);
      expect(result).to.be.an('object');
    });
    it('should return cat items as an object with products array and total price', async function () {
      const result = await cartServices.getCart(fakeUserId);
      expect(result).to.be.an('object');
      expect(result.total).to.equal(0);
    });
  });
});
