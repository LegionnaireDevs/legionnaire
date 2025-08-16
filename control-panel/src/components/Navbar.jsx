import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  // Toggle dark mode class on <html>
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  const links = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard"},
  ];

  return (
    <nav className="bg-black-900 text-white fixed w-full z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center h-16 space-x-8">
          {/* Logo */}
          <NavLink to="/" className="text-2xl font-bold tracking-tight !text-white">
            Legionnaire.
          </NavLink>

          {/* Desktop links */}
          <ul className="hidden md:flex space-x-6">
            {links.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `block py-2 px-3 rounded transition !text-white visited:!text-white hover:!text-white ${
                      isActive ? "font-bold" : "font-bold"
                    }`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
</NavLink>
              </li>
            ))}
          </ul>

          {/* Right controls */}
          <div className="flex items-center gap-4">
            {/* Dark mode toggle */}
         

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded hover:bg-gray-700 transition text-white"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <span className="text-2xl">&times;</span>
              ) : (
                <span className="text-2xl">&#9776;</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden bg-gray-800 border-t border-gray-700 space-y-1 px-4 py-3">
          {links.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block py-2 px-3 rounded text-white hover:text-white hover:bg-gray-700 transition ${
                    isActive ? "font-semibold bg-gray-700" : ""
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
