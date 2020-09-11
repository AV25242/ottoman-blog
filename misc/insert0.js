const ottoman = require('ottoman')

const {  model, Schema,getModel, setGlobalConfig } = require('ottoman');


// create connection to database/bucket
const connection = ottoman.connect({
  connectionString: 'couchbase://phonehome.hq.couchbase.com',
  bucketName: 'sdk_stats',
  username: 'arunv',
  password: 'EiJoh0ai'
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
// Creating a use that matches the model
const united = new Airline({
    callsign: 'United',
    country: 'United States',
    name: 'United Airlines'
})
// run the query
const runAsync = async() => {
    try {
        console.log ("attempt")
        await united.save();
        console.log(`success: airline added`)
      //  const airlane = await Airline.findByCallSign('United');
      //  console.log(airlane)
    } catch (error) {
        console.log(error)
    }
    //process.exit(0)
}
ottoman.ensureIndexes()
    .then(() => {
        runAsync()
            .catch((e) => console.log(e))
    })
