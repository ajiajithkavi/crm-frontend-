// import React, { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import img from "../PropertyInnerPage/Assets/img.webp";
// import img6 from "../PropertyInnerPage/Assets/IMG6.jpg";
// import img2 from "../PropertyInnerPage/Assets/IMG2.jpg";
// import location1 from "../PropertyInnerPage/Assets/location1.png";
// import bed from "../PropertyInnerPage/Assets/bed.png";
// import sqft from "../PropertyInnerPage/Assets/sqft.png";
// import apartment from "../PropertyInnerPage/Assets/apartment.png";
// import Map  from "./Map";

// const Aboutus = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const propertyId = location.state.propertyId;
//   const builderId = location.state.builderId;

//   const [buildings, setBuildings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPropertyData = async () => {
//       try {
//         if (!propertyId) throw new Error("No property ID provided");

//         const response = await fetch(
//           `https://crm-bcgg.onrender.com/api/properties/buildings/by-project/${propertyId}`
//         );

//         if (!response.ok) throw new Error("Failed to fetch property data");

//         const data = await response.json();
//         setBuildings(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPropertyData();
//   }, [propertyId]);

//   if (loading) return <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">Loading...</div>;
//   if (error) return <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">Error: {error}</div>;
//   if (buildings.length === 0) return <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">No buildings found</div>;

//   return (
//     <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
//       {buildings.map((building) => (
//         <div
//           key={building._id}
//           className="mb-4 pb-4 border-b last:border-b-0" // Keep minimal spacing or change to mb-0 pb-0 if no gap is desired
//         >
//           {/* Image Section */}
//           <div className="flex flex-col lg:flex-row gap-6 md:gap-10 lg:gap-14 items-center">
//             <img
//               src={building.photos?.[0] || img}
//               alt="Property"
//               className="w-full lg:w-1/2 h-[350px] md:h-[500px] rounded-lg shadow-lg object-cover"
//             />
//             <div className="flex flex-col gap-4 w-full lg:w-1/2">
//               <img
//                 src={building.photos?.[1] || img2}
//                 alt="Property"
//                 className="w-full h-[200px] md:h-[250px] rounded-lg shadow-md object-cover"
//               />
//               <img
//                 src={building.photos?.[2] || img6}
//                 alt="Property"
//                 className="w-full h-[200px] md:h-[250px] rounded-lg shadow-md object-cover"
//               />
//             </div>
//           </div>

//           {/* Details Section */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
//             <div className="lg:col-span-2">
//               <h1 className="text-3xl font-bold text-red-600">
//                 {building.buildingName || "Bouganville"}
//               </h1>
//               <div className="flex flex-col mt-3 space-y-2">
//                 <p className="text-gray-600 flex items-center gap-2">
//                   <img src={location1} alt="Location" className="w-5 h-5" />
//                   {building.buildingArea || "N/A"}
//                 </p>
//                 <p className="text-xl font-semibold text-red-500">
//                   {building.priceRange || "N/A"}
//                 </p>
//               </div>
//               <div className="flex flex-wrap gap-6 mt-6 text-gray-700 text-sm border-b pb-4">
//                 <p className="flex items-center gap-2">
//                   <img src={sqft} alt="Sqft" className="w-5 h-5" />
//                   Floors: {building.floorsCount || "10"}
//                 </p>
//                 <p className="flex items-center gap-2">
//                   <img src={apartment} alt="Type" className="w-5 h-5" />
//                   Type: {building.type || "N/A"}
//                 </p>
//               </div>

//               <button
//                 onClick={() =>
//                   navigate("/clientbooking", {
//                     state: {
//                       propertyId,
//                       buildingId: building._id,
//                       builderId: builderId,
//                     },
//                   })
//                 }
//                 className="mt-6 bg-red-500 text-white px-8 py-3 rounded-full shadow-md hover:bg-red-600 transition-all"
//               >
//                 Book Now
//               </button>

//               <h2 className="mt-8 text-xl font-semibold">About the property</h2>
//               <p className="text-gray-600 mt-3 text-base leading-relaxed">
//                 {building.description ||
//                   "Nestled in a prime location, this property is the epitome of luxurious living. Designed for those who seek tranquility without compromising on modern conveniences, this property offers a harmonious blend of sophistication, comfort, and timeless elegance."}
//               </p>
//               <h3 className="mt-4 text-lg font-semibold">Amenities</h3>
//               <ul className="list-disc list-inside text-gray-600 mt-2 text-base leading-relaxed">
//                 {building.amenities?.map((amenity, index) => (
//                   <li key={index}>{amenity}</li>
//                 )) || <li>No amenities available</li>}
//               </ul>
//             </div>
//           </div>
//           <div className="mt-0">
//             <Map building={building} />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Aboutus;

import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  FaSnowflake, 
  FaFireExtinguisher,
  FaRunning,
  FaSmoking,
  FaChild,
  FaDog,
  FaTshirt,
  FaSwimmingPool,
  FaDumbbell,
  FaParking,
  FaShieldAlt,
  FaBolt,
  FaHome,
  FaGamepad,
  FaTree,
  FaVideo,
  FaClock,
  FaCheck,
  FaBuilding
} from 'react-icons/fa';
import img from "../PropertyInnerPage/Assets/img.webp";
import img6 from "../PropertyInnerPage/Assets/IMG6.jpg";
import img2 from "../PropertyInnerPage/Assets/IMG2.jpg";
import location1 from "../PropertyInnerPage/Assets/location1.png";
import bed from "../PropertyInnerPage/Assets/bed.png";
import sqft from "../PropertyInnerPage/Assets/sqft.png";
import apartment from "../PropertyInnerPage/Assets/apartment.png";
import Map from "./Map";

