

// import React, { useState, useEffect } from "react";
// import Popup from "./Popup";
// import { FaSearch } from "react-icons/fa";
// import Avenuepark from "../HomePage/Assets/Avenuepark.png";
// import offer from "../HomePage/Assets/offer.png";
// import slide1 from "../HomePage/Assets/slide1.jpg";
// import slide2 from "../HomePage/Assets/slide2.webp";
// import slide3 from "../HomePage/Assets/slide3.webp";
// import slide4 from "../HomePage/Assets/slide4.webp";
// import highlightsline from "../BuilderInnerPage/Assets/highlightsline.png";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// const BASE_URL = "https://crm-bcgg.onrender.com";
// const images = [slide1, slide2, slide3, slide4];

// const PropertyHighlights = ({
//   scrollToApartments,
//   scrollToIndividualHouse,
//   scrollToTopProjects,
//   selectedStateId,
//   setSelectedStateId,
//   setSelectedDistrictId,
//   setPropertyTypeFilter,
//   setPriceRangeFilter,
//   setSearchData,
// }) => {
//   const [activeTab, setActiveTab] = useState("BUY");
//   const [propertyType, setPropertyType] = useState("Apartment");

//   const [priceRange, setPriceRange] = useState("2Cr-5Cr");
//   const [currentImage, setCurrentImage] = useState(0);
//   const [districts, setDistricts] = useState([]);
//   const [loadingDistricts, setLoadingDistricts] = useState(false);
//   const [districtError, setDistrictError] = useState(null);
//   const [selectedDistrict, setSelectedDistrict] = useState("");
//   const navigate = useNavigate();
//   const [showPopup, setShowPopup] = useState(false);
//   const [builders, setBuilders] = useState([]);

//   console.log(selectedStateId);

//   // Fetch districts when selectedStateId changes

//   useEffect(() => {
//     const fetchBuilders = async () => {
//       setLoadingDistricts(true);
//       try {
//         const response = await axios.get(
//           `${BASE_URL}/api/properties/builder-profile`
//         );

//         // Ensure response.data is an array
//         if (!Array.isArray(response.data)) {
//           throw new Error("Invalid data format received from API");
//         }

//         setBuilders(response.data);
//         setDistrictError(null);
//       } catch (error) {
//         setDistrictError("Failed to fetch builders. Please try again.");
//         console.error("Error fetching builders:", error);
//       } finally {
//         setLoadingDistricts(false);
//       }
//     };

//     fetchBuilders();
//   }, []);

//   // Update districts when state changes
//   // Updated city filtering in PropertyHighlights.jsx
//   useEffect(() => {
//     if (selectedStateId && Array.isArray(builders) && builders.length > 0) {
//       setLoadingDistricts(true);
//       try {
//         const normalizedSelectedState = selectedStateId.trim().toLowerCase();

//         // Filter builders by selected state (case-insensitive)
//         const stateBuilders = builders.filter(
//           (builder) =>
//             builder.address?.state &&
//             builder.address.state.trim().toLowerCase() ===
//               normalizedSelectedState
//         );

//         // Normalize and deduplicate cities
//         const cityMap = new Map();

//         stateBuilders.forEach((builder) => {
//           if (builder.address?.city) {
//             const normalizedCity = builder.address.city.trim().toLowerCase();
//             if (!cityMap.has(normalizedCity)) {
//               // Store the first properly cased version we encounter
//               cityMap.set(normalizedCity, builder.address.city);
//             }
//           }
//         });

//         // Convert to array of objects with consistent casing
//         const uniqueCities = Array.from(cityMap.entries()).map(
//           ([_, cityName]) => ({
//             id: cityName, // Use the properly cased version
//             name: cityName,
//           })
//         );

//         // Sort alphabetically
//         uniqueCities.sort((a, b) => a.name.localeCompare(b.name));

//         setDistricts(uniqueCities);
//         setDistrictError(null);
//       } catch (error) {
//         setDistrictError("Failed to filter cities. Please try again.");
//         console.error("Error filtering cities:", error);
//       } finally {
//         setLoadingDistricts(false);
//       }
//     } else {
//       setDistricts([]);
//       setSelectedDistrict("");
//     }
//   }, [selectedStateId, builders]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImage((prev) => (prev + 1) % images.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     if (!selectedStateId) {
//       setShowPopup(true);
//     }
//   }, [selectedStateId]);

