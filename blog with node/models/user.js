let mongoose = require('mongoose');

let userSchema= mongoose.Schema({
    name: {
        type: String,
        require:true
    },
    email: {
        type: String,
        require:true
    },
    role: {
        type: String,
        require:true
    },
    user_name: {
        type: String,
        require:true
    },
    password: {
        type: String,
        require:true
    },

});

let User = module.exports = mongoose.model('User',userSchema)