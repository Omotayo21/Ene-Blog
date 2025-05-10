import { Link } from "react-router-dom";
import { useState } from "react";
import {MagnifyingGlass} from 'phosphor-react'

const Navbar = () => {
  
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search logic or redirect to search results page
    console.log("Searching for:", searchQuery);
  };

  return (
    <>
      <nav className="bg-eco-green text-white shadow-lg sm:hidden md:hidden lg:block">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-serif font-bold">Logo</span>
          </Link>

          <div className="flex items-center space-x-6">
            {/* Mobile Search Button */}
            <button
              className="md:hidden"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <MagnifyingGlass className="text-xl" />
            </button>

            {/* Desktop Search */}
            <div className="hidden md:flex items-center">
              <form onSubmit={handleSearch} className="flex">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="px-3 py-1 text-gray-800 bg-gray-200 rounded-l focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-eco-brown px-3 py-1 rounded-r hover:bg-eco-teal transition"
                >
                  <MagnifyingGlass className="text-xl" />
                </button>
              </form>
            </div>

            <Link to="/" className="hover:text-eco-light transition">
              Home
            </Link>
            <Link to="/eco-crafts" className="hover:text-eco-light transition">
              Eco-crafts
            </Link>
            <Link
              to="/about"
              className=" px-4 py-2 rounded hover:bg-eco-teal transition"
            >
              About
            </Link>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden p-3 bg-eco-teal">
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                placeholder="Search articles..."
                className="flex-grow px-3 py-2 text-gray-800 rounded-l focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="bg-eco-brown px-4 py-2 rounded-r hover:bg-eco-teal transition"
              >
                <FiSearch />
              </button>
            </form>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
