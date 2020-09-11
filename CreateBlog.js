const ottoman = require('ottoman')



// create connection to database/bucket
const connection = ottoman.connect({
  connectionString: 'couchbase://localhost',
  bucketName: 'blogs',
  username: 'Administrator',
  password: 'password'
});

const { BlogModel }   = require('./model/blogModel');

//const Blog = ottoman.model('blogs', blogSchema, {scopeName : 'region-us', collectionName: 'blogs'})
// Creating a use that matches the model
const ottomanBlog = new BlogModel({
    blogKey : 'Blog1234',
    title: 'First Ottoman Blog',
    author: 'Arun Vijayraghavan',
    body: 'Ottoman is awesome !!!',
    status : 'Something',
    meta: {
      votes: 4,
      favs:  10
    }
})
// run the query
const runAsync = async() => {
    try {

        await ottomanBlog.save();
        console.log(`success: blog added successfully`)
      //  const airlane = await Airline.findByCallSign('United');
      //  console.log(airlane)
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
