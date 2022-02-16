const connection = require('./connection');

const getAll = async () => {
  const conn = await connection();
  const query = await conn.collection('users').find().toArray();
  
  return query;
};

module.exports = {
  getAll,
};