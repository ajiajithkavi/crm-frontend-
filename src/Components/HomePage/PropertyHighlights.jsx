

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
//   setPropertyTypeFilter,
//   setPriceRangeFilter,
//   setSearchData,
// }) => {
//   const [activeTab, setActiveTab] = useState("BUY");
//   const [propertyType, setPropertyType] = useState("Apartment");
//   const [priceRange, setPriceRange] = useState("");
//   const [currentImage, setCurrentImage] = useState(0);
//   const [districts, setDistricts] = useState([]);
//   const [loadingDistricts, setLoadingDistricts] = useState(false);
//   const [districtError, setDistrictError] = useState(null);
//   const [selectedDistrict, setSelectedDistrict] = useState("");
//   const [priceRanges, setPriceRanges] = useState([]);
//   const [loadingPriceRanges, setLoadingPriceRanges] = useState(false);
//   const navigate = useNavigate();
//   const [showPopup, setShowPopup] = useState(false);
//   const [builders, setBuilders] = useState([]);

//   // Fetch builders and price ranges
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoadingDistricts(true);
//         setLoadingPriceRanges(true);

//         // Fetch builders
//         const buildersResponse = await axios.get(
//           `${BASE_URL}/api/properties/builder-profile`
//         );

//         if (!Array.isArray(buildersResponse.data)) {
//           throw new Error("Invalid data format received from builders API");
//         }
//         setBuilders(buildersResponse.data);

//         // Fetch buildings for price ranges
//         const buildingsResponse = await axios.get(
//           `${BASE_URL}/api/properties/buildings`
//         );

//         if (!Array.isArray(buildersResponse.data)) {
//           throw new Error("Invalid data format received from buildings API");
//         }

//         // Extract unique price ranges
//         const uniquePriceRanges = [
//           ...new Set(
//             buildingsResponse.data
//               .map((building) => building.priceRange)
//               .filter((range) => range) // Filter out undefined/null
//           ),
//         ].sort((a, b) => {
//           // Custom sorting to keep price ranges in order
//           const extractNumber = (str) =>
//             parseFloat(str.replace(/[^0-9.]/g, ""));
//           return extractNumber(a) - extractNumber(b);
//         });

//         setPriceRanges(uniquePriceRanges);
//         if (uniquePriceRanges.length > 0) {
//           setPriceRange(uniquePriceRanges[0]);
//         }

//         setDistrictError(null);
//       } catch (error) {
//         setDistrictError("Failed to fetch data. Please try again.");
//         console.error("Error fetching data:", error);
//       } finally {
//         setLoadingDistricts(false);
//         setLoadingPriceRanges(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Update districts when state changes
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
//     const searchdata = {
//       districtid: selectedDistrict,
//       propertytype: propertyType,
//       pricerange: priceRange,
//     };
//     console.log(searchdata);

//     // Set the filters that will be used in Apartments component
//     if (setPropertyTypeFilter) setPropertyTypeFilter(propertyType);
//     if (setPriceRangeFilter) setPriceRangeFilter(priceRange);
//     if (setSearchData) setSearchData(searchdata);

//     // Scroll to apartments section
//     if (scrollToApartments) scrollToApartments();
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
//           <div className="flex flex-col text-center sm:text-left sm:pr-10 md:pr-24 md:border-r border-gray-300">
//             <label className="text-gray-700 text-xs sm:text-sm font-semibold">
//               State
//             </label>
//             <button
//               className="relative mt-1 text-gray-500 bg-white rounded-lg w-full whitespace-nowrap text-left flex items-center justify-between"
//               onClick={() => setShowPopup(true)}
//             >
//               {selectedStateId ? (
//                 <span className="text-xs sm:text-sm">{selectedStateId}</span>
//               ) : (
//                 <span className="text-gray-500 text-xs sm:text-sm bg-transparent focus:outline-none text-center sm:text-left w-full min-w-[120px]">
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
//               disabled={loadingPriceRanges}
//             >
//               {loadingPriceRanges ? (
//                 <option>Loading price ranges...</option>
//               ) : priceRanges.length > 0 ? (
//                 priceRanges.map((range, index) => (
//                   <option key={index} value={range}>
//                     {range}
//                   </option>
//                 ))
//               ) : (
//                 <option>No price ranges available</option>
//               )}
//             </select>
//           </div>

//           <button
//             onClick={handleSearch}
//             disabled={!selectedDistrict || !priceRange}
//             className={`p-3 rounded-lg transition ${
//               selectedDistrict && priceRange
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




import React, { useState, useEffect, useRef } from 'react';
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { Link,useNavigate } from "react-router-dom";
import Popup from "./Popup";
import NavLogo from "../HomePage/Assets/footerlogo copy.png";

