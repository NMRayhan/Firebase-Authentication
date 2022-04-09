import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <div>
      <nav className="bg-slate-300">
        <ul className="flex md:flex-1">
          <li className="hover:bg-cyan-500 duration-150">
            <Link className="hover:text-slate-300 duration-150" to="/">Home</Link>
          </li>
          <li className="hover:bg-cyan-500 duration-150">
            <Link className="hover:text-slate-300 duration-150" to="/simple">Simple-Login</Link>
          </li>
          <li className="hover:bg-cyan-500 duration-150">
            <Link className="hover:text-slate-300 duration-150" to="/more-simple">More-Simple</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
