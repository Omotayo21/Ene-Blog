
import React from "react";
import { Envelope } from "phosphor-react";
const Footer = () => {
  return (
    <footer className="bg-eco-green text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-serif font-bold">EcoChronicle</h3>
            <p className="mt-2">Sharing stories for a greener planet</p>
          </div>

          <div className="flex space-x-4">
            <a href="#" className="hover:text-eco-light transition">
             <Envelope className="text-2xl" />
            </a>
<p>Contact us at eneawan@gmail.com</p>
<p>or click <a href="mailto:eneawan@gmail.com" className="hover:text-blue-700 hover:underline">here</a> </p>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-eco-teal text-center">
          <p>© {new Date().getFullYear()} EcoChronicle. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
