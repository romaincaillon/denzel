const imdb = require('./src/imdb');
const DENZEL_IMDB_ID = 'nm0000243';
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://romain:QXTmUHic3AJkONQK@cluster0-4c157.mongodb.net/test?retryWrites=true"

async function sandbox(actor) {
  try {
    const movies = await imdb(actor);
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
      const collection = client.db("movies").collection("movies");
      collection.insertMany(movies);
      client.close();
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

sandbox(DENZEL_IMDB_ID);
