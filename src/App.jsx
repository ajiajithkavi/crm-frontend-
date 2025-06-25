import {
  BrowserRouter as Router,
  Routes,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
} from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import "./App.css";
import './index.css';

import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Add useLocation to the import

// import Login from "./Components/Authentication/Login"
import LoginPage from "./Components/Authentication/Login";
import Forgotpage from "./Components/Authentication/Forgotpassword";
import Resetpage from "./Components/Authentication/ResetPassword";

// Admin dashboard 
import AdminLayout from "./Components/AdminDashboard/AdminLayout";
import Admin from "./Components/AdminDashboard/Admin";
import PropertiesPage from "./Components/AdminDashboard/PropertiesPage";
import LeadsPage from "./Components/AdminDashboard/LeadsPage";
import Calendar from "./Components/AdminDashboard/Calendar";
import Vendor from "./Components/AdminDashboard/Vendor";
import AgentPage from "./Components/AdminDashboard/AgentPage";
import SettingsPage from "./Components/AdminDashboard/SettingsPage";
import HelpPage from "./Components/AdminDashboard/HelpPage";
import UserManagement from "./Components/AdminDashboard/UserManagement";
import UserDetails from "./Components/AdminDashboard/UserDetails";
import AdsPage from "./Components/AdminDashboard/AdsPage";




// Landing Page Components
// import Header from "./Components/HomePage/Header";
import PropertyHighlights from "./Components/HomePage/PropertyHighlights";
import Apartments from "./Components/HomePage/Apartments";
import Whoweare from "./Components/HomePage/Whoweare";
import TopAppartmentProject from "./Components/HomePage/TopAppartmentProject";
import FeatureProperties from "./Components/HomePage/FeatureProperties";
import FloorPlan from "./Components/HomePage/FloorPlan";
import Review from "./Components/HomePage/Review";
import Footer from "./Components/HomePage/Footer";
// import Task from "./Components/HomePage/Task";
// import Leads from "./Components/HomePage/Leads";
import AboutUs from "./Components/HomePage/AboutUs";
import ContactUs from "./Components/HomePage/ContactUs";
import Testimonials from "./Components/HomePage/Testimonials";
import FooterProperties from "./Components/HomePage/FooterProperties";
import WhyUs from "./Components/HomePage/WhyUs";


// Property Inner Page Components
import PropertyNavbar from "./Components/PropertyInnerPage/PropertyNavbar";
import Aboutus from "./Components/PropertyInnerPage/Aboutus";
import KeyAmenities from "./Components/PropertyInnerPage/KeyAmenities";
import Map from "./Components/PropertyInnerPage/Map";
// import MoreProperties from "./Components/PropertyInnerPage/MoreProperties";
import PropertyFooter from "./Components/PropertyInnerPage/PropertyFooter";

// Booking Inner Page Components
import BookingNavbar from "./Components/BookingInnerPage/BookingNavbar";
import BookingDetails from "./Components/BookingInnerPage/BookingDetails";
import BookingFooter from "./Components/BookingInnerPage/BookingFooter";


// User Dashboard
import User from "./Components/UserDashboard/User";
import UserLayout from "./Components/UserDashboard/UserLayout";
import SavedProperties from "./Components/UserDashboard/SavedProperties";
import ClientPage from "./Components/UserDashboard/ClientPage";
import UserCalendar from "./Components/UserDashboard/UserCalendar";
import UserProperties from "./Components/UserDashboard/UserProperties";
import Reports from "./Components/UserDashboard/Reports";
import UserHelp from "./Components/UserDashboard/UserHelp";
import UserSetting from "./Components/UserDashboard/UserSetting";




// property management dashboard
import PropertiesLayout from "./Components/PropertyManagementDashboard/PropertiesLayout";
import Properties from "./Components/PropertyManagementDashboard/Properties";
import ManagementProperties from "./Components/PropertyManagementDashboard/ManagementProperties";
import Tenants from "./Components/PropertyManagementDashboard/Tenants";
import PropertyCalendar from "./Components/PropertyManagementDashboard/PropertyCalendar";
import PropertyReport from "./Components/PropertyManagementDashboard/PropertyReport";
import Maintenance from "./Components/PropertyManagementDashboard/Maintenance";
import AddPropertyPage from "./Components/PropertyManagementDashboard/AddPropertyPage";
import PropertyBuilder from "./Components/PropertyManagementDashboard/PropertyBuilder";
import PropertyFloor from "./Components/PropertyManagementDashboard/PropertyFloor";
import PropertyUnit from "./Components/PropertyManagementDashboard/PropertyUnit";
import PropertySetting from "./Components/PropertyManagementDashboard/PropertySetting";
import PropertyHelp from "./Components/PropertyManagementDashboard/PropertyHelp";
import PropertyLeads from "./Components/PropertyManagementDashboard/PropertyLeads";
import PropertyLeadListing from "./Components/PropertyManagementDashboard/PropertyLeadListing";