//   const handleSearch = () => {
//     // Set the filters that will be used in Apartments component
//     // setSelectedDistrictId(selectedDistrict);
//     // setPropertyTypeFilter(propertyType);
//     // setPriceRangeFilter(priceRange);
//     // Scroll to apartments section

//     let searchdata = {
//       districtid: selectedDistrict,
//       propertytype: propertyType,
//       pricerange: priceRange,
//     };
//     console.log(searchdata);
//     setSearchData(searchdata);
//     scrollToApartments();
//   };

//   return (
//     <div className="relative w-full h-[100dvh]">
//       <img
//         src={images[currentImage]}
//         alt="Property highlight"
//         className="w-full h-full object-cover"
//       />
//       <div className="absolute inset-0 bg-black bg-opacity-40"></div>

//       {/* Navbar */}
//       <div className="absolute top-5 left-1/2 transform -translate-x-1/2 hidden md:flex w-[100%] max-w-7xl items-center text-white font-semibold text-sm lg:text-base">
//         <div className="flex flex-1 justify-center space-x-6 lg:space-x-10">
//           <h1
//             onClick={scrollToApartments}
//             className="cursor-pointer flex-shrink-0"
//           >
//             Apartments
//           </h1>
//           <h1 onClick={scrollToTopProjects} className="cursor-pointer">
//             Ongoing Projects
//           </h1>
//           <h1 onClick={scrollToIndividualHouse} className="cursor-pointer">
//             Individual House
//           </h1>
//           <h1 onClick={() => navigate("/contact")} className="cursor-pointer">
//             Contact Us
//           </h1>
//         </div>
//         <div className="flex space-x-3">
//           <Link to="/login">
//             <button className="px-4 py-2 bg-white text-black rounded hover:bg-blue-700 hover:text-white transition">
//               Get Started
//             </button>
//           </Link>
//         </div>
//       </div>

//       {/* Logo */}
//       <div className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-10 md:left-16 bg-white p-2 sm:p-3 rounded-md shadow-lg">
//         <img
//           src={Avenuepark}
//           alt="Casagrand Avenuepark Logo"
//           className="w-20 sm:w-28 md:w-32 h-auto"
//         />
//       </div>

//       {/* Text content */}
//       <div className="absolute top-24 left-5 sm:top-32 sm:left-10 md:top-40 md:left-16 text-white">
//         <h1 className="text-xl sm:text-3xl md:text-4xl font-bold leading-snug">
//           Casagrand Avenuepark <br /> highlight
//         </h1>
//         <img src={highlightsline} alt="" className="mt-6 h-1 sm:mt-8" />
//       </div>

//       {/* Offer badge */}
//       <div className="absolute bottom-24 right-4 sm:bottom-28 sm:right-6 md:bottom-32 md:right-10 w-16 sm:w-20 md:w-auto">
//         <img src={offer} alt="Offer Badge" />
//       </div>

//       {/* Bottom Search Card */}
//       <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-[95%] sm:w-[600px] md:w-[900px] bg-white shadow-xl rounded-tr-lg rounded-br rounded-bl p-4 sm:p-6">
//         {/* Tabs */}
//         <div className="absolute -top-9 left-0 flex space-x-3 sm:space-x-4 md:space-x-6 text-xs sm:text-sm font-semibold">
//           <span className="cursor-pointer px-4 py-2 rounded-tr-lg rounded-tl-lg border-b-2 transition-all bg-gray-100 text-black shadow-md border-gray-200">
//             {activeTab}
//           </span>
//         </div>

//         {/* Filters */}
//         <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6">
//           {/* <div className="flex flex-col text-center sm:text-left sm:pr-10 md:pr-24 md:border-r border-gray-300">
//             <label className="text-gray-700 text-xs sm:text-sm font-semibold">
//               State
//             </label>

