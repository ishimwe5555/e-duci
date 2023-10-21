import { DataTypes } from 'sequelize';
import sequelize from '../config/db';
import User from './user.model';

const Wishlist = sequelize.define('wishlist', {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    unique: true,
    defaultValue: DataTypes.UUIDV4,
  },
  products: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
    defaultValue: [],
  },
});
Wishlist.belongsTo(User, { onDelete: 'CASCADE' });

User.hasOne(Wishlist, {
  as: 'wishlistItems',
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

export default Wishlist;
