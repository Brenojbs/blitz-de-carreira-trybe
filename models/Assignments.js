const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (name, status) => {
  const conn = await connection();
  const { insertedId: _id } = await conn.collection('assignments').insertOne({ name, status });
  return {
    _id,
    name,
    status,
  };
};

const upDate = async (id, status) => {
  const conn = await connection();
  const query = await conn.collection('assignments').findOne({ _id: ObjectId(id) });
  
  if (query) {
    // console.log(query);
    await conn.collection('assignments').updateOne(
      { _id: ObjectId(id) },
      { $set: { status },
    },
    );
    const query2 = await conn.collection('assignments').findOne({ _id: ObjectId(id) });
    return query2;
  }
  return query;
};

module.exports = {
  create,
  upDate,
};