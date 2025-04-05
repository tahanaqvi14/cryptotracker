import { useState,useEffect,useContext } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { CountryContext } from "./Contextapi";
import useThemeStore from '../assets/themeStore';



export default function Budgetpage() {
  
  const { id } = useParams(); 
  const formatter = new Intl.NumberFormat('en-US'); // Use 'en-US' for US formatting
  const { sortBy,setSortBy,filter, setFilter, calculatedData  } =useContext(CountryContext);
  const { theme} = useThemeStore();


  useEffect(() => {
      axios.get(`http://localhost:5000/trip/${id}`) // Fetch data from backend
          .then()
          
          .catch(error => console.error("Error fetching data:", error));
          
  }, []);
  const formattedNumber = formatter.format(id);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);


  const sortOptions = [
    "Price: Low to High",
    "Price: High to Low",
    "Name: A-Z",
    "Name: Z-A",
  ];

  const filterss = [
    "All Regions",
    "Asia",
    "Europe",
    "Americas"
  ];

  return (
      
    <div className={`w-full p-4 sm:p-6 ${theme==="dark"?'bg-black':'bg-white'}`}>
          {/* bg-gradient-to-br from-[#FFFFFF] to-[#F8F9FA]  */}
      <div className="flex text-sm justify-between ">
        {/* Left Section */}
        <div className="flex flex-col justify-center items-centre sm:items-start text-center w-2/3 ">
          <h1 className={`text-2xl sm:text-3xl font-bold ${theme==="dark"?'text-white':'text-black'}`}>Travel Within Your Budget</h1>
          <p className={`${theme==="dark"?'text-gray-300':'text-gray-700'} max-w-xl `}>
            Discover amazing destinations that fit perfectly within your budget.
            Choose a package below to explore countries tailored to your spending
            preferences.
          </p>
      
          {/* Travel Budget Section  */}
          <div className={`${theme==="dark"?'bg-[#1E1C1D]':'bg-[#DCDCDC]'} p-4 rounded-4xl flex items-center  justify-between sm:w-full sm:max-w-md w-fit mt-6 shadow-md`}>
            <div className={`${theme==='dark'?'text-white':'text-black'} w-fit`}>
              <p className="text-sm ">Your Travel Budget</p>
              <h2 className="text-3xl font-bold ">{`$${formattedNumber}`}</h2>
            </div>
            <div className={`hidden sm:flex ${theme==='dark'?'bg-[#CD302E] text-white':'bg-white text-black'} font-medium px-4 py-2 rounded-md shadow-md`}>
              Showing All Destinations
            </div>
          </div>
      
          {/* Important Notes Section bg-gray-100 text-gray-800*/}
          <div className={`mt-10 p-4 border rounded-lg  ${theme==='dark'?'bg-[#1E1C1D] text-white':'bg-gray-100 text-gray-800'} max-w-7xl text-left`}>
            <div className="font-semibold flex items-center space-x-2">
              <img className="max-w-4" src="/information.png" alt="" />
              <p>Important notes about our pricing:</p>
            </div>
            <ul className="list-disc list-inside mt-2 text-sm">
              <li>All prices are average estimates for a 7-day trip per person.</li>
              <li>Prices represent middle-range accommodations and experiences (not luxury or budget).</li>
              <li>Prices DO NOT include international airfare or travel insurance.</li>
              <li>Actual costs may vary based on season, exchange rates, and personal preferences.</li>
            </ul>
          </div>
        </div>
      
        {/* Right Section (Bars) */}
        <div className="w-1/3 self-start ">
        {/* #1E1C1D bg-[#F3F4F6] */}
          <div className={`${theme==='dark'?'bg-[#1E1C1D]':'bg-[#DCDCDC]'} p-4 rounded-lg shadow-md`}>
            <h2 className={`text-sm sm:text-lg font-semibold mb-2 ${theme==='dark'?'text-white':'text-black'}`}>Destinations by Continent</h2>

            <div className="mb-2">
              <p className={`${theme==='dark'?'text-white':'text-black'}`}>Asia</p>
              <div className="h-3 bg-yellow-400 rounded-full" 
                  style={{ width: `${!calculatedData || calculatedData[0] === 0 ? 4 : calculatedData[1]}%` }}>
              </div>

            <p className={`text-sm ${theme==='dark'?'text-gray-400':'text-gray-700'}`}>{calculatedData[0]} destinations</p>
            </div>
      
            <div className="mb-2">
              <p className={`${theme==='dark'?'text-white':'text-black'}`}>Europe</p>
              <div className="h-3 bg-orange-400 rounded-full" 
                  style={{ width: `${!calculatedData || calculatedData[2] === 0 ? 4 : calculatedData[3]}%` }}>
              </div>
              <p className={`text-sm ${theme==='dark'?'text-gray-400':'text-gray-700'}`}>{calculatedData[2]} destinations</p>
            </div>

            <div className="mb-2">
              <p className={`${theme==='dark'?'text-white':'text-black'}`}>Americas</p>
              <div className="h-3 bg-green-400 rounded-full" 
                  style={{ width: `${!calculatedData || calculatedData[4] === 0 ? 4 : calculatedData[5]}%` }}>
              </div>
              <p className={`text-sm ${theme==='dark'?'text-gray-400':'text-gray-700'}`}>{calculatedData[4]} destinations</p>
            </div>
          </div>
        </div>
      </div>

      

      <div className={`${theme==='dark'?'bg-black':'bg-white'} flex items-center justify-between p-4 rounded-lg shadow`}>
        

        <h2 className={`text-[14px] sm:text-3xl  font-semibold ${theme==='dark'?'text-white':'text-black'}`}>{calculatedData[6]} Destinations Within Budget</h2>

        <div className="flex items-center gap-4">
          {/* Filter Section */}
          <div className="hidden md:flex items-center gap-2">{filterss.map((a) => (<button
            key={a} className={`px-4 py-1 font-medium rounded-full ${a === filter ? "bg-gray-500 text-white" : "border border-gray-300 "}${theme==='dark'?'hover:bg-[#343432]':'hover:bg-gray-200 '} `} 
            onClick={() => setFilter(a)}
            >{a}</button>
            ))}
          </div>

          {/* Filter Section with Dropdown */}
          <div className="relative md:hidden">
            <button
              className={`px-4 py-1 border border-gray-300 ${theme==='dark'?'hover:bg-[#343432] text-white':'hover:bg-gray-200 text-gray-700'}  rounded-full flex items-center gap-1`}
              onClick={() => {setIsOpen1(!isOpen1) 
                setIsOpen(false) }}
            >
              <span>↕</span> {filter}
            </button>
            {isOpen1 && (
              <div className={`absolute right-0 mt-2 w-40 ${theme==='dark'?'bg-[#1E1C1D] ':' bg-white'}  border border-gray-200 shadow-md rounded-md`}>
                {filterss.map((option) => (
                  <button
                    key={option}
                    className={`block w-full text-left px-4 py-2 ${theme==='dark'?'text-white hover:bg-[#343432]':'text-gray-700 hover:bg-gray-200'} `}
                    onClick={() => {
                      setFilter(option);
                      setIsOpen1(false);
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sort Section */}
          <div className="relative">
            <button
              className={`px-4 py-1 border border-gray-300 ${theme==='dark'?'hover:bg-[#343432] text-white':'hover:bg-gray-200 text-gray-700'}  rounded-full flex items-center gap-1`}
              onClick={() => {setIsOpen(!isOpen)
                setIsOpen1(false)
              }}
            >
              <span>↕</span> {sortBy}
            </button>
            {isOpen && (
              <div className={`absolute right-0 mt-2 w-40 ${theme==='dark'?'bg-[#1E1C1D] ':' bg-white'}  border border-gray-200 shadow-md rounded-md`}>
                {sortOptions.map((option) => (
                  <button
                    key={option}
                    className={`block w-full text-left px-4 py-2 ${theme==='dark'?'text-white hover:bg-[#343432]':'text-gray-700 hover:bg-gray-200'} `}
                    onClick={() => {
                      setSortBy(option);
                      setIsOpen(false);
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
    );
}


