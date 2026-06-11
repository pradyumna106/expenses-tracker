const route = require('express').Router();
const Expense = require('../model/expenses.db');

// create expense
route.post('/add', async (req, res) => {
    try {
        const { expenseName, amount, date, description, userId } = req.body;
        const expense = await Expense.create({ expenseName, amount, date, description, userId }); 
        res.status(201).json(expense);
    } catch(err) {
        res.status(500).json({ error: err.message });
    }  
});

// get expenses BY USER ID
route.get('/user/:userId', async (req, res) => {
    try {
        const expenses = await Expense.find({ userId: req.params.userId }).sort({ date: -1 });
        res.status(200).json(expenses);
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

// get update expense 
route.get('/:id', async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);  
        if(expense) {
            res.status(200).json(expense);
        } else {
            res.status(404).json({ error: 'Expense not found' });
        }
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

// get delete expense by id
route.delete('/:id', async (req, res) => {
    try {
        const expense = await Expense.findByIdAndDelete(req.params.id); 
        if(expense) {
            res.status(200).json({ message: 'Expense deleted successfully' });
        } else {
            res.status(404).json({ error: 'Expense not found' });
        }
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
}); 

module.exports = route;