//             <button
//               // Removed 'border border-gray-300' and 'hover:border-blue-500 focus:border-blue-500'

//               className="relative mt-1 px-4 py-3 bg-white rounded-lg text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full whitespace-nowrap text-left flex items-center justify-between"
//               onClick={() => setShowPopup(true)}
//             >
//               {selectedStateId ? (
//                 <span className="text-gray-900 font-medium">
//                   State Selected
//                 </span>
//               ) : (
//                 <span className="text-gray-500">Select State</span>
//               )}

              

//               <svg
//                 className="w-4 h-4 text-gray-500"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M19 9l-7 7-7-7"
//                 ></path>
//               </svg>
//             </button>
//           </div> */}

//           <div className="flex flex-col text-center sm:text-left sm:pr-10 md:pr-24 md:border-r border-gray-300">
//             <label className="text-gray-700 text-xs sm:text-sm font-semibold">
//               State
//             </label>

//             <button
//               // Removed 'border border-gray-300' and 'hover:border-blue-500 focus:border-blue-500'

//               className="relative mt-1 text-gray-500 bg-white rounded-lg  w-full whitespace-nowrap text-left flex items-center justify-between"
//               onClick={() => setShowPopup(true)}
//             >
//               {selectedStateId ? (
//                 <span className=" text-xs sm:text-sm "> Select State</span>
//               ) : (
//                 <span className=" text-gray-500 text-xs sm:text-sm bg-transparent focus:outline-none text-center sm:text-left w-full min-w-[120px] ">
//                   Select State
//                 </span>
//               )}

//               <svg
//                 className="w-4 h-4 text-gray-500"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M19 9l-7 7-7-7"
//                 ></path>
//               </svg>
//             </button>
//           </div>

//           <div className="flex flex-col text-center sm:text-left sm:pr-10 md:pr-24 md:border-r border-gray-300">
//             <label className="text-gray-700 text-xs sm:text-sm font-semibold">
//               Location
//             </label>
//             <select
//               className="text-gray-500 text-xs sm:text-sm bg-transparent focus:outline-none text-center sm:text-left w-full min-w-[120px]"
//               value={selectedDistrict}
//               onChange={(e) => setSelectedDistrict(e.target.value)}
//               disabled={!selectedStateId || loadingDistricts}
//             >
//               <option value="">
//                 {selectedStateId ? "Select District" : "Select State First"}
//               </option>
//               {loadingDistricts ? (
//                 <option>Loading districts...</option>
//               ) : districtError ? (
//                 <option>Error loading districts</option>
//               ) : (
//                 districts.map((district) => (
//                   <option key={district.id} value={district.name}>
//                     {district.name}
//                   </option>
//                 ))
//               )}
//             </select>
//           </div>

//           <div className="flex flex-col text-center sm:text-left sm:pr-10 md:pr-24 md:border-r border-gray-300">
//             <label className="text-gray-700 text-xs sm:text-sm font-semibold">
//               Property Type
//             </label>
//             <select
//               className="text-gray-500 text-xs sm:text-sm bg-transparent focus:outline-none text-center sm:text-left w-full min-w-[120px]"
//               value={propertyType}
//               onChange={(e) => setPropertyType(e.target.value)}
//             >
//               <option value="Apartment">Apartment</option>
//               <option value="Villa">Villa</option>
//               <option value="Plot">Plot</option>
//               <option value="Commercial">Commercial</option>
//             </select>
//           </div>

//           <div className="flex flex-col text-center sm:text-left pr-2">
//             <label className="text-gray-700 text-xs sm:text-sm font-semibold">
//               Price Range
//             </label>
//             <select
//               className="text-gray-500 text-xs sm:text-sm bg-transparent focus:outline-none text-center sm:text-left w-full min-w-[120px]"
//               value={priceRange}
//               onChange={(e) => setPriceRange(e.target.value)}
//             >
//               <option value="50L-1Cr">50L-1Cr</option>
//               <option value="1Cr-2Cr">1Cr-2Cr</option>
//               <option value="2Cr-5Cr">2Cr-5Cr</option>
//               <option value="3Cr-5Cr">3Cr-5Cr</option>
//               <option value="1Cr-3Cr">1Cr-3Cr</option>
//               <option value="3Cr-2Cr">3Cr-2Cr</option>
//               <option value="1Cr-4Cr">1Cr-4Cr</option>
//               <option value="2Cr-3Cr">2Cr-3Cr</option>
//               <option value="2Cr-4Cr">2Cr-4Cr</option>
//               <option value="3Cr-4Cr">3Cr-4Cr</option>
//               <option value="4Cr-5Cr">4Cr-5Cr</option>
//             </select>
//           </div>

