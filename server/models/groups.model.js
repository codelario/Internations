let mongoose = require("mongoose");

let GroupsSchema = {
    name: {
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
    }
}

let Groups = mongoose.model('Groups', GroupsSchema);
module.exports = {Groups};