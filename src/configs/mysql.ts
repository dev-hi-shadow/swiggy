import { Sequelize } from 'sequelize';
import { Config } from '../types';
const configurations: Record<string, Config> = require('./config');

const env = process.env.NODE_ENV ?? 'development';
const config = configurations[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    pool: {
      min: 0,
      max: 5,
      acquire: 30000,
      idle: 10000,
      evict: 10000,
    },
    define: {
      timestamps: true,
      paranoid: true,
      underscored: true,
      freezeTableName: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    },
    logging: false,
  }
);

export default sequelize;
