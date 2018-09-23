const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL);

const Student = conn.define('student', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  gpa: {
    type: Sequelize.DECIMAL,
  },
});

const School = conn.define('school', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
  },
});

Student.belongsTo(School);
School.hasMany(Student);

module.exports = {
  Student,
  School,
  conn,
};
