const { MongoClient } = require('mongodb');
const MONGO_URI =
  'mongodb+srv://aheeva-admin:cPvgm7CHDnGhCICO@cluster0.tnvm5.mongodb.net/quiz?retryWrites=true&w=majority';
const options = { useNewUrlParser: true, useUnifiedTopology: true };

console.log("I'M HERE");
export default async (req, res) => {
  try {
    const client = await MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db('quiz');
    const q = await db.collection('quizzes').find().toArray();
    // console.log('===>', q);
    res.status(200).json(q);
  } catch (err) {
    console.log(err);
  }
};
