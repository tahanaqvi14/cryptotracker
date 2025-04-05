import React, { useState, useEffect,useContext } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import ReactDOM from "react-dom";
import { CountryContext } from "./Contextapi";
import useThemeStore from '../assets/themeStore';



const CryptoMap = () => {
    const {selectedCountry, setSelectedCountry } = useContext(CountryContext);
    const {setIsVisible}=useContext(CountryContext);
    const {setflag}=useContext(CountryContext);
    const { theme} = useThemeStore();

    const [worldMap, setWorldMap] = useState(null);
    const [hoveredCountry, setHoveredCountry] = useState(null);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

    const RED_COUNTRIES = [
      "AFG", "DZA", "BGD", "BTN", "BOL", "BDI", "CMR", "CHN", "COG", "ECU",
      "EGY", "ERI", "IRQ", "XKX", "KWT", "LBY", "MRT", "MAR", "NPL", "PRK",
      "MKD", "PAK", "QAT", "SDN", "SYR", "TUN", "TKM", "YEM"
    ];
    const ORANGE_COUNTRIES = [
      "AGO", "AZE", "BLR", "KHM", "COL", "COD", "CUB", "DOM", "ETH", "GHA",
      "HND", "IND", "IDN", "IRN", "JOR", "KAZ", "KEN", "KGZ", "LAO", "LBN",
      "MWI", "MYS", "MNG", "MNE", "MMR", "NAM", "NGA", "OMN", "PRY", "PER",
      "RUS", "RWA", "SAU", "SRB", "LKA", "TJK", "TZA", "THA", "TUR", "UGA",
      "UZB", "VEN", "VNM", "ZMB", "ZWE"
    ];
    const GREEN_COUNTRIES = [
      "ALB", "ATG", "ARG", "ARM", "AUS", "AUT", "BHS", "BHR", "BRB", "BEL", "BEN",
      "BWA", "BRA", "BGR", "CAN", "CPV", "CAF", "CHL", "CRI", "HRV", "CYP", "CZE",
      "DNK", "DMA", "SLV", "EST", "FIN", '-99', "GEO", "DEU", "GRC", "GRD", "HUN",
      "ISL", "IRL", "ISR", "ITA", "JAM", "JPN", "LVA", "LIE", "LTU", "LUX", "MLT",
      "MHL", "MUS", "MEX", "MDA", "MCO", "NLD", "NZL", "NOR", "PAN", "PHL", "POL",
      "PRT", "ROU", "KNA", "LCA", "VCT", "SMR", "SYC", "SGP", "SVK", "SVN", "ZAF",'KOR',
      "ESP", "SWE", "CHE", "TWN", "UKR", "ARE", "GBR", "USA", "URY"
    ];
    
    
    
  useEffect(() => {
    // Load world map data
    fetch("/world-110m.json") // Ensure it's inside the 'public/' folder
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // console.log("Map Data Loaded:", data); // Debugging
        setWorldMap(data);
      })
      .catch((error) => console.error("Error loading map data:", error));
  }, []);
  
  if (!worldMap) return <p>Loading map...</p>;

  return (
    <>
    {/* Tooltip (Rendered outside the map using Portal) */}
    {hoveredCountry &&
      ReactDOM.createPortal(
        <div
          style={{
            position: "fixed",
            left: cursorPosition.x + 10,
            top: cursorPosition.y + 10,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "#fff",
            padding: "5px 10px",
            borderRadius: "5px",
            fontSize: "12px",
            pointerEvents: "none",
            zIndex: 1000,
          }}
        >
          {hoveredCountry}
        </div>,
        document.body
      )}

        <ComposableMap style={{ transform: "translate(-10px, 0px)" , backgroundColor: theme === "dark" ? "black" : "white"}}   >
            <Geographies geography={worldMap}>
                {({ geographies }) =>
                geographies.map((geo) => {
                    const countryISO = geo.properties.ISO_A3; // Get ISO code
                    const countryName = geo.properties.NAME; // Get country name
                    const isSelected = selectedCountry === geo.rsmKey;
                    const isRedCountry = RED_COUNTRIES.includes(countryISO);
                    const isOrangeCountry = ORANGE_COUNTRIES.includes(countryISO);
                    const isGreenCountry = GREEN_COUNTRIES.includes(countryISO);
                    return (
                    <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onClick={() => {
                          const countryCodeA3=geo.properties.NAME
                          // console.log(countryCodeA3)
                          
                          setflag(geo.properties.NAME);
                          // const a={`https://restcountries.com/v3.1/name/united%20states`
                          setSelectedCountry((prevCountry) => {
                            if (prevCountry === geo.rsmKey) {

                              return null; // Deselect if it's already selected
                            } else {
                              // console.log(`Selected Country: ${geo.properties.ISO_A3}`);
                              setIsVisible(true);
                              // console.log(`Selected Country: ${geo.properties.NAME}, ISO A3 Code: ${countryCodeA3}`);
                              return geo.rsmKey; // Select the new country  
                            }
                          });
                        
                        
                        // console.log("Selected Country:", countryName); // Log selected country
                        // setSelectedCountry(isSelected ? null : geo.rsmKey);
                        }}
                        onMouseEnter={(event) => {
                          if (window.innerWidth < 768) return;
                          setHoveredCountry(countryName);
                          setCursorPosition({ x: event.clientX, y: event.clientY });
                        }}
                        onMouseMove={(event) => {
                          if (window.innerWidth < 768) return;
                          setCursorPosition({ x: event.clientX, y: event.clientY });
                        }}
                        onMouseLeave={() =>{
                          if (window.innerWidth < 768) return;
                          setHoveredCountry(null)}
                        }
                        
                        style={{
                        default: {
                            fill: isSelected
                            ? "#FFD700" // Blue for selected country
                            : isRedCountry
                            ? "#E2252B" // Red for restricted countries
                            : isOrangeCountry
                            ? "#FF8C00" // Darker orange on hover
                            : isGreenCountry
                            ? "#32CD32" // Darker orange on hover
                      
                            : "#ACAFB3", // Green for allowed countries
                          
                            stroke: theme === "dark" ? "#ffffff" : "black",
                            strokeWidth: 0.3,
                            outline: "none",
                            filter: selectedCountry && !isSelected ? "blur(3px)" : "none", // Blur effect
                        },
                        hover: {
                            fill: 
                            //isSelected
                            //? "#FFE32C" // Orange for selected hover
                            //:
                            isRedCountry
                            ? "#BC5449" // Darker red on hover
                            : selectedCountry
                            ? "#98FB98"
                            //"#2ecc71 " // Maintain default blue when another country is selected
                            : "#98FB98", 
                            // Default hover color
                            stroke: theme === "dark" ? "#ffffff" : "black",
                            strokeWidth: 1,
                            outline: "none",
                        },
                        pressed: {
                            fill:
                            isRedCountry
                            ? "#FF2A08" // Darker red on hover
                            : selectedCountry
                            ? "#EF750F"
                            //"#2ecc71 " // Maintain default blue when another country is selected
                            : "#0B8D16", // Default hover color
                            // "#ffcc00",

                            stroke: theme === "dark" ? "#ffffff" : "black",
                            strokeWidth: 2,
                            outline: "none",
                        },
                        }}
                    />
                    );
                })
                }
            </Geographies>
        </ComposableMap>
    </>
  );
};

export default CryptoMap;

