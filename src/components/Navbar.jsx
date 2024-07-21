import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center bg-blue-600 h-10 px-4">
      <div className="font-bold text-xl">
        <span className="text-white">&lt;</span>
        <span className="text-white">Pass</span>
        <span className="text-black">Man</span>
        <span className="text-white">/&gt;</span>
      </div>
      <ul>
        <li className="flex gap-4">
          <a href="/" className="hover:font-bold">
            Home
          </a>
          <a href="/" className="hover:font-bold">
            About
          </a>
          <a href="/" className="hover:font-bold">
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
