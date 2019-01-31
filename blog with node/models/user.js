let mongoose = require('mongoose');

let userSchema= mongoose.Schema({
    name: {
        type: String,
        require:false
    },
    email: {
        type: String,
        require:false
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