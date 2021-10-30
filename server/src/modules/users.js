const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: true

    },
    password:{
        type: String
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true,
});

const UsersModule = mongoose.model('users', usersSchema);
module.exports = UsersModule 