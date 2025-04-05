import React, { useState, useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../Api";
import useThemeStore from '../assets/themeStore';

const Pg1 = () => {
  const [hovered, setHovered] = useState(null);
  const { fetchCryptoData, setCurrencyKey } = useContext(AppContext);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const { theme} = useThemeStore();

  function select(currency) {
    setSelectedCurrency(currency);
    setCurrencyKey(currency);
    fetchCryptoData(currency);

    // Click effect fix
    const btn = document.querySelector(`button[data-currency="${currency}"]`);

    btn.classList.remove("clicked");
    
    // Using requestAnimationFrame ensures it updates instantly
    requestAnimationFrame(() => {
      btn.classList.add("clicked");
    });

    setTimeout(() => btn.classList.remove("clicked"), 150);
  }

  return (
    <StyledWrapper theme={theme}>
      <div className=" header flex flex-col sm:flex-row max-w-full justify-between py-4">
        <div>
          <h1 className="title">Cryptocurrency Prices</h1>
          <p className="subtitle">Live prices of top cryptocurrencies in real-time</p>
        </div>

        <div className="currency-selector w-fit mt-7 sm:mt-0">
          {["USD", "EUR", "GBP"].map((currency) => (
            <button
              key={currency}
              data-currency={currency}
              onClick={() => select(currency)}
              onMouseEnter={() => setHovered(currency)}
              onMouseLeave={() => setHovered(null)}
              className={`currency-btn ${
                selectedCurrency === currency ? "selected" : ""
              } ${hovered === currency ? "hovered" : hovered ? "blur" : ""}`}
            >
              {currency}
            </button>
          ))}
        </div>
      </div>
    </StyledWrapper>
  );
};

// theme
//   @media (max-width: 768px) {
  // .currency-selector {
  // }
const StyledWrapper = styled.div`
  .currency-selector {
    display: flex;
    background: ${(props) => (props.theme === "dark" ? "#1F1F1F" : "#ebebeb")};
    border-radius: 8px;
    padding: 4px;
  }



  .currency-btn {
    padding: 10px 18px;
    border: none;
    font-size: 14px;
    font-weight: 600;
    color: ${(props) => (props.theme === "dark" ? "" : "#333")};
    background: transparent;
    border-radius: 6px;
    transition: all 0.15s ease-in-out;
    position: relative;
    z-index: 1;
    cursor: pointer;
  }

  .selected {
    background: ${(props) => (props.theme === "dark" ? "white" : "black")};
    color: ${(props) => (props.theme === "dark" ? "black" : "white")};
    font-weight: 700;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
  }

  .hovered {
    background: ${(props) => (props.theme === "dark" ? "white" : "black")};
    color: ${(props) => (props.theme === "dark" ? "black" : "white")};
    font-weight: 700;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  }

  .blur {
    filter: blur(2px);
    opacity: 0.5;
  }

  /* Tiny Press & Glow Effect */
  .clicked {
    transform: translateY(2px); /* Slight push down */
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.4);
  }
`;

export default Pg1;
