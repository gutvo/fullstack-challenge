import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../migrations/mysql';
import { Brand } from './brand';

export interface ProductData extends Model {
    id: number;
    name: string;
    description: string;
    price: number;
    brandId: number;
}

export const Product = sequelize.define<ProductData>(
    'productData',
    {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        name: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.DECIMAL(18, 2),
        },
    },
    {
        tableName: 'product',
        timestamps: false,
    },
);

Brand.hasOne(Product);

Product.belongsTo(Brand, {
    foreignKey: 'brandId',
    targetKey: 'id',
    as: 'brandData',
    onDelete: 'SET NULL',
});
