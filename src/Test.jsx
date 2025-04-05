import React from 'react';
import { useEffect, useState } from "react";
import axios from 'axios';

export default function Test() {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/countries") // Fetch data from backend
            .then(response => setCountries(response.data)) // Store in state
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    return (
        <div>
            <h2>Travel Destinations</h2>
            <ul>
                {countries.map((country) => (
                    <li key={country._id}>
                        <h3>{country.name}</h3>
                        <p><b>Capital:</b> {country.capital}</p>
                        <p><b>Attractions:</b> {country.attractions.join(", ")}</p>
                        <p><b>Travel Cost:</b> ${country.travelCost}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
