





import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const BASE_URL = "https://crm-bcgg.onrender.com";
const categories = ["All", "Apartment", "Villa", "Plot", "Land"];

const Apartments = ({ selectedStateId, searchData, setSelectedStateId,setSearchData }) => {
  const [properties, setProperties] = useState([]);
  const [allProperties, setAllProperties] = useState([]);
  const [selected, setSelected] = useState("All");
  const [selectedDistrict, setSelectedDistrict] = useState(
    searchData?.district || ""
  );
  const [propertyTypeFilter, setPropertyTypeFilter] = useState(
    searchData?.propertytype || ""
  );
  const [priceRangeFilter, setPriceRangeFilter] = useState(
    searchData?.pricerange || ""
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const url = `${BASE_URL}/api/propertiesGet/`;
        const response = await axios.get(url);
        setAllProperties(response.data);
        setProperties(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch properties.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  useEffect(() => {
    if (searchData) {
      setSelectedDistrict(searchData.districtid || "");
      setPropertyTypeFilter(searchData.propertytype || "");
      setPriceRangeFilter(searchData.priceRange || "");
    }
  }, [searchData]);

  console.log(searchData);

  

  useEffect(() => {
    if (allProperties.length > 0) {
      let filtered = [...allProperties];

      // Apply state filter if selected
      if (selectedStateId) {
        const normalizedSelectedState = selectedStateId.trim().toLowerCase();
        filtered = filtered.filter(
          (property) =>
            property.address?.state &&
            property.address.state.trim().toLowerCase() ===
              normalizedSelectedState
        );
      }

      // Apply city/district filter (case-insensitive)
      if (searchData?.districtid) {
        const normalizedSelectedCity = searchData.districtid
          .trim()
          .toLowerCase();
        filtered = filtered.filter(
          (property) =>
            property.address?.city &&
            property.address.city.trim().toLowerCase() ===
              normalizedSelectedCity
        );
      }

      // Apply property type filter
      if (searchData?.propertytype && searchData.propertytype !== "All") {
        filtered = filtered.filter((property) =>
          property.projects?.some(
            (project) =>
              project.propertyType?.toLowerCase() ===
              searchData.propertytype.toLowerCase()
          )
        );
      }

      // Apply price range filter
      if (searchData?.pricerange) {
        filtered = filtered.filter((property) =>
          property.projects?.some((project) =>
            project.buildings?.some(
              (building) =>
                building.priceRange?.toLowerCase() ===
                searchData.pricerange.toLowerCase()
            )
          )
        );
      }

      // Apply category filter
      if (selected !== "All") {
        filtered = filtered.filter((property) =>
          property.projects?.some(
            (project) =>
              project.propertyType?.toLowerCase() === selected.toLowerCase()
          )
        );
      }

      setProperties(filtered);
    }
  }, [selectedStateId, searchData, selected, allProperties]);

  const clearAllFilters = () => {
    setSelectedStateId(null);
    if (setSearchData) {
      setSearchData(null);
    }
    setSelected("All");
  };

  const filteredProperties = Array.isArray(properties) ? properties : [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 mt-10" id="apartments">
      {/* Filter Display */}
      {(selectedStateId ||
        selectedDistrict ||
        propertyTypeFilter ||
        priceRangeFilter) && (
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="text-sm">Filters:</span>
          {selectedStateId && (
            <span className="text-sm bg-gray-100 px-2 py-1 rounded">
              State ID: {selectedStateId}
            </span>
          )}
          {selectedDistrict && (
            <span className="text-sm bg-gray-100 px-2 py-1 rounded">
              District: {selectedDistrict}
            </span>
          )}
          {propertyTypeFilter && (
            <span className="text-sm bg-gray-100 px-2 py-1 rounded">
              Type: {propertyTypeFilter}
            </span>
          )}
          {priceRangeFilter && (
            <span className="text-sm bg-gray-100 px-2 py-1 rounded">
              Price: {priceRangeFilter}
            </span>
          )}
          <button
            onClick={clearAllFilters}
            className="ml-2 text-sm text-red-500 hover:text-red-700"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Heading and View All */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold leading-snug font-jakarta">
            Explore Properties That Suit
            <br />
            Your Lifestyle
          </h2>
        </div>
        <Link
          to="/login"
          className="text-white bg-orange-600 hover:bg-orange-700 px-4 py-2 text-sm rounded"
        >
          View all
        </Link>
      </div>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelected(cat)}
            className={`px-4 py-1 rounded-full border ${
              selected === cat
                ? "bg-orange-600 text-white border-orange-600"
                : "text-gray-700 border-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Property Grid */}
      {loading ? (
        <div className="text-center py-10 text-gray-500">
          Loading properties...
        </div>
      ) : error ? (
        <div className="text-center py-10 text-red-500">{error}</div>
      ) : filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <div
              key={property._id}
              className="relative w-full h-[300px] rounded-lg overflow-hidden shadow-md group cursor-pointer"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                navigate("/builder", {
                  state: { builderId: property._id },
                });
              }}
            >
              <img
                src={
                  property.coverPhotos?.length > 0
                    ? property.coverPhotos[0].url
                    : property.logo
                }
                alt={property.companyName}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute top-2 left-2 bg-white bg-opacity-80 text-black text-xs font-medium px-3 py-1 rounded-r-lg shadow">
                {property.address?.city || "Unknown city"}
              </div>
              <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-sm px-3 py-1 rounded-l-lg shadow">
                {property.companyName}
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 text-white">
                <h3 className="font-semibold">{property.companyName}</h3>
                <p className="text-sm">
                  {property.projects
                    ?.map((project) => project.propertyType)
                    .join(", ")}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500">
            No properties found matching your filters.
          </p>
          <button
            onClick={clearAllFilters}
            className="mt-4 text-orange-600 hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Apartments;