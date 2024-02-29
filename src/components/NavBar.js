import React from "react";
import { Link, NavLink } from "react-router-dom";
import Container from "./Container";

function NavBar() {
  return (
    <Container>
      <nav className=' w-full py-3 border-b-[1px] border-gray-900 flex flex-nowrap justify-center gap-4 '>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "py-1 px-3 rounded-md border-[1px] border-transparent transition-all duration-300 bg-gray-900   border-gray-800 hover:bg-gray-800   hover:border-gray-700"
              : "py-1 px-3 rounded-md border-[1px] border-transparent transition-all duration-300 hover:bg-gray-900   hover:border-gray-800"
          }
          to='/'
        >
          All jobs
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "py-1 px-3 rounded-md border-[1px] border-transparent transition-all duration-300 bg-gray-900   border-gray-800 hover:bg-gray-800   hover:border-gray-700"
              : "py-1 px-3 rounded-md border-[1px] border-transparent transition-all duration-300 hover:bg-gray-900   hover:border-gray-800"
          }
          to='/add'
        >
          Add job
        </NavLink>
      </nav>
    </Container>
  );
}

export default NavBar;
