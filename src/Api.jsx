import React, { useState, useEffect, createContext } from "react";

const AppContext = createContext();

export default function API({ children }) {  // ✅ Accepts children (fixes issue)
  const [currency_key, setCurrencyKey] = useState("USD");
  const [cryptoData, setCryptoData] = useState([]);

  async function fetchCryptoData(key) {
    const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${key}`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setCryptoData(data.slice(0, 10));
    } catch (error) {
      console.error("Error fetching data:", error);
      setCryptoData([]);
    }
  }

  useEffect(() => {
    fetchCryptoData(currency_key);
  }, [currency_key]);

  return (
    <AppContext.Provider value={{ cryptoData, fetchCryptoData, currency_key, setCurrencyKey }}>
      {children}  {/* ✅ Now React Router controls rendering */}
    </AppContext.Provider>
  );
}

export { AppContext };
