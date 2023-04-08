const { faker } = require('@faker-js/faker');


// const randomize = () => {
//   return Math.floor(Math.random() * 10)
// }

let fakeUserList = [{first_name:'John', last_name:'Swift', username:'admin', password:"123"}];

for (let i = 0; i <= 1000; i++){
  fakeUserList.push({first_name:faker.name.firstName(),last_name:faker.name.lastName(), username:faker.internet.userName(), password:'123', session_id:faker.datatype.uuid()})
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