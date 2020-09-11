const { Schema } = require('ottoman');

const BlogSchema = new Schema({
  blogKey : String,
  title:  { type: String, required: true },
  author: String,  // String is shorthand for {type: String}
  body:   String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  status: { type: String, enum: ["Close", "Open", "Review"] },
  meta: {
    votes: { type: Number, min: 0, max: 5 },
    favs:  Number
  }
});


module.exports = {
  BlogSchema
};