const heroSlides = [
  {
    id: 1,
    title: "Luxury Living Redefined",
    subtitle: "RESIDENTIAL EXCELLENCE",
    description: "Discover our premium residential developments featuring world-class amenities and architectural brilliance in the heart of the city.",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&h=1080&fit=crop",
    cta: {
      primary: { text: "Explore Residences", link: "/projects/residential" },
      secondary: { text: "View Virtual Tour", link: "#" }
    }
  },
  {
    id: 2,
    title: "Commercial Excellence",
    subtitle: "BUSINESS DESTINATIONS",
    description: "State-of-the-art commercial spaces designed for success. Premium office buildings and retail developments in prime locations.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1080&fit=crop",
    cta: {
      primary: { text: "Commercial Projects", link: "/projects/commercial" },
      secondary: { text: "Download Brochure", link: "#" }
    }
  },
  {
    id: 3,
    title: "Investment Opportunities",
    subtitle: "PREMIUM PORTFOLIOS",
    description: "Exceptional real estate investment opportunities with guaranteed returns. Join our exclusive investor network today.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&h=1080&fit=crop",
    cta: {
      primary: { text: "Investment Guide", link: "/investment" },
      secondary: { text: "Schedule Meeting", link: "/contact" }
    }
  }
];

const BASE_URL = "https://crm-bcgg.onrender.com";

const Header = () => (
  <header className="bg-black text-white p-4 flex justify-between items-center">
    <div className="container mx-auto flex justify-between items-center">
      <div>
        <span className=" mr-4">📞 +91 8056666902</span>
        <span className="mr-4">📧 assetbuildventures@gmail.com</span>
      </div>
    </div>
  </header>
);

