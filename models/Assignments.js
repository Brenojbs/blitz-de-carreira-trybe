const connection = require('./connection');

const create = async (name, status) => {
  const conn = await connection();
  const { insertedId: _id } = await conn.collection('assignments').insertOne({ name, status });
  const query = await conn.collection('assignments').find().toArray();
  console.log(query);
  return {
    _id,
    name,
    status,
  };
};

module.exports = {
  create,
};