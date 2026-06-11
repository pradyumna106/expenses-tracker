const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    expenseName: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: false
    }
}, {timestamps: true});

module.exports = mongoose.model('Expense', expenseSchema);