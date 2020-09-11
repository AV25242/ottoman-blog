const ottoman = require('ottoman')
const { model, Schema } = require('ottoman');
// create connection to database/bucket
const connection = ottoman.connect({
  connectionString: 'couchbase://localhost',
  bucketName: 'travel',
  username: 'Administrator',
  password: 'password'
});
const schema = new Schema({
  callsign: String,
  country: String,
  name: String
})
schema.index.findByCallSign = {
  by: 'callsign',
  type: 'refdoc'
};
// create model representing our user
const Airline = ottoman.model('Airline', schema, {scopeName : 'dbo', collectionName: 'Airline'})
// run the query
const runAsync = async() => {
  try {
    const airlane = await Airline.findByCallSign('United');
    console.log(airlane)
  } catch (error) {
    throw error
  }
  process.exit(0)
}
ottoman.ensureIndexes()
  .then(() => {
    runAsync()
      .catch((e) => console.log(e))
  })
