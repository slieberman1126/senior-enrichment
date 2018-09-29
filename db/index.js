const { School, Student, conn } = require('./models');
const syncAndSeed = () => {
  conn.sync({ force: true }).then(() => {
    Promise.all([
      School.create({
        name: 'Fox Meadow',
        address: '123 Main Street',
        description: 'elementary school',
      }),
      School.create({
        name: 'Quaker Ridge',
        address: '324 Post Road',
        description: 'middle school',
      }),
      School.create({
        name: 'Scarsdale High School',
        address: '567 Park Ave',
        description: 'high school',
      }),
      //_________________________________________________
      Student.create({
        firstName: 'Moe',
        lastName: 'MOE',
        gpa: 3.5,
        schoolId: 2,
      }),
      Student.create({
        firstName: 'Curly',
        lastName: 'CURLY',
        gpa: 3.9,
        schoolId: 1,
      }),
      Student.create({
        firstName: 'Larry',
        lastName: 'LARRY',
        gpa: 4.0,
        schoolId: 3,
      }),
    ])
      .then(() => console.log('DB seeded!'))
      .catch(e => console.error(e));
  });
};
module.exports = {
  models: {
    School,
    Student,
  },
  syncAndSeed,
};