//           <button
//             onClick={handleSearch}
//             disabled={!selectedDistrict}
//             className={`p-3 rounded-lg transition ${
//               selectedDistrict
//                 ? "bg-orange-500 text-white hover:bg-orange-600"
//                 : "bg-gray-300 text-gray-500 cursor-not-allowed"
//             }`}
//           >
//             <FaSearch size={18} />
//           </button>
//         </div>
//       </div>
//       <Popup
//         selectedLocation={selectedStateId}
//         setSelectedLocation={setSelectedStateId}
//         isVisible={showPopup}
//         setIsVisible={setShowPopup}
//       />
//     </div>
//   );
// };

// export default PropertyHighlights;



import React, { useState, useEffect } from "react";
import Popup from "./Popup";
import { FaSearch } from "react-icons/fa";
import Avenuepark from "../HomePage/Assets/Avenuepark.png";
import offer from "../HomePage/Assets/offer.png";
import slide1 from "../HomePage/Assets/slide1.jpg";
import slide2 from "../HomePage/Assets/slide2.webp";
import slide3 from "../HomePage/Assets/slide3.webp";
import slide4 from "../HomePage/Assets/slide4.webp";
import highlightsline from "../BuilderInnerPage/Assets/highlightsline.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = "https://crm-bcgg.onrender.com";
const images = [slide1, slide2, slide3, slide4];

