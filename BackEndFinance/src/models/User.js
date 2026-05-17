const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let UserSchema = new Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    created_at: { type: Date, default: Date.now },
    resetPasswordCode: {
        type: String,
        default: null
    },
    resetPasswordExpires: {
        type: Date,
        default: null
    }
})

UserSchema.virtual('url').get(function () {
    return '/user/' + this._id
})

module.exports = mongoose.model('User', UserSchema);