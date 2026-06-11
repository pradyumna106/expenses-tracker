"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    Fullname: '' 
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        alert('Registration successful! Please login.');
        router.push('/login');
      } else {
        const data = await response.json();
        alert(data.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Registration</h2>
        
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Username:</label>
            <input type="text" name="username" onChange={handleChange} required className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 text-black" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Password:</label>
            <input type="password" name="password" onChange={handleChange} required className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 text-black" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email:</label>
            <input type="email" name="email" onChange={handleChange} required className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 text-black" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Full Name:</label>
            <input type="text" name="Fullname" onChange={handleChange} required className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 text-black" />
          </div>
          
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            Register
          </button>
        </form>
        
        <div className="mt-4 text-center text-sm">
          <Link href="/login" className="text-blue-600 hover:underline">
            Already have an account? Login here
          </Link>
        </div>
      </div>
    </div>
  );
}