const PropertyHighlights = ({
  scrollToApartments,
  scrollToIndividualHouse,
  scrollToTopProjects,
  selectedStateId,
  setSelectedStateId,
  setPropertyTypeFilter,
  setPriceRangeFilter,
  setSearchData,
}) => {
  const [activeTab, setActiveTab] = useState("BUY");
  const [propertyType, setPropertyType] = useState("Apartment");
  const [priceRange, setPriceRange] = useState("");
  const [currentImage, setCurrentImage] = useState(0);
  const [districts, setDistricts] = useState([]);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [districtError, setDistrictError] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [priceRanges, setPriceRanges] = useState([]);
  const [loadingPriceRanges, setLoadingPriceRanges] = useState(false);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [builders, setBuilders] = useState([]);

  // Fetch builders and price ranges
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingDistricts(true);
        setLoadingPriceRanges(true);

        // Fetch builders
        const buildersResponse = await axios.get(
          `${BASE_URL}/api/properties/builder-profile`
        );

        if (!Array.isArray(buildersResponse.data)) {
          throw new Error("Invalid data format received from builders API");
        }
        setBuilders(buildersResponse.data);

        // Fetch buildings for price ranges
        const buildingsResponse = await axios.get(
          `${BASE_URL}/api/properties/buildings`
        );

        if (!Array.isArray(buildersResponse.data)) {
          throw new Error("Invalid data format received from buildings API");
        }

        // Extract unique price ranges
        const uniquePriceRanges = [
          ...new Set(
            buildingsResponse.data
              .map((building) => building.priceRange)
              .filter((range) => range) // Filter out undefined/null
          ),
        ].sort((a, b) => {
          // Custom sorting to keep price ranges in order
          const extractNumber = (str) =>
            parseFloat(str.replace(/[^0-9.]/g, ""));
          return extractNumber(a) - extractNumber(b);
        });

        setPriceRanges(uniquePriceRanges);
        if (uniquePriceRanges.length > 0) {
          setPriceRange(uniquePriceRanges[0]);
        }

        setDistrictError(null);
      } catch (error) {
        setDistrictError("Failed to fetch data. Please try again.");
        console.error("Error fetching data:", error);
      } finally {
        setLoadingDistricts(false);
        setLoadingPriceRanges(false);
      }
    };

    fetchData();
  }, []);

  // Update districts when state changes
  useEffect(() => {
    if (selectedStateId && Array.isArray(builders) && builders.length > 0) {
      setLoadingDistricts(true);
      try {
        const normalizedSelectedState = selectedStateId.trim().toLowerCase();

        // Filter builders by selected state (case-insensitive)
        const stateBuilders = builders.filter(
          (builder) =>
            builder.address?.state &&
            builder.address.state.trim().toLowerCase() ===
              normalizedSelectedState
        );

        // Normalize and deduplicate cities
        const cityMap = new Map();

        stateBuilders.forEach((builder) => {
          if (builder.address?.city) {
            const normalizedCity = builder.address.city.trim().toLowerCase();
            if (!cityMap.has(normalizedCity)) {
              // Store the first properly cased version we encounter
              cityMap.set(normalizedCity, builder.address.city);
            }
          }
        });

        // Convert to array of objects with consistent casing
        const uniqueCities = Array.from(cityMap.entries()).map(
          ([_, cityName]) => ({
            id: cityName, // Use the properly cased version
            name: cityName,
          })
        );

        // Sort alphabetically
        uniqueCities.sort((a, b) => a.name.localeCompare(b.name));

        setDistricts(uniqueCities);
        setDistrictError(null);
      } catch (error) {
        setDistrictError("Failed to filter cities. Please try again.");
        console.error("Error filtering cities:", error);
      } finally {
        setLoadingDistricts(false);
      }
    } else {
      setDistricts([]);
      setSelectedDistrict("");
    }
  }, [selectedStateId, builders]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!selectedStateId) {
      setShowPopup(true);
    }
  }, [selectedStateId]);

  const handleSearch = () => {
    const searchdata = {
      districtid: selectedDistrict,
      propertytype: propertyType,
      pricerange: priceRange,
    };
    console.log(searchdata);

    // Set the filters that will be used in Apartments component
    if (setPropertyTypeFilter) setPropertyTypeFilter(propertyType);
    if (setPriceRangeFilter) setPriceRangeFilter(priceRange);
    if (setSearchData) setSearchData(searchdata);

    // Scroll to apartments section
    if (scrollToApartments) scrollToApartments();
  };

  return (
    <div className="relative w-full h-[100dvh]">
      <img
        src={images[currentImage]}
        alt="Property highlight"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Navbar */}
      <div className="absolute top-5 left-1/2 transform -translate-x-1/2 hidden md:flex w-[100%] max-w-7xl items-center text-white font-semibold text-sm lg:text-base">
        <div className="flex flex-1 justify-center space-x-6 lg:space-x-10">
          <h1
            onClick={scrollToApartments}
            className="cursor-pointer flex-shrink-0"
          >
            Apartments
          </h1>
          <h1 onClick={scrollToTopProjects} className="cursor-pointer">
            Ongoing Projects
          </h1>
          <h1 onClick={scrollToIndividualHouse} className="cursor-pointer">
            Individual House
          </h1>
          <h1 onClick={() => navigate("/contact")} className="cursor-pointer">
            Contact Us
          </h1>
        </div>
        <div className="flex space-x-3">
          <Link to="/login">
            <button className="px-4 py-2 bg-white text-black rounded hover:bg-blue-700 hover:text-white transition">
              Get Started
            </button>
          </Link>
        </div>
      </div>

      {/* Logo */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-10 md:left-16 bg-white p-2 sm:p-3 rounded-md shadow-lg">
        <img
          src={Avenuepark}
          alt="Casagrand Avenuepark Logo"
          className="w-20 sm:w-28 md:w-32 h-auto"
        />
      </div>

      {/* Text content */}
      <div className="absolute top-24 left-5 sm:top-32 sm:left-10 md:top-40 md:left-16 text-white">
        <h1 className="text-xl sm:text-3xl md:text-4xl font-bold leading-snug">
          Casagrand Avenuepark <br /> highlight
        </h1>
        <img src={highlightsline} alt="" className="mt-6 h-1 sm:mt-8" />
      </div>

      {/* Offer badge */}
      <div className="absolute bottom-24 right-4 sm:bottom-28 sm:right-6 md:bottom-32 md:right-10 w-16 sm:w-20 md:w-auto">
        <img src={offer} alt="Offer Badge" />
      </div>

      {/* Bottom Search Card */}
      <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-[95%] sm:w-[600px] md:w-[900px] bg-white shadow-xl rounded-tr-lg rounded-br rounded-bl p-4 sm:p-6">
        {/* Tabs */}
        <div className="absolute -top-9 left-0 flex space-x-3 sm:space-x-4 md:space-x-6 text-xs sm:text-sm font-semibold">
          <span className="cursor-pointer px-4 py-2 rounded-tr-lg rounded-tl-lg border-b-2 transition-all bg-gray-100 text-black shadow-md border-gray-200">
            {activeTab}
          </span>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6">
          <div className="flex flex-col text-center sm:text-left sm:pr-10 md:pr-24 md:border-r border-gray-300">
            <label className="text-gray-700 text-xs sm:text-sm font-semibold">
              State
            </label>
            <button
              className="relative mt-1 text-gray-500 bg-white rounded-lg w-full whitespace-nowrap text-left flex items-center justify-between"
              onClick={() => setShowPopup(true)}
            >
              {selectedStateId ? (
                <span className="text-xs sm:text-sm">{selectedStateId}</span>
              ) : (
                <span className="text-gray-500 text-xs sm:text-sm bg-transparent focus:outline-none text-center sm:text-left w-full min-w-[120px]">
                  Select State
                </span>
              )}
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
          </div>

          <div className="flex flex-col text-center sm:text-left sm:pr-10 md:pr-24 md:border-r border-gray-300">
            <label className="text-gray-700 text-xs sm:text-sm font-semibold">
              Location
            </label>
            <select
              className="text-gray-500 text-xs sm:text-sm bg-transparent focus:outline-none text-center sm:text-left w-full min-w-[120px]"
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              disabled={!selectedStateId || loadingDistricts}
            >
              <option value="">
                {selectedStateId ? "Select District" : "Select State First"}
              </option>
              {loadingDistricts ? (
                <option>Loading districts...</option>
              ) : districtError ? (
                <option>Error loading districts</option>
              ) : (
                districts.map((district) => (
                  <option key={district.id} value={district.name}>
                    {district.name}
                  </option>
                ))
              )}
            </select>
          </div>

          <div className="flex flex-col text-center sm:text-left sm:pr-10 md:pr-24 md:border-r border-gray-300">
            <label className="text-gray-700 text-xs sm:text-sm font-semibold">
              Property Type
            </label>
            <select
              className="text-gray-500 text-xs sm:text-sm bg-transparent focus:outline-none text-center sm:text-left w-full min-w-[120px]"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
            >
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Plot">Plot</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>

          <div className="flex flex-col text-center sm:text-left pr-2">
            <label className="text-gray-700 text-xs sm:text-sm font-semibold">
              Price Range
            </label>
            <select
              className="text-gray-500 text-xs sm:text-sm bg-transparent focus:outline-none text-center sm:text-left w-full min-w-[120px]"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              disabled={loadingPriceRanges}
            >
              {loadingPriceRanges ? (
                <option>Loading price ranges...</option>
              ) : priceRanges.length > 0 ? (
                priceRanges.map((range, index) => (
                  <option key={index} value={range}>
                    {range}
                  </option>
                ))
              ) : (
                <option>No price ranges available</option>
              )}
            </select>
          </div>

          <button
            onClick={handleSearch}
            disabled={!selectedDistrict || !priceRange}
            className={`p-3 rounded-lg transition ${
              selectedDistrict && priceRange
                ? "bg-orange-500 text-white hover:bg-orange-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <FaSearch size={18} />
          </button>
        </div>
      </div>
      <Popup
        selectedLocation={selectedStateId}
        setSelectedLocation={setSelectedStateId}
        isVisible={showPopup}
        setIsVisible={setShowPopup}
      />
    </div>
  );
};

export default PropertyHighlights;