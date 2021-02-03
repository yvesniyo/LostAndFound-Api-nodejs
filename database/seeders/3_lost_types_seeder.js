
const tableName = "lost_types"

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex(tableName).del()
    .then(function () {
      // Inserts seed entries
      return knex(tableName).insert([
        { id: 1, name: 'ID', description: 'National Id card' },
        { id: 2, name: 'DL', description: 'Drivers licence' },
        { id: 3, name: 'passport', description: 'Passport' }
      ]);
    });
};
