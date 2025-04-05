import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { AppContext } from "../Api";
import useThemeStore from '../assets/themeStore';

const CryptoCard = () => {
  const { theme } = useThemeStore();
  const { cryptoData, currency_key } = useContext(AppContext);
  
  const [clickedCard, setClickedCard] = useState(null); // Store clicked card ID

  const key = [
    { currency: "USD", symbol: "$" },
    { currency: "GBP", symbol: "£" },
    { currency: "EUR", symbol: "€" }
  ];
  const symbolObj = key.find(crypto => crypto.currency === currency_key);
  const symbol = symbolObj ? symbolObj.symbol : "";

  return (
    cryptoData.map((CC) => (
      <motion.div
        key={CC.id}
        className={`relative min-w-80 sm:w-96 rounded-lg border shadow-md overflow-hidden cursor-pointer transition-all m-4 
          ${theme === "dark" ? "bg-black text-white border-gray-300 shadow-neutral-50" : "border-neutral-900 bg-white text-black"}`}
        whileHover={{ scale: 1.05 }}
        onClick={() => setClickedCard(prev => (prev === CC.id ? null : CC.id))} // Toggle logic
      >
        {/* Static Top Section (Icon & Name) */}
        <div className="px-8 py-8 flex items-center gap-3 w-max">
          <img src={CC.image} alt={CC.name} className="h-8" />
          <div>
            <h2 className="uppercase font-bold text-xl">{CC.name}</h2>
            <p className="text-gray-600 uppercase tracking-widest">{CC.symbol}</p>
          </div>
        </div>

        {/* Click Effect - Reveals Price Details */}
        <motion.div
          className={`absolute inset-0 flex flex-col justify-center items-center p-6 rounded-lg transition-opacity duration-300 shadow-lg
            ${theme === "dark" ? "bg-black text-white shadow-neutral-50" : "bg-white text-black"}
            ${clickedCard === CC.id ? "opacity-100" : "opacity-0 sm:hover:opacity-100"}`} // Toggle visibility
        >
          <p className="font-bold text-2xl">{symbol}{CC.current_price.toLocaleString("en-US")}</p>
          <div className="flex space-x-1 mt-1 -ml-3">
            <img 
              src={CC.price_change_percentage_24h > 0 
                ? "../icons8-price-tag-usd-50 (1).png" 
                : "../icons8-price-tag-usd-50.png"} 
              className="h-6" 
            />
            <p className={CC.price_change_percentage_24h > 0 ? "text-green-500" : "text-red-500"}>
              {CC.price_change_percentage_24h.toFixed(2)}% (24h)
            </p>
          </div>
        </motion.div>
      </motion.div>
    ))
  );
};

export default CryptoCard;