// Builder Inner Page Components
// import BuilderNavbar from "./Components/BuilderInnerPage/BuilderNavbar";
import BuilderHighlights from "./Components/BuilderInnerPage/BuilderHighlights";
import BuilderProperty from "./Components/BuilderInnerPage/BuilderProperty";
import BuilderFooter from "./Components/BuilderInnerPage/BuilderFooter";

// client page components
import ClientNavbar from "./Components/ClientBookingPage/ClientNavbar";
// import ClientHighlights from "./Components/ClientBookingPage/ClientHighlights";
import MainContent from "./Components/ClientBookingPage/MainContent";
import ClientFooter from "./Components/ClientBookingPage/ClientFooter";
// import VendorPage from "./Components/HomePage/VendorPage";
// import AgentBrokersPage from "./Components/HomePage/AgentBrokersPage";

import AddBuilder from "./Components/AdminDashboard/AddBuilder";
import AddFloor from "./Components/AdminDashboard/AddFloor";
import AddProject from "./Components/AdminDashboard/AddProject";
import AddUnit from './Components/AdminDashboard/AddUnit';
// import Popup from "./Components/HomePage/Popup";
// import Leadsdeatils from "./Components/AdminDashboard/Leadsdeatils";
import Leadsdeatils from "./Components/AdminDashboard/Leadsdetails";
// import Listingpage from "./Components/AdminDashboard/Listingpage";
import Listingpage from "./Components/AdminDashboard/ListingPage";
import ContactDetails from "./Components/AdminDashboard/ContactDetails";
// import Page from "./Components/ClientBookingPage/Page";
import Payments from "./Components/UserDashboard/Payments";
import PopperPage from "./Components/ClientBookingPage/PopperPage";
import LeadsList from "./Components/AdminDashboard/LeadsList";
import Popup from "./Components/HomePage/Popup";

// Builder Inner Page Layout
function BuilderInnerPage() {

  const location = useLocation();

  useEffect(() => {
    // Disable scroll restoration to prevent React Router from restoring previous scroll position
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    // Scroll to top instantly
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]); // Run on route change

  
  return (
    <>
      {/* <BuilderNavbar /> */}
      <BuilderHighlights />
      <BuilderProperty />
      <BuilderFooter />
    </>
  );
}

// client booking Layout
function ClientBookingPage() {
  return (
    <div className="h-screen overflow-auto scrollbar-hide bg-gray-100">
      <ClientNavbar />
      {/* <ClientHighlights /> */}
      <MainContent />
      <ClientFooter />
      {/* <Page/> */}
      {/* <PopperPage/> */}
    </div>
  );
}



