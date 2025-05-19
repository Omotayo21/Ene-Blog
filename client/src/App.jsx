import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BlogPost from "./pages/BlogPost";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import EcoCrafts from "./pages/EcoCrafts";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import {List, MagnifyingGlass} from 'phosphor-react'
import About from "./pages/About";
import Sidebar from "./components/SideBar";
import SearchResults from "./pages/SearchResult";
function App() {
  const [dropdown, setDropdown] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false); // New state for search
const [loading, setLoading] = useState(false);
  const openSideBar = () => {
    setDropdown(true);
  };

  const closeSidebar = () => {
    setDropdown(false);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col dark:bg-gray-900 dark:text-white">
        <Navbar />
        <div className="sm:w-screen h-12 bg-eco-green mb-4 fixed z-20 lg:hidden">
          <List
            onClick={openSideBar}
            size={24}
            className="fixed left-2 z-20 text-white dark:text-black top-2"
          />

          <div className="flex flex-row items-center justify-center">
            <img
              src="/logo.png"
              alt="logo"
              className="w-40 h-12 object-cover"
            />
          </div>

          <MagnifyingGlass
            size={24}
            onClick={toggleSearch}
            className="fixed text-white right-2 z-20 dark:text-black top-2"
          />
        </div>

        {/* Mobile Search Bar */}
        {searchOpen && (
          <div className="fixed top-12 left-0 right-0 z-10 bg-eco-green p-2 shadow-md lg:hidden">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const query = e.target.search.value;
                if (query.trim()) {
                  setLoading(true);
                  window.location.href = `/search?q=${encodeURIComponent(query)}`;
                }
              }}
              className="flex"
            >
              <input
                type="text"
                name="search"
                placeholder="Search articles..."
                className="flex-grow bg-white px-3 py-2 rounded-l focus:outline-none text-black"
                autoFocus
              />
              <button
                type="submit"
                className="bg-eco-brown px-4 py-2 rounded-r hover:bg-eco-teal transition"
              >
                <MagnifyingGlass size={20} />
              </button>
            </form>
          </div>
        )}

        {dropdown && <Sidebar closeSidebar={closeSidebar} />}
        <main className="flex-grow mt-4">
         {loading && <Loader />}
           <Routes>
             <Route path="/" element={<Home />} />
             <Route path="/eco-crafts" element={<EcoCrafts />} />
             <Route path="/post/:id" element={<BlogPost />} />
             <Route path="/ene/admin" element={<Admin />} />
             <Route path="/about" element={<About />} />
             <Route path="*" element={<NotFound />} />
             <Route path="/search" element={<SearchResults />} />
           </Routes>
         </main>
         <Footer />
       </div>
     </Router>
   );
}

export default App;
