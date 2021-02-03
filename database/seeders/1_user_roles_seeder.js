
const tableName = "roles"

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex(tableName).del()
    .then(function () {
      // Inserts seed entries
      return knex(tableName).insert([
        { id: 1, name: 'superAdmin' },
        { id: 2, name: 'admin' },
        { id: 3, name: 'normal' }
      ]);
    });
};
