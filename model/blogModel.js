const ottoman = require('ottoman')
const { model } = require('ottoman');
const  blogSchema  = require('./schema/blogSchema');



const Blog = ottoman.model('blogs', blogSchema, {scopeName : 'region-us', collectionName: 'blogs'})

module.exports = {
  Blog
};
