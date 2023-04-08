const { faker } = require('@faker-js/faker');

let fakeItemList = [];

const randomize = () => {
  return Math.floor(Math.random() * 1000)
}

for (let i = 0; i < 1000; i++){
  fakeItemList.push({user_id:`${randomize()}`, item_name:faker.commerce.productName(), description:faker.commerce.productDescription(), quantity:faker.datatype.number({ max: 1000 })})
}


exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('item').del()
    .then(function () {
      // Inserts seed entries
      return knex('item').insert(
        fakeItemList
      );
    });
};