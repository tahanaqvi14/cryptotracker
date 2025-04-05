import React from 'react';
import useThemeStore from '../assets/themeStore';

const Fullpage1 = ({ children }) => {
    const { theme } = useThemeStore();

  return (
    <div style={{ 
      // maxwidth: "100vw", 
      // maxheight: "100vh", 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center"
    }}
    className={`max-w-screen max-h-screen ${
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}>



      {children}
    </div>
  );
};

export default Fullpage1;
