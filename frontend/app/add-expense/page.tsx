"use client";
import { useState } from 'react';

export default function AddExpense() {
  const [expenseName, setExpenseName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const userId = localStorage.getItem('userId');
    
    if (!userId) {
      alert("You must be logged in to add an expense");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/expenses/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ expenseName, amount: Number(amount), date, description, userId }),
      });

      if (response.ok) {
        alert('Expense added successfully!');
        setExpenseName(''); setAmount(''); setDate(''); setDescription('');
      } else {
        alert('Failed to add expense');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Expense</h2>
        
        <form onSubmit={handleAddExpense} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Expense Name:</label>
            <input type="text" value={expenseName} onChange={(e) => setExpenseName(e.target.value)} className="w-full border border-gray-300 rounded p-2 text-black" required />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Amount:</label>
            <input type="number" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full border border-gray-300 rounded p-2 text-black" required />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Date:</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full border border-gray-300 rounded p-2 text-black" required />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Description:</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full border border-gray-300 rounded p-2 text-black" />
          </div>
          
          <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition">
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
}