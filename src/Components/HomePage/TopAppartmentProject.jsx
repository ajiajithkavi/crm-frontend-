// import React, { useState, useMemo, useEffect } from "react";
// import { motion } from "framer-motion";
// import location1 from "../HomePage/Assets/location1.png";
// import sqftIcon from "../HomePage/Assets/sqft.png";
// import bedIcon from "../HomePage/Assets/bed.png";
// import bathIcon from "../HomePage/Assets/bath.png";
// import Larrow from "../HomePage/Assets/Larrow.png";
// import Rarrow from "../HomePage/Assets/Rarrow.png";
// import axios from 'axios';

// import ApartmentsData from "../HomePage/ApartmentsData.json"; // Your local JSON import

// const TopApartmentProject = () => {
//   const [apartments, setApartments] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const itemsPerPage = 3;

// useEffect(() => {
//   const fetchApartments = async () => {
//     try {
//       const response = await axios.get("https://crm-bcgg.onrender.com/api/properties/project");
//       const data = response.data;

//       const formattedData = data.map((item) => ({
//         name: item.builder?.companyName || item.projectName || "Unknown",
//         price: "Contact for Price", // Not provided in response, so static or change as needed
//         sqft: "N/A",               // Not in response — add if available
//         beds: "N/A",               // Not in response — update if backend includes it later
//         baths: "N/A",              // Not in response — update if backend includes it later
//         location: item.location?.city || "Unknown",
//         image: item.media?.photos?.[0]?.url || "https://via.placeholder.com/400",
//       }));

//       setApartments(formattedData);
//     } catch (error) {
//       console.error("Failed to fetch apartments:", error);
//     }
//   };

//   fetchApartments();
// }, []);

//   const goToPrevious = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0
//         ? Math.max(apartments.length - itemsPerPage, 0)
//         : prevIndex - itemsPerPage
//     );
//   };

//   const goToNext = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex + itemsPerPage >= apartments.length
//         ? 0
//         : prevIndex + itemsPerPage
//     );
//   };

//   const visibleApartments = useMemo(() => {
//     return apartments.slice(
//       currentIndex,
//       Math.min(currentIndex + itemsPerPage, apartments.length)
//     );
//   }, [apartments, currentIndex]);

//   return (
//     <motion.div className="relative w-full max-w-7xl mx-auto px-10 p-4">
//       <div className="max-w-7xl mx-auto flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold">Top Apartment Projects</h2>
//       </div>

//       {apartments.length === 0 ? (
//         <p className="text-center text-gray-500">Loading apartments...</p>
//       ) : (
//         <div className="relative flex items-center justify-center">
//           {apartments.length > itemsPerPage && (
//             <button
//               onClick={goToPrevious}
//               className="absolute z-10 p-3 rounded-full hidden sm:block"
//               style={{
//                 top: "50%",
//                 transform: "translateY(-50%)",
//                 left: "-30px",
//               }}
//               aria-label="Previous Slide"
//             >
//               <img src={Larrow} alt="Previous" className="w-6 h-6" />
//             </button>
//           )}

//           <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-[90%] mx-auto">
//             {visibleApartments.map((apartment, index) => (
//               <motion.div
//                 key={index}
//                 className="rounded-lg overflow-hidden w-[90%] mx-auto"
//                 initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.5 }}
//                 whileHover={{
//                   scale: 1.05,
//                   boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
//                 }}
//               >
//                 <img
//                   src={apartment.image}
//                   alt={`Image of ${apartment.name}`}
//                   className="w-full h-40 sm:h-48 md:h-60 object-cover"
//                 />
//                 <div className="p-4">
//                   <h2 className="text-lg font-bold">{apartment.name}</h2>
//                   <p className="text-lg mt-1 text-red-600 font-semibold">
//                     {apartment.price}
//                   </p>
//                   <p className="text-sm mt-1 text-gray-500 flex items-center gap-2">
//                     <img src={location1} alt="Location" className="w-4 h-4" />
//                     {apartment.location}
//                   </p>
//                   <p className="border-b p-2"></p>
//                   <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
//                     <span className="flex items-center gap-1">
//                       <img src={sqftIcon} alt="Size Icon" className="w-4 h-4" />
//                       {apartment.sqft} Sqft
//                     </span>
//                     <span className="flex items-center gap-1">
//                       <img src={bedIcon} alt="Bed Icon" className="w-4 h-4" />
//                       {apartment.beds}
//                     </span>
//                     <span className="flex items-center gap-1">
//                       <img src={bathIcon} alt="Bath Icon" className="w-4 h-4" />
//                       {apartment.baths}
//                     </span>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>

