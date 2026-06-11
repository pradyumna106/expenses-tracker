"use client";
import { useEffect, useState } from 'react';

interface Expense {
  _id: string;
  expenseName: string;
  amount: number;
  date: string;
  description?: string;
}

export default function ExpenseList() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchExpenses = async () => {
    const userId = localStorage.getItem('userId');
    
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/expenses/user/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setExpenses(data);
      }
    } catch (error) {
      console.error('Error fetching expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if(!confirm('Are you sure you want to delete this expense?')) return;
    
    try {
      const response = await fetch(`http://localhost:5000/expenses/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setExpenses(expenses.filter(exp => exp._id !== id));
      }
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Expense List</h2>
        
        {loading ? (
          <p className="text-center text-gray-500">Loading expenses...</p>
        ) : expenses.length === 0 ? (
          <p className="text-center text-gray-500">No expenses found.</p>
        ) : (
          <div className="space-y-4">
            {expenses.map((expense) => (
              <div key={expense._id} className="border-b border-gray-200 pb-4 flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-green-600 mb-1">{expense.expenseName}</h3>
                  <p className="text-gray-700 text-sm mb-1">
                    <span className="font-medium">Amount:</span> ${expense.amount.toFixed(2)}
                  </p>
                  <p className="text-gray-500 text-sm">
                    <span className="font-medium">Date:</span> {new Date(expense.date).toLocaleDateString()}
                  </p>
                  {expense.description && (
                    <p className="text-gray-600 text-sm mt-1">{expense.description}</p>
                  )}
                </div>
                <button 
                  onClick={() => handleDelete(expense._id)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}