"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">Expense Tracker</Link>
        <div className="space-x-4 flex items-center">
          
          {/* Show these links ONLY if logged in */}
          {isLoggedIn ? (
            <>
              <Link href="/add-expense" className="hover:text-gray-300">Add Expense</Link>
              <Link href="/expenses" className="hover:text-gray-300">Expense List</Link>
              <button 
                onClick={handleLogout} 
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm transition"
              >
                Logout
              </button>
            </>
          ) : (
            /* Show these links ONLY if logged out */
            <>
              <Link href="/login" className="hover:text-gray-300">Login</Link>
              <Link href="/register" className="hover:text-gray-300">Register</Link>
            </>
          )}
          
        </div>
      </div>
    </nav>
  );
}