import { Sequelize } from 'sequelize';
import Vendors from '../database/models/vendors.model';

async function addVendor(body) {
  const vendor = await Vendors.create(body);
  return vendor;
}

async function getVendorByName(name) {
  const vendor = await Vendors.findOne({
    where: Sequelize.where(Sequelize.fn('lower', Sequelize.col('name')), {
      [Sequelize.Op.iLike]: name.toLowerCase(),
    }),
  });
  return vendor;
}

async function getVendors() {
  const categories = await Category.findAll();
  return categories;
}

export default {
  addVendor,
  getVendors,
  getVendorByName,
};
