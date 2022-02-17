const { MongoClient } = require('mongodb');
require('dotenv').config();

const MONGO_DB_URL = `mongodb://${process.env.HOST || 'mongodb'}:27017/to_do_list`;
const DB_NAME = 'to_do_list';

const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

let db = null;

const connection = () => (db
  ? Promise.resolve(db)
  : MongoClient.connect(MONGO_DB_URL, OPTIONS)
  .then((conn) => {
  db = conn.db(DB_NAME);
  return db;
  }));

module.exports = connection;