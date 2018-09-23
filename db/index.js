const { School, Student, conn } = require('./models');
const syncAndSeed = () => {
  let moe, larry, curly, foxMeadow, quakerRidge, greenacres;
  return conn
    .sync({ force: true })
    .then(() => {
      return Promise.all([
        Student.create({ firstName: 'moe', lastName: 'Moe', gpa: 3.5 }),
        Student.create({ firstName: 'curly', lastName: 'Curly', gpa: 3.6 }),
        Student.create({ firstName: 'larry', lastName: 'Larry', gpa: 3.9 }),
      ]);
    })
    .then(students => {
      [moe, larry, curly] = students;
      return Promise.all([
        School.create({
          name: 'Fox Meadow',
          address: '123 Main Street',
          description: 'elementary school',
        }),
        School.create({
          name: 'Quaker Ridge',
          address: '12 Post Road',
          description: 'middle school',
        }),
        School.create({
          name: 'Greenacres',
          address: '45 Park Road',
          description: 'high school',
        }),
      ]);
    })
    .then(schools => {
      [foxMeadow, quakerRidge, greenacres] = schools;
      return Promise.all([
        moe.setSchool(quakerRidge),
        larry.setSchool(quakerRidge),
        curly.setSchool(foxMeadow),
      ]);
    });
};
module.exports = {
  models: {
    School,
    Student,
  },
  syncAndSeed,
};