// Main Landing Page Layout
function LandingPage() {
  const apartmentsRef = useRef(null);
  const individualHouseRef = useRef(null);
  const topProjectsRef = useRef(null);
  const [selectedStateId, setSelectedStateId] = useState(null);
  const [searchData, setSearchData] = useState(null);
  const [showGoToTop, setShowGoToTop] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (location.hash === "#feature-properties" && individualHouseRef.current) {
      individualHouseRef.current.scrollIntoView({ behavior: "smooth" });
      individualHouseRef.current.focus();
    }
    const handleScroll = () => {
      setShowGoToTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.hash]);

  useEffect(() => {
    if (!selectedStateId) {
      setShowPopup(true);
    }
  }, []);

  const scrollToApartments = () => {
    apartmentsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToIndividualHouse = () => {
    individualHouseRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTopProjects = () => {
    topProjectsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Popup
        selectedLocation={selectedStateId}
        setSelectedLocation={setSelectedStateId}
        isVisible={showPopup}
        setIsVisible={setShowPopup}
      />

      <PropertyHighlights
        scrollToApartments={scrollToApartments}
        selectedStateId={selectedStateId}
        setSelectedStateId={setSelectedStateId}
        setSearchData={setSearchData}
        scrollToTopProjects={scrollToTopProjects}
        scrollToIndividualHouse={scrollToIndividualHouse}
      />

      <div ref={apartmentsRef}>
        <Apartments
          selectedStateId={selectedStateId}
          setSelectedStateId={setSelectedStateId} // Pass the setter function
          searchData={searchData}
          setSearchData={setSearchData} // Pass this if needed
        />
      </div>
      <Whoweare />
      <div ref={topProjectsRef}>
        <TopAppartmentProject />
      </div>
      <div ref={individualHouseRef} id="feature-properties" tabIndex={-1}>
        <FeatureProperties />
      </div>
      {/* <FloorPlan /> */}
      <Review />
      <Footer />
      {showGoToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-full shadow-xl hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 flex items-center justify-center z-50"
          aria-label="Go to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </>
  );
}

// Property Inner Page Layout
function PropertyPage() {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <PropertyNavbar />
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 w-full">
        <Aboutus />
        <div className="mt-0">
          <Map />
        </div>
      </div>
      {/* <MoreProperties /> */}
      <PropertyFooter />
    </div>
  );
}

// Booking Inner Page Layout
function BookingPage() {
  return (
    <>
      <BookingNavbar />
      <BookingDetails />
      <BookingFooter />
    </>
  );
}



function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ Login Route */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgotpassword" element={<Forgotpage />} />
        <Route path="/reset-password/:token" element={<Resetpage />} />

        {/* Main Landing page routes */}
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/userdashboard" element={<UserDashboard />} /> */}
        <Route path="/property" element={<PropertyPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/builder" element={<BuilderInnerPage />} />
        <Route path="/clientbooking" element={<ClientBookingPage />} />
        <Route path="/popperpage" element={<PopperPage />} />

        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/footerproperties" element={<FooterProperties />} />
        <Route path="/why-us" element={<WhyUs />} />

        {/* Admin Layout Route */}
        <Route path="/" element={<AdminLayout />}>
          <Route path="admin" element={<Admin />} /> {/* Dashboard */}
          <Route path="propertiespage" element={<PropertiesPage />} />
          <Route path="leadspage" element={<LeadsPage />} />
          <Route path="leadspage/list" element={<LeadsList />} />
          <Route path="leadsdeatils" element={<Leadsdeatils />} />
          <Route path="agentpage" element={<AgentPage />} />
          <Route path="listingpage" element={<Listingpage />} />
          <Route path="vendor" element={<Vendor />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="help" element={<HelpPage />} />
          <Route path="/add-project" element={<AddProject />} />
          <Route path="/add-Builder" element={<AddBuilder />} />
          <Route path="/add-floor" element={<AddFloor />} />
          <Route path="/add-unit" element={<AddUnit />} />
          <Route path="/usermanagement" element={<UserManagement />} />
          <Route path="/user-details" element={<UserDetails />} />
          <Route path="/contactdeatils" element={<ContactDetails />} />
          <Route path="/adspage" element={<AdsPage />} />
        </Route>

        {/* new */}

        {/* new */}

        {/* user dashboard routes */}
        <Route path="/" element={<UserLayout />}>
          <Route path="user" element={<User />} /> {/* Dashboard */}
          <Route path="userproperties" element={<UserProperties />} />
          <Route path="savedproperties" element={<SavedProperties />} />
          <Route path="clientpage" element={<ClientPage />} />
          <Route path="payments" element={<Payments />} />
          <Route path="usercalendar" element={<UserCalendar />} />
          <Route path="reports" element={<Reports />} />
          <Route path="userhelp" element={<UserHelp />} />
          <Route path="usersetting" element={<UserSetting />} />
        </Route>

        {/* propertymanagement */}

        <Route path="/" element={<PropertiesLayout />}>
          <Route path="properties" element={<Properties />} /> {/* Dashboard */}
          <Route
            path="managementproperties"
            element={<ManagementProperties />}
          />
          <Route path="tenants" element={<Tenants />} />
          <Route path="propertycalendar" element={<PropertyCalendar />} />
          <Route path="propertyreport" element={<PropertyReport />} />
          <Route path="maintenance" element={<Maintenance />} />
          <Route path="propertypage" element={<AddPropertyPage />} />
          <Route path="propertybuilder" element={<PropertyBuilder />} />
          <Route path="propertyfloor" element={<PropertyFloor />} />
          <Route path="propertyunit" element={<PropertyUnit />} />
          <Route path="propertyhelp" element={<PropertyHelp />} />
          <Route path="propertysetting" element={<PropertySetting />} />
          <Route path="propertyleads" element={<PropertyLeads />} />
          <Route path="propertylisting" element={<PropertyLeadListing />} />
        </Route>

        {/* Client Booking Page Routes */}
      </Routes>
    </Router>
  );
}

export default App;