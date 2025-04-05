

import { createContext, useState } from "react";

// Create Context
export const CountryContext = createContext(); // Naming should start with a capital letter

const ContextProvider = ({ children }) => {
    const [sortBy, setSortBy] = useState("Name: A-Z"); 
    const [filter, setFilter] = useState("All Regions");
    const [calculatedData, setCalculatedData] = useState([]); // New state


    
    return (
        <CountryContext.Provider value={{ sortBy, setSortBy,filter, setFilter,calculatedData, setCalculatedData}}>
            {children}
        </CountryContext.Provider>
    );
};

export default ContextProvider; // Renamed to ContextProvider for clarity
