import { useState,createContext,useEffect } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar';
import "@fontsource/poppins"; // Importing Poppins globally
import CryptoCard from './Page 1/CryptoCard';
import Pg1 from './Page 1/Pg1';
import API from './Api'; // ✅ Import API.jsx (Context Provider)
import CryptoMap from "./Page 2/Cryptomap";
import Countrycard from "./Page 2/Countrycard"
import ContextProvider from "./Page 2/Contextapi";
import ContextProvider1 from "./Page 3/Contextapi";
import Budgetpage from "./Page 3/Budgetpage";
import Eachcard from "./Page 3/Eachcard"
import Ask_budget from "./Page 3/Ask_budget";
import useThemeStore from './assets/themeStore';
import Fullpage1 from './Page 1/Fullpage1';

// const router=createBrowserRouter(
//   [
    // {path:"/",
//       element:
//       <div>
//         <Navbar/>
//         <Home/>
//       </div>
//     },
//     {path:"/pastes",
//       element:
//       <div>
//         <Navbar/>
//         <Paste/>
//       </div>
//     },
//     {path:"/pastes/:id",
//       element:
//       <div>
//         <Navbar/>
//         <ViewPaste/>
//       </div>
//     },
//   ]
// );
function App() {
  const { theme,settheme } = useThemeStore();

  // window.onload = function () {
  //   localStorage.setItem('theme','light')

  // };
  


  useEffect(() => {
    document.documentElement.className = theme; // ✅ Applies Tailwind styles
    document.body.style.transition = "background-color 0.3s ease"; // ✅ Smooth transition
    document.body.style.backgroundColor = theme === "dark" ? "#000" : "#fff"; // ✅ Update instantly
  }, [theme]); // ✅ Runs whenever theme changes


  const router=createBrowserRouter(  
    [
      {path:"/",
        element:
        <div className={`flex flex-col justify-between items-center max-w-screen`}>


          <Navbar/>
          <Fullpage1>
            <Pg1/>
            <div className="md:grid md:grid-cols-2">
              <CryptoCard/>
            </div>
          </Fullpage1>
        </div>
      },
      {path:"/map",
          element:
          <div className="flex flex-col justify-between items-center ">
            <Navbar/>
            <CryptoMap />
            <Countrycard/>
          </div>
      },
      {path:"/trip",
          element:
          <div className=" flex flex-col min-h-screen justify-between items-center">
            <Navbar
              style={{
                position: 'relative',
                zIndex: 10, // Higher than the overlay's zIndex
              }}
            />
            <Ask_budget/>
          </div>
      },
      {path:"/trip/:id",
          element:
          <div className="flex flex-col justify-between items-center ">
            <Navbar/>
            <Budgetpage/>
            <Eachcard/>
          </div>
        },
    ]
  );


  return (
    <API>   
      <ContextProvider>
        <ContextProvider1>
        <RouterProvider router={router} />
        </ContextProvider1>
      </ContextProvider>
    </API>
  )
}

export default App
