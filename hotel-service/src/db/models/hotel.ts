import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';

import sequelize from './sequelize';

class Hotel extends Model<InferAttributes<Hotel>, InferCreationAttributes<Hotel>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare address: string;
    declare location: string;
    declare created_at: CreationOptional<Date>;
    declare updated_at: CreationOptional<Date>;
    declare rating?: number;
    declare ratingCount?: number;
}

Hotel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: new Date(),
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: new Date(),
        },
        rating: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        ratingCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    },
    {
        tableName: 'Hotels',
        sequelize,
        underscored: true,
        timestamps: true,
    }
);

export default Hotel;
