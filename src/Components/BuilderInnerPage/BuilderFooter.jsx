// import React from "react";
// import { Link } from "react-router-dom"; // Import Link from react-router-dom
// import footerlogo from "../BuilderInnerPage/Assets/footerlogo.png";
// import facebook from "../BuilderInnerPage/Assets/facebook.png";
// import twitter from "../BuilderInnerPage/Assets/twitter.png";
// import instagram from "../BuilderInnerPage/Assets/instagram.png";
// import linkedin from "../BuilderInnerPage/Assets/linkedin.png";
// import phone from "../BuilderInnerPage/Assets/phone.png";
// import email from "../BuilderInnerPage/Assets/email.png";
// import location from "../BuilderInnerPage/Assets/location.png";
// import footerbackground from "../BuilderInnerPage/Assets/Footer background.png";

// const Footer = () => {
//   return (
//     <div className="bg-black text-white pt-16 pb-8 px-6 mt-3">
//       <div className="max-w-7xl mx-auto">
//         <div
//           className="relative bg-cover bg-center rounded-lg p-6 md:p-10 flex flex-col items-center text-center text-white bg-opacity-80 transition-transform transform hover:scale-105"
//           style={{ backgroundImage: `url(${footerbackground})` }}
//         >
//           <h2 className="text-2xl md:text-3xl font-bold">
//             LOOKING FOR MORE <br />
//             PROPERTIES?
//           </h2>
//           <p className="mt-2 text-gray-300">
//             Let's work together! <br />
//             Drop us a line to see how we can help.
//           </p>
//           <Link
//             to="/contact"
//             className="mt-4 px-6 py-2 border border-white rounded-lg hover:bg-white hover:text-black transition duration-300 ease-in-out"
//           >
//             Contact us
//           </Link>
//         </div>

//         <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border-t border-gray-700 pt-8 text-center md:text-left">
//           <div className="flex flex-col items-center md:items-start">
//             <Link to="/">
//               <img
//                 src={footerlogo}
//                 alt="Footer Logo"
//                 className="mx-auto md:mx-0 hover:scale-110 transition duration-300"
//               />
//             </Link>
//             <p className="text-gray-400 mt-2">
//               Welcome to Asset Build Ventures, a premier real estate and
//               construction company based in Chennai.
//             </p>
//             <div className="flex space-x-4 mt-4">
//               {[facebook, twitter, linkedin, instagram].map((icon, index) => (
//                 <a
//                   key={index}
//                   href="#"
//                   className="hover:opacity-75 transition transform hover:scale-110"
//                 >
//                   <img src={icon} alt="Social" className="h-6" />
//                 </a>
//               ))}
//             </div>
//           </div>

//           <div>
//             <h4 className="text-xl font-bold">Quick Links</h4>
//             <ul className="mt-2 space-y-2 text-gray-400">
//               <li>
//                 <Link
//                   to="/"
//                   className="hover:text-white transition duration-300 ease-in-out"
//                 >
//                   Home
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/about"
//                   className="hover:text-white transition duration-300 ease-in-out"
//                 >
//                   About Us
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/why-us"
//                   className="hover:text-white transition duration-300 ease-in-out"
//                 >
//                   Why Us
//                 </Link>
//               </li>
//               {/* <li>
//                 <Link
//                   to="/footerproperties"
//                   className="hover:text-white transition duration-300 ease-in-out"
//                 >
//                   Properties
//                 </Link>
//               </li> */}
//               <li>
//                 <Link
//                   to="/testimonials"
//                   className="hover:text-white transition duration-300 ease-in-out"
//                 >
//                   Testimonials
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/contact"
//                   className="hover:text-white transition duration-300 ease-in-out"
//                 >
//                   Contact Us
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           <div>
//             <h4 className="text-xl font-bold">Contact Us</h4>
//             <ul className="mt-2 space-y-2 text-gray-400">
//               {[
//                 { icon: phone, text: "+91 8056666902" },
//                 { icon: email, text: "assetbuildventures@gmail.com" },
//                 {
//                   icon: location,
//                   text: "Ground floor, H-block, 5th street, Anna Nagar, Chennai-600040",
//                 },
//               ].map((item, index) => (
//                 <li
//                   key={index}
//                   className="flex items-center justify-center md:justify-start gap-2 hover:text-white transition duration-300"
//                 >
//                   <img src={item.icon} alt="Icon" className="h-5" /> {item.text}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* <div>
//             <h4 className="text-xl font-bold">Signup to get more updates</h4>
//             <div className="mt-2 flex flex-col items-center md:items-start">
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="p-2 w-full bg-white rounded-lg focus:ring focus:ring-orange-400 transition"
//               />
//               <button className="bg-orange-500 px-4 py-2 mt-4 rounded-full hover:bg-orange-600 transition duration-300">
//                 Submit
//               </button>
//             </div>
//           </div> */}
//         </div>

