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
function App() {
 
   const [dropdown, setDropdown] = useState(false);
  
    const openSideBar = () => {
      setDropdown(true);
    };
     const closeSidebar = () => {
       setDropdown(false);
     };
   return (
     <Router>
       <div className="min-h-screen flex flex-col  dark:bg-gray-900 dark:text-white">
         <Navbar  />
        <div className="sm:w-screen h-12 bg-eco-green mb-4 fixed z-20 lg:hidden ">
                <List
                  onClick={openSideBar}
                  size={24}
                  className="fixed left-2 z-20  text-white dark:text-black top-2"
                />

             <div>
              <h1 className="text-3xl font-bold text-center">Logo</h1>  
             </div>

                <MagnifyingGlass size={24} className="fixed text-white right-2 z-20 dark:text-black top-2" /> 
              </div>

         {dropdown && <Sidebar closeSidebar={closeSidebar} />}
         <main className="flex-grow mt-4">
           <Routes>
             <Route path="/" element={<Home />} />
             <Route path="/eco-crafts" element={<EcoCrafts   />} />
             <Route path="/post/:id" element={<BlogPost />} />
             <Route path="/ene/admin" element={<Admin />} />
             <Route path="/about" element={<About />} />
             <Route path="*" element={<NotFound />} />
           </Routes>
         </main>
         <Footer />
       </div>
     </Router>
   );
}

export default App;
