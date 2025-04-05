import React, { useEffect, useState, useContext, useMemo } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CountryContext } from "./Contextapi";
import useThemeStore from "../assets/themeStore";

const Eachcard = () => {
  const { id } = useParams();
  const { filter, sortBy, setCalculatedData } = useContext(CountryContext);
  const { theme } = useThemeStore();
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`http://localhost:5000/trip/${id}`, { withCredentials: true });
        setCountries(data);

        // Calculate and update region percentages
        const continents = ["Asia", "Europe", "Americas"];
        const counts = continents.map(c => data.filter(d => d.continent === c).length);
        const total = data.length;

        setCalculatedData([
          ...counts.flatMap(c => [c, Math.round((c / total) * 100)]),
          total
        ]);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id, setCalculatedData]);

  // Filter by region
  const filteredCountries = useMemo(() => 
    filter !== "All Regions" ? countries.filter(c => c.continent === filter) : countries,
  [countries, filter]);

  
  useEffect(() => {
    setCurrentPage(1);
  }, [filter,sortBy]);
  
  // Sort the filtered results
  const sortedCountries = useMemo(() => {
    return [...filteredCountries].sort((a, b) => {
      const key = sortBy.includes("Price") ? "travelCost" : "name";
      return sortBy.includes("Low") || sortBy.includes("A-Z")
        ? (a[key] || 0) - (b[key] || 0)
        : (b[key] || 0) - (a[key] || 0);
    });
  }, [filteredCountries, sortBy]);

  // Get paginated items
  const displayedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedCountries.slice(start, start + itemsPerPage);
  }, [sortedCountries, currentPage, itemsPerPage]);

  return (
    <div className={`flex flex-wrap justify-center gap-6 p-10 w-full ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}>
      {isLoading ? (
        <div className="flex justify-center items-center w-full">
          <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${theme === "dark" ? "border-gray-300" : "border-blue-500"}`}></div>
          <span className="ml-2">Loading...</span>
        </div>
      ) : displayedItems.length ? (
        displayedItems.map((destination) => (
          <div key={destination._id} className={`w-80 sm:w-96 ${theme === "dark" ? "bg-zinc-900 text-white border-gray-500" : "bg-white text-black border-gray-200"} shadow-2xl rounded-xl border p-6 transition duration-300 transform`}>
            {/* Image */}
            <div className={`w-full h-72 ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"} flex items-center justify-center rounded-lg`}>
              {destination.image ? (
                <img className="w-full h-full object-cover rounded-lg" src={destination.image} alt={destination.name} />
              ) : (
                <div className={`flex items-center justify-center ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>📷</div>
              )}
            </div>

            {/* Country & Price */}
            <div className="mt-3 flex w-full justify-between items-center">
              <h2 className="text-xl font-bold">{destination.name}</h2>
              <p className={`font-semibold px-2 py-1 rounded-md text-sm ${theme === "dark" ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-black"}`}>${destination.travelCost}</p>
            </div>

            {/* Description */}
            <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"} text-sm mt-2`}>
              Enjoy the perfect balance of culture, cuisine, and comfort in this European gem.
            </p>

            {/* Attractions */}
            <div className="mt-4">
              <p className={`font-semibold flex items-center gap-1 ${theme === "dark" ? "text-gray-300" : "text-gray-800"}`}>Top Attractions</p>
              <ul className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"} text-sm mt-1 space-y-1`}>
                {destination.attractions.map((place, index) => <li key={index}>⭐ {place}</li>)}
              </ul>
            </div>

            {/* Explore Button */}
            <button className={`mt-5 w-full flex items-center justify-center gap-2 px-4 py-2 border rounded-md transition ${theme === "dark" ? "border-gray-600 text-gray-300 hover:bg-gray-700" : "border-gray-300 text-gray-800 hover:bg-gray-100"}`}>
              🌍 Explore Destination
            </button>
          </div>
        ))
      ) : (
        <div className="w-full text-center py-10">
          <p className={`text-xl ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>No countries to show</p>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-between w-screen mt-10">
        <button className={`px-6 py-2 rounded-md font-semibold transition ${theme === "dark" ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`} onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>
          ⬅️ Previous
        </button>
        <button className={`px-6 py-2 rounded-md font-semibold transition ${theme === "dark" ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`} onClick={() => setCurrentPage(p => Math.min(p + 1, Math.ceil(sortedCountries.length / itemsPerPage)))} disabled={currentPage * itemsPerPage >= sortedCountries.length}>
          Next ➡️
        </button>
      </div>
    </div>
  );
};

export default Eachcard;
