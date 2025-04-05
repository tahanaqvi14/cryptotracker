import { createContext, useState } from "react";

// Create Context
export const CountryContext = createContext(); // Naming should start with a capital letter

const ContextProvider1 = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [flag, setflag] = useState('US');

    
    return (
        <CountryContext.Provider value={{ flag, setflag, isVisible, setIsVisible, isClosing, setIsClosing ,selectedCountry, setSelectedCountry}}>
            {children}
        </CountryContext.Provider>
    );
};

export default ContextProvider1; // Renamed to ContextProvider1 for clarity
