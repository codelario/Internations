let mongoose = require('mongoose');

let UsersSchema = {name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
},
lastname: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
},
completed: {
    type: Boolean,
    default: false
},
completedAt: {
    type: Number,
    default: null
}}

let Users = mongoose.model('Users', UsersSchema);
module.exports = {Users};