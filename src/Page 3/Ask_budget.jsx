import React, { useState, useContext, useEffect } from 'react';
import { AppContext } from "../Api";
import useThemeStore from '../assets/themeStore';

export default function Ask_budget() {
  const { theme } = useThemeStore();
  const { cryptoData } = useContext(AppContext);
  const [selectedCurrency, setSelectedCurrency] = useState('USDC');
  const [amount, setAmount] = useState('');
  const [r, setR] = useState('');

  useEffect(() => {
    // Disable scrolling when the component mounts
    document.body.style.overflow = "hidden";

    // Re-enable scrolling when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  function findByProperty() {
    const result = cryptoData.find(item => item.symbol.toLowerCase() === selectedCurrency.toLowerCase());
    if (result) {
      setR(Math.round(result.current_price * amount));
      console.log("thsi is:",r)
    } else {
      console.error('Currency not found in cryptoData');
    }
  }

  return (
    <div
      style={{
        backgroundImage: `url('/background.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: theme === "dark" ? '#FFFFFF' : '#000000',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'fixed',
          top: '3rem',
          left: 0,
          right: 0,
          bottom: 0,
          backdropFilter: 'blur(20px)',
          backgroundColor: theme === "dark" ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.3)',
          zIndex: 1,
        }}
      ></div>

      <div
        style={{
          backgroundColor: theme === "dark" ? '#1F1F1F' : 'white',
          borderRadius: '1rem',
          padding: '1.5rem',
          width: '100%',
          maxWidth: '24rem',
          position: 'relative',
          zIndex: 10,
          color: theme === "dark" ? '#FFFFFF' : '#000000',
          boxShadow: theme === "dark"
            ? 'rgba(0, 0, 0, 0.5) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px'
            : 'rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px',
        }}
      >
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', textAlign: 'center' }}>
          Enter Amount
        </h2>
        <p
          style={{
            fontSize: '0.875rem',
            color: theme === "dark" ? '#A3A3A3' : '#6B7280',
            textAlign: 'center',
            marginTop: '0.5rem',
          }}
        >
          Please specify your budget and select your preferred currency
        </p>

        <div style={{ marginTop: '1rem' }}>
          <label
            style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: theme === "dark" ? '#E5E7EB' : '#374151',
              marginBottom: '0.5rem',
            }}
          >
            Amount
          </label>
          <input
            type="number"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: `1px solid ${theme === "dark" ? '#4B5563' : '#D1D5DB'}`,
              borderRadius: '0.5rem',
              outline: 'none',
              fontSize: '1rem',
              backgroundColor: theme === "dark" ? '#1F2937' : '#FFFFFF',
              color: theme === "dark" ? '#FFFFFF' : '#000000',
            }}
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div style={{ marginTop: '1rem' }}>
          <label
            style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: theme === "dark" ? '#E5E7EB' : '#374151',
              marginBottom: '0.5rem',
            }}
          >
            Currency
          </label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {['USDC', 'BTC', 'SOL'].map((currency) => (
              <button
                key={currency}
                onClick={() => setSelectedCurrency(currency)}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  border: `1px solid ${theme === "dark" ? '#4B5563' : '#D1D5DB'}`,
                  borderRadius: '0.5rem',
                  fontWeight: '600',
                  fontSize: '0.875rem',
                  transition: 'background-color 0.2s, color 0.2s',
                  backgroundColor: selectedCurrency === currency
                    ? theme === "dark"
                      ? '#FFFFFF'
                      : '#000000'
                    : theme === "dark"
                    ? '#1F2937'
                    : '#FFFFFF',
                  color: selectedCurrency === currency
                    ? theme === "dark"
                      ? '#000000'
                      : '#FFFFFF'
                    : theme === "dark"
                    ? '#FFFFFF'
                    : '#374151',
                }}
              >
                {currency}
              </button>
            ))}
          </div>
        </div>

        <a
          href={`/trip/${r}`}
          style={{
            width: '100%',
            display: 'inline-block',
            textAlign: 'center',
            padding: '0.75rem',
            borderRadius: '0.5rem',
            fontWeight: '600',
            fontSize: '0.875rem',
            marginTop: '1.5rem',
            transition: 'opacity 0.2s',
            cursor: amount === '' || amount == 0 ? 'not-allowed' : 'pointer',
            backgroundColor: amount === '' || amount == 0
              ? theme === "dark"
                ? '#374151'
                : '#E6E6E6'
              : theme === "dark"
              ? '#FFFFFF'
              : '#000000',
            color: amount === '' || amount == 0
              ? theme === "dark"
                ? '#9CA3AF'
                : '#A2A2A2'
              : theme === "dark"
              ? '#000000'
              : '#FFFFFF',
          }}
          disabled={amount === '' || amount == 0}
          onMouseEnter={(e) => (e.target.style.opacity = '0.9')}
          onMouseLeave={(e) => (e.target.style.opacity = '1')}
          onClick={findByProperty}
        >
          Submit
        </a>
      </div>
    </div>
  );
}