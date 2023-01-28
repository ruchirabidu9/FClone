const dbConfig = require("../config/dbConfig");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0
 }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync the database');
  //initial(); 
});

db.categories = require('./category')(sequelize, Sequelize);
db.products = require('./product')(sequelize, Sequelize);
db.users = require('./user')(sequelize, Sequelize);
// db.roles = require('./role')(sequelize, Sequelize);

// function initial() {
//   db.roles.create({
//     id: 1,
//     name: "admin"
//   });
 
//   db.roles.create({
//     id: 2,
//     name: "supervisior"
//   });
 
//   db.roles.create({
//     id: 3,
//     name: "user"
//   });
// }

db.categories.belongsToMany(db.products, {
  through: 'product_category',
  foreignKey: 'categoryId'
});

db.products.belongsTo(db.categories, {
  through: 'product_category',
  foreignKey: 'categoryId'
});

// db.roles.belongsToMany(db.users, {
//   through: "user_roles",
//   foreignKey: 'roleId',
//   otherKey: 'userId',
//   timestamps: false
// });

// db.users.belongsTo(db.roles, {
//   through: 'user_roles',
//   foreignKey: 'roleId',
//   otherKey: 'userId',
//   timestamps: false
// });

// db.ROLES = ["admin", "supervisior", "user"];

module.exports = db;