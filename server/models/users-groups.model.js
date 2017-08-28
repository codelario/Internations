let mongoose = require('mongoose');

let UsersGroupsSchema = {
    user: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    groups: {
        type: Object,
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
    }
}

let UsersGroups = mongoose.model('UsersGroups', UsersGroupsSchema);
module.exports = { UsersGroups };