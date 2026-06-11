import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-10 rounded-md shadow-md w-full max-w-lg text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Welcome to Expense Tracker</h1>
        <p className="text-gray-600 mb-8">
          Track and manage your expenses effectively. Use the navigation links below to add new expenses or view your expense history.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/add-expense" className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition shadow">
            Add Expense
          </Link>
          <Link href="/expenses" className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition shadow">
            Expense List
          </Link>
        </div>
      </div>
    </div>
  );
}