const Aboutus = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const propertyId = location.state.propertyId;
  const builderId = location.state.builderId;

  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        if (!propertyId) throw new Error("No property ID provided");

        const response = await fetch(
          `https://crm-bcgg.onrender.com/api/properties/buildings/by-project/${propertyId}`
        );

        if (!response.ok) throw new Error("Failed to fetch property data");

        const data = await response.json();
        setBuildings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyData();
  }, [propertyId]);

  const toggleDescription = (buildingId) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [buildingId]: !prev[buildingId]
    }));
  };

  const getAmenityIcon = (amenity) => {
    const iconStyle = { color: '#ed8936', size: 16 };
    
    const iconMap = {
      'air conditioner': <FaSnowflake style={iconStyle} />,
      'fire extinguisher': <FaFireExtinguisher style={iconStyle} />,
      'sports field': <FaRunning style={iconStyle} />,
      'smoking area': <FaSmoking style={iconStyle} />,
      'kids zone': <FaChild style={iconStyle} />,
      'pet friendly': <FaDog style={iconStyle} />,
      'elevator': <FaBuilding style={iconStyle} />,
      'laundry': <FaTshirt style={iconStyle} />,
      'swimming pool': <FaSwimmingPool style={iconStyle} />,
      'gym': <FaDumbbell style={iconStyle} />,
      'parking': <FaParking style={iconStyle} />,
      'security': <FaShieldAlt style={iconStyle} />,
      '24x7 security': <FaClock style={iconStyle} />,
      'power backup': <FaBolt style={iconStyle} />,
      'clubhouse': <FaHome style={iconStyle} />,
      'children play area': <FaGamepad style={iconStyle} />,
      'garden': <FaTree style={iconStyle} />,
      'cctv': <FaVideo style={iconStyle} />,
      'surveillance': <FaVideo style={iconStyle} />
    };

    const lowerAmenity = amenity.toLowerCase();
    for (const [key, icon] of Object.entries(iconMap)) {
      if (lowerAmenity.includes(key)) {
        return icon;
      }
    }
    return <FaCheck style={iconStyle} />;
  };

  if (loading) return <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">Loading...</div>;
  if (error) return <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">Error: {error}</div>;
  if (buildings.length === 0) return <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">No buildings found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      {buildings.map((building) => (
        <div
          key={building._id}
          className="mb-4 pb-4 border-b last:border-b-0"
        >
          {/* Image Section */}
          <div className="flex flex-col lg:flex-row gap-6 md:gap-10 lg:gap-14 items-center">
            <img
              src={building.photos?.[0] || img}
              alt="Property"
              className="w-full lg:w-1/2 h-[350px] md:h-[500px] rounded-lg shadow-lg object-cover"
            />
            <div className="flex flex-col gap-4 w-full lg:w-1/2">
              <img
                src={building.photos?.[1] || img2}
                alt="Property"
                className="w-full h-[200px] md:h-[250px] rounded-lg shadow-md object-cover"
              />
              <img
                src={building.photos?.[2] || img6}
                alt="Property"
                className="w-full h-[200px] md:h-[250px] rounded-lg shadow-md object-cover"
              />
            </div>
          </div>

          {/* Details Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-28 mt-12">
            <div className="-mt-6">
              <h2 className="mt-8 text-xl font-semibold">About the property</h2>
              <div className="relative">
                <p 
                  className={`text-gray-600 mt-3 text-base leading-relaxed ${!expandedDescriptions[building._id] ? 'line-clamp-3' : ''}`}
                >
                  {building.description ||
                    "Nestled in a prime location, this property is the epitome of luxurious living. Designed for those who seek tranquility without compromising on modern conveniences, this property offers a harmonious blend of sophistication, comfort, and timeless elegance."}
                </p>
                {building.description && building.description.split('\n').length > 3 && (
                  <button
                    onClick={() => toggleDescription(building._id)}
                    className="text-red-500 font-medium mt-2 hover:underline focus:outline-none"
                  >
                    {expandedDescriptions[building._id] ? 'Read Less' : 'Read More'}
                  </button>
                )}
              </div>

              <h3 className="mt-8 text-lg font-semibold">Amenities</h3>
              <div className="mt-2">
                {building.amenities?.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {building.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-3 text-gray-600">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                          {getAmenityIcon(amenity)}
                        </div>
                        <span className="text-sm">{amenity}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No amenities available</p>
                )}
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-red-600">
                {building.buildingName || "Bouganville"}
              </h1>
              <div className="flex flex-col mt-3 space-y-2">
                <p className="text-gray-600 flex items-center gap-2">
                  <img src={location1} alt="Location" className="w-5 h-5" />
                  {building.buildingArea || "N/A"}
                </p>
                <p className="text-xl font-semibold text-red-500">
                  {building.priceRange || "N/A"}
                </p>
              </div>
              <div className="flex flex-wrap gap-6 mt-6 text-gray-700 text-sm border-b pb-4">
                <p className="flex items-center gap-2">
                  <img src={sqft} alt="Sqft" className="w-5 h-5" />
                  Floors: {building.floorsCount || "10"}
                </p>
                <p className="flex items-center gap-2">
                  <img src={apartment} alt="Type" className="w-5 h-5" />
                  Type: {building.type || "N/A"}
                </p>
              </div>

              <button
                onClick={() =>
                  navigate("/clientbooking", {
                    state: {
                      propertyId,
                      buildingId: building._id,
                      builderId: builderId,
                    },
                  })
                }
                className="mt-6 bg-red-500 text-white px-8 py-3 rounded-full shadow-md hover:bg-red-600 transition-all"
              >
                Book Now
              </button>
            </div>
          </div>
          <div className="mt-0">
            <Map building={building} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Aboutus;