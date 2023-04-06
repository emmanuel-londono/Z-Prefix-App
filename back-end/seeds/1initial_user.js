const { faker } = require('@faker-js/faker');


// const randomize = () => {
//   return Math.floor(Math.random() * 10)
// }

let fakeUserList = [];

for (let i = 0; i < 10; i++){
  fakeUserList.push({first_name:faker.name.firstName(),last_name:faker.name.lastName(), username:faker.internet.userName(), password:'123'})
}

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user').del()
    .then(function () {
      // Inserts seed entries
      return knex('user').insert(
        fakeUserList
      );
    });
};