import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import useThemeStore from '../assets/themeStore';

const StyledWrapper = styled.div`
  .switch {
    display: block;
    --width-of-switch: 3em;
    --height-of-switch: 1.3em;
    --size-of-icon: 1.1em;
    --slider-offset: 0.3em;
    position: relative;
    width: var(--width-of-switch);
    height: var(--height-of-switch);
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #dadad8;
    transition: 0.4s;
    border-radius: 30px;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: var(--size-of-icon, 1.4em);
    width: var(--size-of-icon, 1.4em);
    border-radius: 20px;
    left: var(--slider-offset, 0.3em);
    top: 50%;
    transform: translateY(-50%);
    background: linear-gradient(40deg, #ff0080, #ff8c00 70%);
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: #303136;
  }

  input:checked + .slider:before {
    left: calc(100% - (var(--size-of-icon, 1.4em) + var(--slider-offset, 0.3em)));
    background: #303136;
    box-shadow: inset -3px -2px 5px -2px #8983f7, inset -10px -4px 0 0 #a3dafb;
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useThemeStore();

  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Load the theme from local storage or default to false (light mode)
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    // Apply the theme class to the document body
    document.body.className = isDarkMode ? "dark" : "light";
    // Save the theme to local storage
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const handleToggle = () => {
    setIsDarkMode((prev) => !prev);
    toggleTheme(); // Call the theme toggle function from your theme store
  };

  const getNavLinkClass = (isActive) =>
    isActive
      ? "block text-inherit bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 dark:text-inherit md:text-blue-500"
      : "block text-inherit rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-inherit md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-inherit md:dark:hover:bg-transparent";

  return (
    <div
      className={` w-screen md:max-w-screen-lg lg:max-w-full mx-auto px-4 h-12 border-b-2 flex justify-between items-center border-gray-300 ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}
      id="navbar-default"
    >
      <div className="flex items-center">
        <p className="font-semibold text-2xl">CryptoTracker</p>
      </div>
      <ul className="hidden font-medium md:flex justify-end h-full items-center space-x-12 rtl:space-x-reverse">
        <li>
          <NavLink to="/" className={({ isActive }) => getNavLinkClass(isActive)}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/map" className={({ isActive }) => getNavLinkClass(isActive)}>
            Crypto Map
          </NavLink>
        </li>
        <li>
          <NavLink to="/trip" className={({ isActive }) => getNavLinkClass(isActive)}>
            Plan Your Trip
          </NavLink>
        </li>
        <li>
          <StyledWrapper>
            <label className="switch">
              <input type="checkbox" checked={isDarkMode} onChange={handleToggle} />
              <span className="slider" />
            </label>
          </StyledWrapper>
        </li>
      </ul>

      {/* Hamburger Menu for Mobile View */}
      <div className="md:hidden">
        <button
          className={`flex  flex-col  items-center p-1 rounded-md justify-between w-10 h-6 cursor-pointer focus:outline-none ${
            theme === "dark" ? "focus:bg-[#303136]" : "focus:bg-gray-200"
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={`h-0.5 w-11/12 ${theme === "dark" ? "bg-white" : "bg-black"} transition-opacity `}></span>
          <span className={`h-0.5 w-11/12 ${theme === "dark" ? "bg-white" : "bg-black"} transition-transform  `}></span>
          <span className={`h-0.5 w-11/12 ${theme === "dark" ? "bg-white" : "bg-black"} transition-transform `}></span>
        </button>

        {isOpen && (
          <div
            className={`absolute top-12 right-0 ${
              theme === "dark" ? "bg-black text-white" : "bg-white text-black"
            } border border-gray-200 shadow-md rounded-md p-4 z-50`}
          >
            <ul className="space-y-4">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) => getNavLinkClass(isActive)}
                  onClick={() => setIsOpen(false)} // Close menu on click
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/map"
                  className={({ isActive }) => getNavLinkClass(isActive)}
                  onClick={() => setIsOpen(false)} // Close menu on click
                >
                  Crypto Map
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/trip"
                  className={({ isActive }) => getNavLinkClass(isActive)}
                  onClick={() => setIsOpen(false)} // Close menu on click
                >
                  Plan Your Trip
                </NavLink>
              </li>
              <li>
                <StyledWrapper>
                  <label className="switch">
                    <input type="checkbox" checked={isDarkMode} onChange={handleToggle} />
                    <span className="slider" />
                  </label>
                </StyledWrapper>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
