const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let CategorySchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },

    category_name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    
    category_type: {
        type: String,
        required: true,
        enum: ['receita', 'despesa']
    },

    cor_hex: {
        type: String,
        trim: true,
        maxlength: 7,
        default: '#CCCC'
    },

    created_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Category', CategorySchema);
