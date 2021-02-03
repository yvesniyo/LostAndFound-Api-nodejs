const faker = require('faker');
const Hashr = require('../../app/Helpers/Hashr');
const tableName = "users"


const usersCollection = async (len = 20) => {

  const password = await new Hashr().hashData({ data: "password" });

  let rslt = []

  for (let i = 0; i <= len; i++) {
    rslt.push({
      id: i + 1,
      name: faker.name.firstName,
      username: faker.internet.userName,
      password: password,
      email: faker.internet.email,
      role_id: 3
    })
  }

  rslt.push({
    id: 1,
    name: 'Super Admin',
    username: "admin",
    password: password,
    email: 'admin@admin.com',
    role_id: 1
  })

  return rslt

}

exports.seed = (knex) => {

  // Deletes ALL existing entries
  return knex(tableName).del()
    .then(function () {
      // Inserts seed entries
      return knex(tableName).insert(usersCollection(30));
    });
};
