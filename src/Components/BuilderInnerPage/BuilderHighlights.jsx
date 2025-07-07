// import React, { useState, useEffect } from "react";
// import { FaSearch } from "react-icons/fa";
// import Avenuepark from "../HomePage/Assets/logo.png";
// import offer from "../HomePage/Assets/offer.png";
// import slide1 from "../HomePage/Assets/slide1.jpg";
// import slide2 from "../HomePage/Assets/slide2.webp";
// import slide3 from "../HomePage/Assets/slide3.webp";
// import slide4 from "../HomePage/Assets/slide4.webp";
// import highlightsline from "../BuilderInnerPage/Assets/highlightsline.png";
// import { Link, useNavigate } from "react-router-dom";

// const images = [slide1, slide2, slide3, slide4];

// const PropertyHighlights = ({
//   scrollToApartments,
//   scrollToIndividualHouse,
//   scrollToTopProjects,
// }) => {
//   const [activeTab, setActiveTab] = useState("BUY");
//   const [location, setLocation] = useState("Chennai");
//   const [propertyType, setPropertyType] = useState("Apartment");
//   const [priceRange, setPriceRange] = useState("2Cr-5Cr");
//   const [currentImage, setCurrentImage] = useState(0);
//   const navigate = useNavigate();

//   const Header = () => (
//   <header className="bg-black text-white p-4 flex justify-between items-center">
//     <div className="container mx-auto flex justify-between items-center">
//       <div>
//         <span className="text-yellow-400 mr-4">📞 +1 (555) 123-4567</span>
//         <span className="mr-4">📧 info@capitalgroup.com</span>
//       </div>
//       <div>
//         <span className="mr-4">EN</span>
//         <span className="mr-4">RU</span>
//       </div>
//     </div>
//   </header>
// );

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImage((prev) => (prev + 1) % images.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   // Handle card click to navigate to builder page
//   const handleCardClick = () => {
//     navigate("/builder", { replace: true }); // Use replace to avoid scroll restoration
//   };

//   return (
//     <div className="relative w-full h-[100dvh]">
//       <Header />
//       <img
//         src={images[currentImage]}
//         alt="Property highlight"
//         className="w-full h-full object-cover"
//       />
//       <div className="absolute inset-0 bg-black bg-opacity-40"></div>

//       {/* Navbar (Commented Out) */}
//       {/* <div className="absolute top-5 left-1/2 transform -translate-x-1/2 hidden md:flex w-[100%] max-w-7xl items-center text-white font-semibold text-sm lg:text-base">
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
//       </div> */}

//       {/* Logo */}
//       <div className="absolute top-8 left-4 sm:top-10 sm:left-6 md:top-14 md:left-16 bg-white p-2 sm:p-3 rounded-md shadow-lg">
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
//         {/* <button
//           className="mt-4 px-4 py-2 md:px-6 md:py-2 border-2 border-white text-white font-medium rounded-md hover:bg-white hover:text-black transition"
//         >
//           Explore properties
//         </button> */}
//         <img src={highlightsline} alt="" className="mt-6 h-1 sm:mt-8" />
//       </div>

//       {/* Offer badge */}
//       <div className="absolute bottom-24 right-4 sm:bottom-28 sm:right-6 md:bottom-32 md:right-10 w-16 sm:w-20 md:w-auto">
//         <img src={offer} alt="Offer Badge" />
//       </div>

//       {/* Clickable Card for Builder Navigation */}
//       <div
//         className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-[95%] sm:w-[600px] md:w-[900px] bg-white shadow-xl rounded-lg p-4 sm:p-6 cursor-pointer hover:bg-gray-100 transition"
//         onClick={handleCardClick}
//       >
//         <h3 className="text-lg sm:text-xl font-bold text-gray-800">
//           Explore Builder Projects
//         </h3>
//         <p className="text-sm sm:text-base text-gray-600 mt-2">
//           Discover our latest builder projects and offerings.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default PropertyHighlights;



import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Avenuepark from "../HomePage/Assets/logo.png";
import offer from "../HomePage/Assets/offer.png";
import slide1 from "../HomePage/Assets/slide1.jpg";
import slide2 from "../HomePage/Assets/slide2.webp";
import slide3 from "../HomePage/Assets/slide3.webp";
import slide4 from "../HomePage/Assets/slide4.webp";
import { useNavigate } from "react-router-dom";

const images = [slide1, slide2, slide3, slide4];

const PropertyHighlights = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();

  const Header = () => (
    <header className="bg-black text-white p-4 flex justify-between items-center relative z-30">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <span className=" mr-4">📞 +91 8056666902</span>
          <span className="mr-4">📧 assetbuildventures@gmail.com</span>
        </div>
        {/* <div>
          <span className="mr-4">EN</span>
          <span className="mr-4">RU</span>
        </div> */}
      </div>
    </header>
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleCardClick = () => {
    navigate("/builder", { replace: true });
  };

  return (
    <div className="relative w-full h-[100dvh]">
      <Header />
      <img
        src={images[currentImage]}
        alt="Property highlight"
        className="w-full h-full object-cover absolute top-0 left-0 z-0"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>

      {/* Logo positioned below header */}
      {/* <div className="absolute top-24 left-4 sm:top-28 sm:left-6 md:top-32 md:left-16 bg-white p-2 sm:p-3 rounded-md shadow-lg z-20">
        <img
          src={Avenuepark}
          alt="Casagrand Avenuepark Logo"
          className="w-20 sm:w-28 md:w-32 h-auto"
        />
      </div> */}

      {/* Your specified text content positioned below logo */}
      <div className="container mx-auto h-full text-white p-4 pt-20 relative z-20">
          <h2 className="text-yellow-400 text-lg mb-2">PREMIUM PORTFOLIOS</h2>
          <h1 className="text-6xl font-bold mb-6">Investment </h1>
           <span className="text-6xl font-bold mb-8 block"> Opportunities </span>
          <div>
          <p className="text-2xl font-medium mb-2">Exceptional real estate investment opportunities with guaranteed returns.</p>
          <span className="text-2xl font-medium mb-2"> Join our exclusive investor network today.</span>
          </div>
         
          {/* <div className="flex space-x-4">
            <button className="bg-yellow-400 text-black px-4 py-2 rounded">Investment Guide</button>
            <button className="border p-2 rounded bg-white text-black w-[100px]">hello</button>
          </div> */}
          {/* <div className="flex space-x-6 mt-6">
            <div><span className="font-bold">25+</span> Years Experience</div>
            <div><span className="font-bold">150+</span> Projects Completed</div>
            <div><span className="font-bold">$2.5B+</span> Total Investment</div>
          </div> */}
        </div>

      {/* Offer badge */}
      <div className="absolute bottom-24 right-4 sm:bottom-28 sm:right-6 md:bottom-32 md:right-10 w-16 sm:w-20 md:w-auto z-20">
        <img src={offer} alt="Offer Badge" />
      </div>

      {/* Clickable Card for Builder Navigation */}
      {/* <div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-[95%] sm:w-[600px] md:w-[900px] bg-white shadow-xl rounded-lg p-4 sm:p-6 cursor-pointer hover:bg-gray-100 transition z-20"
        onClick={handleCardClick}
      >
        <h3 className="text-lg sm:text-xl font-bold text-gray-800">
          Explore Builder Projects
        </h3>
        <p className="text-sm sm:text-base text-gray-600 mt-2">
          Discover our latest builder projects and offerings.
        </p>
      </div> */}
    </div>
  );
};

export default PropertyHighlights;

