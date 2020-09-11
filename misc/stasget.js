const ottoman = require('ottoman');

const { model, Schema,getModel, setGlobalConfig } = require('ottoman');

ottoman.globalConfig({   disableScopes: true }); 

// create connection to database/bucket
const connection = ottoman.connect({
  connectionString: 'couchbase://phonehome.hq.couchbase.com',
  bucketName: 'sdk_stats',
  username: 'arunv',
  password: 'EiJoh0ai'
});

const subDocument = new Schema({name: String});
const statsSchema = new Schema({
  stats: {
    type: String,
    year: Number,
    month: Number,
    lastupdate: Date,
    client : [subDocument],
    total : String
  },
  source: [Object]
})

statsSchema.methods.findSimilarStats = function() {
 return connection.getModel('stats').find({ type: this.type });
};

const Stats = ottoman.model('pypi-bigquery', statsSchema, {collectionKey: 'stats.type'})
 const bgstats = new Stats({type :'pypi-bigquery'})

const runAsync = async() => {
    try {
         //const mystats = await bgstats.findSimilarStats();
         const mystats = await Stats.find()
         console.log(mystats)
    } catch (error) {
        throw error
    }
    //process.exit(0)
}
ottoman.ensureIndexes()
    .then(() => {
        runAsync()
            .catch((e) => console.log(e))
    })