const PropertyHighlights = ({
  scrollToApartments,
  scrollToIndividualHouse,
  scrollToTopProjects,
  selectedStateId,
  setSelectedStateId,
  setSelectedDistrictId,
  setPropertyTypeFilter,
  setPriceRangeFilter,
  setSearchData,
}) => {
  const [propertyType, setPropertyType] = useState("Apartment");
  const [priceRange, setPriceRange] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [districts, setDistricts] = useState([]);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [districtError, setDistrictError] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [priceRanges, setPriceRanges] = useState([]);
  const [loadingPriceRanges, setLoadingPriceRanges] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [builders, setBuilders] = useState([]);

  // Create refs for scrolling targets
  const apartmentsRef = useRef(null);
  const individualHouseRef = useRef(null);
  const topProjectsRef = useRef(null);

  // Default scroll functions if not provided
  const defaultScrollToApartments = () => {
    if (apartmentsRef.current) {
      apartmentsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const defaultScrollToIndividualHouse = () => {
    if (individualHouseRef.current) {
      individualHouseRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const defaultScrollToTopProjects = () => {
    if (topProjectsRef.current) {
      topProjectsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Use provided scroll functions or fallback to defaults
  const handleScrollToApartments = scrollToApartments || defaultScrollToApartments;
  const handleScrollToIndividualHouse = scrollToIndividualHouse || defaultScrollToIndividualHouse;
  const handleScrollToTopProjects = scrollToTopProjects || defaultScrollToTopProjects;

  // Auto-rotate slides every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Fetch builders and price ranges
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingDistricts(true);
        setLoadingPriceRanges(true);

        const buildersResponse = await axios.get(
          `${BASE_URL}/api/properties/builder-profile`
        );

        if (!Array.isArray(buildersResponse.data)) {
          throw new Error("Invalid data format received from builders API");
        }
        setBuilders(buildersResponse.data);

        const buildingsResponse = await axios.get(
          `${BASE_URL}/api/properties/buildings`
        );

        if (!Array.isArray(buildingsResponse.data)) {
          throw new Error("Invalid data format received from buildings API");
        }

        const uniquePriceRanges = [
          ...new Set(
            buildingsResponse.data
              .map((building) => building.priceRange)
              .filter((range) => range)
          ),
        ].sort((a, b) => {
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

        const stateBuilders = builders.filter(
          (builder) =>
            builder.address?.state &&
            builder.address.state.trim().toLowerCase() ===
              normalizedSelectedState
        );

        const cityMap = new Map();

        stateBuilders.forEach((builder) => {
          if (builder.address?.city) {
            const normalizedCity = builder.address.city.trim().toLowerCase();
            if (!cityMap.has(normalizedCity)) {
              cityMap.set(normalizedCity, builder.address.city);
            }
          }
        });

        const uniqueCities = Array.from(cityMap.entries()).map(
          ([_, cityName]) => ({
            id: cityName,
            name: cityName,
          })
        );

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

    if (setSearchData) setSearchData(searchdata);
  };

  const Navbar = () => {
    const navigate = useNavigate();
    
    return (
      <nav className="bg-gray-900 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <img
              src={NavLogo}
              alt="ABV Logo"
              className="w-16 sm:w-20 md:w-24 h-auto"
            />
          </div>
          <div className="hidden md:flex space-x-6">
            <button 
              onClick={handleScrollToApartments}
              className="hover:text-yellow-400"
            >
              Apartments
            </button>
            <button 
              onClick={handleScrollToTopProjects}
              className="hover:text-yellow-400"
            >
              Ongoing Projects
            </button>
            <button 
              onClick={handleScrollToIndividualHouse}
              className="hover:text-yellow-400"
            >
              Individual House
            </button>
            <button 
              onClick={() => navigate("/contact")}
              className="hover:text-yellow-400"
            >
              Contact
            </button>
          </div>
          <div className="flex space-x-3">
            <Link to="/login">
            <button className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500 transition">
              Get Started
            </button>
            </Link>
          </div>
        </div>
      </nav>
    );
  };

  return (
    <div className="relative">
      <Header />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative w-full h-screen overflow-hidden">
        {/* Image Slider */}
        <div className="absolute inset-0 z-0">
          {heroSlides.map((slide, index) => (
            <img
              key={slide.id}
              src={slide.image}
              alt={slide.title}
              className={`w-full h-full object-cover transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0 absolute'
              }`}
            />
          ))}
        </div>
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-55 z-10"></div>

        {/* Content */}
        <div className="container mx-auto h-full text-white p-4 pt-20 relative z-20">
          <h2 className="text-yellow-400 text-lg mb-2">
            {heroSlides[currentSlide].subtitle}
          </h2>
          <h1 className="text-6xl font-bold mb-6">
            {heroSlides[currentSlide].title.split(' ')[0]}
          </h1>
          <span className="text-6xl font-bold mb-8 block">
            {heroSlides[currentSlide].title.split(' ').slice(1).join(' ')}
          </span>
          <div>
            <p className="text-2xl font-medium mb-2">
              {heroSlides[currentSlide].description.split('. ')[0]}.
            </p>
            <span className="text-2xl font-medium mb-2">
              {heroSlides[currentSlide].description.split('. ').slice(1).join('. ')}
            </span>
          </div>
          
          {/* CTA Buttons */}
          {/* <div className="flex space-x-4 mt-6">
            <button 
              className="bg-yellow-400 text-black px-6 py-3 rounded hover:bg-yellow-500 transition"
              onClick={() => window.location.href = heroSlides[currentSlide].cta.primary.link}
            >
              {heroSlides[currentSlide].cta.primary.text}
            </button>
            <button 
              className="border border-white text-white px-6 py-3 rounded hover:bg-white hover:text-black transition"
              onClick={() => window.location.href = heroSlides[currentSlide].cta.secondary.link}
            >
              {heroSlides[currentSlide].cta.secondary.text}
            </button>
          </div> */}
        </div>
        
        {/* Slide Indicators */}
        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-yellow-400' : 'bg-white bg-opacity-50'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Bottom Search Card */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[95%] sm:w-[600px] md:w-[900px] bg-white shadow-xl rounded-tr-lg rounded-br rounded-bl p-4 sm:p-6 z-20">
          {/* Single BUY Tab */}
          <div className="absolute -top-8 left-0">
            <span className="cursor-pointer px-4 py-2 rounded-tr-lg rounded-tl-lg border-b-2 bg-gray-100 text-black shadow-md border-gray-200">
              BUY
            </span>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-6">
            <div className="flex flex-col">
              <label className="text-gray-700 text-xs sm:text-sm font-semibold mb-1">
                State
              </label>
              <button
                className="relative text-gray-500 bg-white rounded-lg w-full text-left flex items-center justify-between p-2 "
                onClick={() => setShowPopup(true)}
              >
                {selectedStateId ? (
                  <span className="text-xs sm:text-sm truncate">{selectedStateId}</span>
                ) : (
                  <span className="text-gray-500 text-xs sm:text-sm truncate">
                    Select State
                  </span>
                )}
                <svg
                  className="w-4 h-4 text-gray-500 ml-2"
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

            <div className="flex flex-col">
              <label className="text-gray-700 text-xs sm:text-sm font-semibold mb-1">
                Location
              </label>
              <select
                className="text-gray-500 text-xs sm:text-sm bg-white p-2  rounded-lg focus:outline-none w-full"
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                disabled={!selectedStateId || loadingDistricts}
              >
                <option value="">
                  {selectedStateId ? "Select District" : "Select State First"}
                </option>
                {loadingDistricts ? (
                  <option>Loading...</option>
                ) : districtError ? (
                  <option>Error loading</option>
                ) : (
                  districts.map((district) => (
                    <option key={district.id} value={district.name}>
                      {district.name}
                    </option>
                  ))
                )}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 text-xs sm:text-sm font-semibold mb-1">
                Property Type
              </label>
              <select
                className="text-gray-500 text-xs sm:text-sm bg-white p-2  rounded-lg focus:outline-none w-full"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
              >
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Plot">Plot</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-gray-700 text-xs sm:text-sm font-semibold mb-1">
                Price Range
              </label>
              <select
                className="text-gray-500 text-xs sm:text-sm bg-white p-2  rounded-lg focus:outline-none w-full"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                disabled={loadingPriceRanges}
              >
                {loadingPriceRanges ? (
                  <option>Loading...</option>
                ) : priceRanges.length > 0 ? (
                  priceRanges.map((range, index) => (
                    <option key={index} value={range}>
                      {range}
                    </option>
                  ))
                ) : (
                  <option>No ranges available</option>
                )}
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={handleSearch}
                disabled={!selectedDistrict || !priceRange}
                className={`p-3 rounded-lg transition w-full ${
                  selectedDistrict && priceRange
                    ? "bg-orange-500 text-white hover:bg-orange-600"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <FaSearch size={18} className="mx-auto" />
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Popup for state selection */}
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