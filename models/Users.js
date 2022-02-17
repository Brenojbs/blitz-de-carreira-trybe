const connection = require('./connection');

const create = async (email, name, password) => {
  const conn = await connection();
  const query = await conn.collection('users').insertOne({ email, name, password });
  return query;
};

const getAll = async () => {
  const conn = await connection();
  const query = await conn.collection('users').find().toArray();

  return query;
};

const getByEmail = async (email) => {
  const conn = await connection();
  const query = await conn.collection('users').findOne({ email });

  return query;
};

module.exports = {
  getAll,
  getByEmail,
  create,
};