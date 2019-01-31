let mongoose = require('mongoose');

let blogSchema= mongoose.Schema({
    title: {
        type: String,
        require:true
    },
    author: {
        type: String,
        require:true
    },
    body: {
        type: String,
        require:true
    },

});

let Blog = module.exports = mongoose.model('Blog',blogSchema)