//           {apartments.length > itemsPerPage && (
//             <button
//               onClick={goToNext}
//               className="absolute z-10 p-3 text-xl font-bold hidden sm:block"
//               style={{
//                 top: "50%",
//                 transform: "translateY(-60%)",
//                 right: "-30px",
//               }}
//               aria-label="Next Slide"
//             >
//               <img src={Rarrow} alt="Next" className="w-6 h-6" />
//             </button>
//           )}
//         </div>
//       )}
//     </motion.div>
//   );
// };

// export default TopApartmentProject;





import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import location1 from "../HomePage/Assets/location1.png";
import sqftIcon from "../HomePage/Assets/sqft.png";
import Larrow from "../HomePage/Assets/Larrow.png";
import Rarrow from "../HomePage/Assets/Rarrow.png";
import axios from "axios";

import ApartmentsData from "../HomePage/ApartmentsData.json";

const TopApartmentProject = () => {
  const [apartments, setApartments] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const response = await axios.get(
          "https://crm-bcgg.onrender.com/api/properties/project"
        );
        const data = response.data;
        console.log("API Response:", data); // Debug: Log API response

        const formattedData = data.map((item) => ({
          name:
            item.projectName ||
            item.builder?.companyName ||
            item.name ||
            item.title ||
            "Unknown Project",
          price: item.price
            ? typeof item.price === "number"
              ? `$${item.price.toLocaleString()}`
              : item.price
            : "Contact for Price",
          location:
            item.location?.city ||
            item.address?.city ||
            item.city ||
            "Unknown Location",
          image:
            item.media?.photos?.[0]?.url ||
            item.image ||
            "https://via.placeholder.com/400",
          sqft: item.sqft || item.squareFeet || item.area || "Unknown Size",
        }));

        console.log("Formatted Data:", formattedData); // Debug: Log mapped data
        setApartments(formattedData);
      } catch (error) {
        console.error("Failed to fetch apartments:", error);
        // Fallback to local JSON data
        const fallbackData = ApartmentsData.map((item) => ({
          name:
            item.name || item.projectName || item.title || "Unknown Project",
          price: item.price || "Contact for Price",
          location: item.location || item.city || "Unknown Location",
          image: item.image || "https://via.placeholder.com/400",
          sqft: item.sqft || item.squareFeet || "Unknown Size",
        }));
        console.log("Fallback Data:", fallbackData); // Debug: Log fallback data
        setApartments(fallbackData);
      }
    };

    fetchApartments();
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0
        ? Math.max(apartments.length - itemsPerPage, 0)
        : prevIndex - itemsPerPage
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + itemsPerPage >= apartments.length
        ? 0
        : prevIndex + itemsPerPage
    );
  };

  const visibleApartments = useMemo(() => {
    return apartments.slice(
      currentIndex,
      Math.min(currentIndex + itemsPerPage, apartments.length)
    );
  }, [apartments, currentIndex]);

  return (
    <motion.div className="relative w-full max-w-7xl mx-auto px-10 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Top Apartment Projects</h2>
      </div>

      {apartments.length === 0 ? (
        <p className="text-center text-gray-500">Loading apartments...</p>
      ) : (
        <div className="relative flex items-center justify-center">
          {apartments.length > itemsPerPage && (
            <button
              onClick={goToPrevious}
              className="absolute z-10 p-3 rounded-full hidden sm:block"
              style={{
                top: "50%",
                transform: "translateY(-50%)",
                left: "-30px",
              }}
              aria-label="Previous Slide"
            >
              <img src={Larrow} alt="Previous" className="w-6 h-6" />
            </button>
          )}

          <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-[90%] mx-auto">
            {visibleApartments.map((apartment, index) => (
              <motion.div
                key={index}
                className="rounded-lg overflow-hidden w-[90%] mx-auto"
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
                }}
              >
                <img
                  src={apartment.image}
                  alt={`Image of ${apartment.name}`}
                  className="w-full h-40 sm:h-48 md:h-60 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-bold">
                    {apartment.name || "Unnamed Project"}
                  </h2>
                  <p className="text-lg mt-1 text-red-600 font-semibold">
                    {apartment.price}
                  </p>
                  <p className="text-sm mt-1 text-gray-500 flex items-center gap-2">
                    <img src={location1} alt="Location" className="w-4 h-4" />
                    {apartment.location}
                  </p>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <img src={sqftIcon} alt="Size Icon" className="w-4 h-4" />
                      {apartment.sqft}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {apartments.length > itemsPerPage && (
            <button
              onClick={goToNext}
              className="absolute z-10 p-3 text-xl font-bold hidden sm:block"
              style={{
                top: "50%",
                transform: "translateY(-60%)",
                right: "-30px",
              }}
              aria-label="Next Slide"
            >
              <img src={Rarrow} alt="Next" className="w-6 h-6" />
            </button>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default TopApartmentProject;