//         <p className="text-center text-gray-500 text-sm mt-8">
//           Copyright &copy; 2025 Asset Build Ventures. All rights reserved
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Footer;


import React from "react";
import { Link } from "react-router-dom";
import footerlogo from "../BuilderInnerPage/Assets/footerlogo.png";
import facebook from "../BuilderInnerPage/Assets/facebook.png";
import twitter from "../BuilderInnerPage/Assets/twitter.png";
import instagram from "../BuilderInnerPage/Assets/instagram.png";
import linkedin from "../BuilderInnerPage/Assets/linkedin.png";
import phone from "../BuilderInnerPage/Assets/phone.png";
import email from "../BuilderInnerPage/Assets/email.png";
import location from "../BuilderInnerPage/Assets/location.png";
import footerbackground from "../BuilderInnerPage/Assets/Footer background.png";

const Footer = () => {
  return (
    <div>
      {/* Call to Action Section - Fixed positioning */}
      <div className="relative bg-gray-300  w-[90%] mx-auto  rounded-xl p-6 text-center mb-16">
        <h2 className="text-2xl font-bold mb-2">Looking for more Properties?</h2>
        <p className="text-lg mb-4">Let's work together!</p>
        <p className="text-lg mb-6">Drop us a line to see how we can help</p>
        <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2">
          <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800">
           <a href="/contact"> Contact Us</a>
          </button>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="bg-black text-white px-8">
        <div className="mt-16 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10 border-t border-gray-700 pt-8 text-center md:text-left">
<div className="flex flex-row justify-evenly md:items-start gap-10">            <Link to="/">
              <img
                src={footerlogo}
                alt="Footer Logo"
                className="md:mx-0 hover:scale-110 transition duration-300 w-[205px] h-[126px] p-4"
              />
            </Link>
              <div>
           <p className="text-gray-400 mt-2">
  Welcome to Asset Build Ventures,
  <span className="block">a premier real estate <span className="block">and construction company </span>based in Chennai.</span>
</p>
            <div className="flex space-x-4 mt-4 justify-center md:justify-start">
              {[facebook, twitter, linkedin, instagram].map((icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="hover:opacity-75 transition transform hover:scale-110"
                >
                  <img src={icon} alt="Social" className="h-6" />
                </a>
              ))}
            </div>
          </div>
          </div>
          
          {/* <div>
            <p className="text-gray-400 mt-2">
              Welcome to Asset Build Ventures, a premier real estate and
              construction company based in Chennai.
            </p>
            <div className="flex space-x-4 mt-4 justify-center md:justify-start">
              {[facebook, twitter, linkedin, instagram].map((icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="hover:opacity-75 transition transform hover:scale-110"
                >
                  <img src={icon} alt="Social" className="h-6" />
                </a>
              ))}
            </div>
          </div> */}
          
          <div className="flex flex-row justify-between md:items-start gap-20">
             <div>
            <ul className="mt-2 space-y-2 text-gray-400">
              <li>
                <Link
                  to="/about"
                  className="hover:text-white transition duration-300 ease-in-out"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/why-us"
                  className="hover:text-white transition duration-300 ease-in-out"
                >
                  Why Us
                </Link>
              </li>
              {/* <li>
                <Link
                  to="/#feature-properties"
                  className="hover:text-white transition duration-300 ease-in-out"
                >
                  Properties
                </Link>
              </li> */}
              <li>
                <Link
                  to="/testimonials"
                  className="hover:text-white transition duration-300 ease-in-out"
                >
                  Testimonials
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-white transition duration-300 ease-in-out"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <ul className="mt-2 space-y-2 text-gray-400">
              {[
                { icon: phone, text: "+91 8056666902" },
                { icon: email, text: "assetbuildventures@gmail.com" },
                {
                  icon: location,
                  text: "Ground floor, H-block, 5th street, Anna Nagar, Chennai-600040",
                },
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex items-center justify-center md:justify-start gap-2 hover:text-white transition duration-300"
                >
                  <img src={item.icon} alt="Icon" className="h-5" /> {item.text}
                </li>
              ))}
            </ul>
          </div>
          </div>
         
        </div>

        <p className="text-center text-gray-500 text-sm mt-8 pb-4">
          Copyright © 2025 Asset Build Ventures. All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;