import React, { useContext, useEffect, useState, useMemo } from "react";
import "animate.css";
import { CountryContext } from "./Contextapi";
import "./Countrycard.css";
import Countryinfo from "./Countryinfo.json";
import useThemeStore from '../assets/themeStore';



const Countrycard = () => {
  const { flag, isVisible, setIsVisible, isClosing, setIsClosing, setSelectedCountry } =
    useContext(CountryContext);
  console.log('this is flag',flag)
  // const [countryData, setCountryData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { theme} = useThemeStore();


  // ✅ Memoize correctedFlag to prevent unnecessary re-renders
  const correctedFlag = useMemo(() => {
    // return flag ===  ?  : ;
    switch (flag) {
      case "Dem. Rep. Congo":
        return "Democratic Republic of the Congo";
        break;
      case "S. Sudan":
        return sudan;
      default:
        return flag
        break;
    }
  }, [flag]); 


  // ✅ Memoize country selection from Countryinfo.json
  let selection = useMemo(() => {
    return Countryinfo.find((c) => c.name.includes(correctedFlag)) || null;
  }, [correctedFlag]);

  if (!selection) {
    selection={
      name:flag}
  }

  useEffect(() => {
    if (!flag) return;
    setIsLoading(true);
    setError(null);

    fetch(`https://restcountries.com/v3.1/name/${correctedFlag}`)
      .then((response) => {
        console.log('response:',response);
        if (!response.ok) {
          throw new Error("Country not found");
        }
        return response.json();
      })
      .then((data) => {
        // selection.flagofcountry=`https://flagsapi.com/${countryData.cca2}/flat/64.png`
        console.log('data:',data[0])
        selection.flagofcountry=`https://flagsapi.com/${data[0].cca2}/flat/64.png`
        console.log(selection)
      })
      .catch((error) => {
        setError(error.message);
        // setCountryData(null);
      })
      .finally(() => {
        setIsLoading(false);
      });



  }, [correctedFlag]); 
  // ✅ Fetch runs only when correctedFlag changes

  const handleClose = () => {
    setIsClosing(true);
    setSelectedCountry(null);
    setTimeout(() => {
      setIsClosing(false);
      setIsVisible(false);
    }, 500);
  };

  if (!isVisible) return null;

  
  console.log('selection',selection)

  return (
    <div className="fixed inset-0 flex justify-center items-center overflow-y-auto">
      <div
      // 
        className={`${theme === "dark" ? "bg-[#2B2B2B]" : "bg-gray-100"} p-6 rounded-lg shadow-md max-w-full h-1/2 mx-auto relative animate__animated ${
          isClosing ? "animate__fadeOutDownBig" : "animate__fadeInUp"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700 transition"
        >
          ✖
        </button>

        {/* Header Section */}
        <div className="flex items-start space-x-4">
          <img
          // || !selection 
            src={error ? "./notfound.jpg" : selection.flagofcountry}
            className="w-14 h-14 rounded-2xl relative after:content-[''] after:absolute after:inset-[-10px] after:bg-green-400 after:blur-2xl after:opacity-80 after:rounded-lg"
            alt="Country Flag"
          />
          <div>
            <h1 className="text-xl font-bold">
              {error ? "No data available" : flag || "Unknown"}
            </h1>
            <p className="text-gray-500 text-sm">Cryptocurrency Regulatory Framework</p>
          </div>

          {/* Status Box */}
          <div className={`flex justify-center items-center ${theme === "dark" ? "bg-[#2B2B2B]" : "bg-white"} overflow-hidden`}>
            {error ? (
              <div
                className={`w-28 h-9 flex justify-center items-center rounded-lg shadow-lg overflow-hidden ${
                  selection.status.includes("Illegal") ? "bg-[#ff9371]" : "bg-[#1df001]"
                }`}
              >
                <p
                  className={`text-[20px] font-bold animate-move-loop ${
                    selection.status.includes("Illegal") ? "text-[#ff3d00]" : "text-[#058d00]"
                  }`}
                >
                  {selection.status.toUpperCase()}
                </p>
              </div>
            ) : (
              <div className="w-28 h-9 flex justify-center items-center bg-gray-300 rounded-lg shadow-lg overflow-hidden">
                <p className="text-[20px] font-bold text-gray-600">UNKNOWN</p>
              </div>
            )}
          </div>
        </div>

        {/* Regulatory Approach Section */}
        <div className= {`${theme === "dark" ? "bg-black" : "bg-white"} p-4 mt-6 rounded-lg shadow overflow-auto`}>
          <h3 className="text-lg font-semibold">Regulatory Approach</h3>
          {isLoading ? (
            <p className="text-gray-500 text-sm">Loading...</p>
          ) : error ? (
            <p className="text-red-500 text-sm">{error}</p>
          ) : error ? (
            <p className= {` ${theme === "dark" ? "text-white" : "text-gray-700"} mt-2`}>{selection.details}</p>
          ) : (
            <p className="text-gray-500 text-sm">No data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Countrycard;
