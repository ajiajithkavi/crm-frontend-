


// import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { useLocation, useNavigate } from "react-router-dom";
// import { IoMdArrowBack } from "react-icons/io";
// import axios from "axios";
// import { motion } from "framer-motion"; // Added Framer Motion import

// const BASE_URL = "https://crm-bcgg.onrender.com";
// const UPLOAD_URL = "https://z-backend-2xag.onrender.com/api/upload/type";
// const token = JSON.parse(sessionStorage.getItem("logindata"))?.token;

// const axiosInstance = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     Authorization: `Bearer ${token}`,
//     "Content-Type": "application/json",
//   },
// });

// export default function BuildingList() {
//   const location = useLocation();
//   const id = location?.state?.id;
//   const [buildings, setBuildings] = useState([]);
//   const [projects, setProjects] = useState([]);
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [selectedBuilding, setSelectedBuilding] = useState(null);
//   const [photoIndex, setPhotoIndex] = useState(0);
//   const [expandedDescriptions, setExpandedDescriptions] = useState({});
//   const [dropdownOpenIndex, setDropdownOpenIndex] = useState(null); // Added for dropdown
//   const [filterProject, setFilterProject] = useState("All");
//   const [filterBuildingName, setFilterBuildingName] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//     setValue,
//   } = useForm();

//   const [amenities, setAmenities] = useState([]);
//   const [newAmenity, setNewAmenity] = useState("");
//   const [photos, setPhotos] = useState([]);
//   const [photoFiles, setPhotoFiles] = useState([]);
//   const [videos, setVideos] = useState([]);
//   const [videoFiles, setVideoFiles] = useState([]);
//   const [uploadingMedia, setUploadingMedia] = useState(false);

//   // Property types for dropdown
//   const type = [
//     "Residential",
//     "Commercial",
//     "Industrial",
//     "Mixed Use",
//     "Agricultural",
//     "Special Purpose",
//   ];

//   // Fetch buildings and projects on component mount
//   useEffect(() => {
//     fetchBuildings();
//     fetchProjectDetails();
//   }, []);

//   useEffect(() => {
//     document.body.style.overflow = showModal ? "hidden" : "auto";
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [showModal]);

//   const fetchBuildings = async () => {
//     try {
//       setIsLoading(true);
//       const response = await axiosInstance.get(
//         `/api/properties//buildings/by-project/${id}`
//       );
//       setBuildings(response.data);
//     } catch (error) {
//       console.error("Error fetching buildings:", error);
//       alert("Failed to fetch buildings");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchProjectDetails = async () => {
//     try {
//       const response = await axiosInstance.get(
//         `/api/propertiesGet/project/${id}`
//       );
//       setSelectedProject(response.data);
//       setProjects([response.data]);
//     } catch (error) {
//       console.error("Error fetching project details:", error);
//       alert("Failed to fetch project details");
//     }
//   };

//   const openModal = (building = null) => {
//     if (building) {
//       // Edit mode
//       setSelectedBuilding(building);
//       setIsEditMode(true);
//       setValue("project", building.project._id || building.project);
//       setValue("buildingName", building.buildingName);
//       setValue("floorsCount", building.floorsCount);
//       setValue("description", building.description);
//       setValue("buildingArea", building.buildingArea);
//       setValue("priceRange", building.priceRange);
//       setValue("type", building.type);

//       setAmenities(building.amenities || []);
//       setPhotos(building.photos || []);
//       setVideos(building.videos || []);
//     } else {
//       // Add mode
//       reset();
//       setAmenities([]);
//       setPhotos([]);
//       setVideos([]);
//       setPhotoFiles([]);
//       setVideoFiles([]);
//       setIsEditMode(false);
//     }
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setSelectedBuilding(null);
//     setPhotoIndex(0);
//   };

//   const nextPhoto = () => {
//     if (!selectedBuilding) return;
//     setPhotoIndex((prev) => (prev + 1) % selectedBuilding.photos.length);
//   };

//   const prevPhoto = () => {
//     if (!selectedBuilding) return;
//     setPhotoIndex(
//       (prev) =>
//         (prev - 1 + selectedBuilding.photos.length) %
//         selectedBuilding.photos.length
//     );
//   };

//   const toggleDescription = (index) => {
//     setExpandedDescriptions((prev) => ({
//       ...prev,
//       [index]: !prev[index],
//     }));
//   };

//   const handleAddAmenity = () => {
//     if (newAmenity.trim() && !amenities.includes(newAmenity.trim())) {
//       setAmenities([...amenities, newAmenity.trim()]);
//       setNewAmenity("");
//     }
//   };

//   const handleRemoveAmenity = (index) => {
//     setAmenities(amenities.filter((_, i) => i !== index));
//   };

//   const uploadSingleFile = async (file, type) => {
//     const formData = new FormData();
//     formData.append("files", file);
//     formData.append("type", type);

//     try {
//       const response = await axios.post(UPLOAD_URL, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//         },
//         onUploadProgress: (progressEvent) => {
//           const percentCompleted = Math.round(
//             (progressEvent.loaded * 100) / progressEvent.total
//           );
//           setUploadProgress(percentCompleted);
//         },
//       });
//       return response.data.urls[0];
//     } catch (error) {
//       console.error(`Error uploading ${type}:`, error);
//       throw error;
//     }
//   };

//   const handleFileUpload = async (e, type) => {
//     const files = Array.from(e.target.files);
//     const validTypes =
//       type === "photo"
//         ? ["image/jpeg", "image/png", "image/gif"]
//         : ["video/mp4", "video/webm"];
//     const maxFiles = type === "photo" ? 5 : 3;
//     const currentFiles = type === "photo" ? photos : videos;
//     const remainingSlots = maxFiles - currentFiles.length;

//     if (files.length > remainingSlots) {
//       alert(`You can only upload up to ${maxFiles} ${type}s.`);
//       return;
//     }

//     const validFiles = files.filter((file) => validTypes.includes(file.type));
//     if (validFiles.length !== files.length) {
//       alert(
//         `Please upload only ${
//           type === "photo" ? "images (JPEG, PNG, GIF)" : "videos (MP4, WebM)"
//         }.`
//       );
//       return;
//     }

//     try {
//       setUploadingMedia(true);
//       setUploadProgress(0);

//       const tempUrls = validFiles.map((file) => URL.createObjectURL(file));
//       if (type === "photo") {
//         setPhotos((prev) => [...prev, ...tempUrls]);
//         setPhotoFiles((prev) => [...prev, ...validFiles]);
//       } else {
//         setVideos((prev) => [...prev, ...tempUrls]);
//         setVideoFiles((prev) => [...prev, ...validFiles]);
//       }

//       for (let i = 0; i < validFiles.length; i++) {
//         const file = validFiles[i];
//         const formData = new FormData();
//         formData.append("file", file);

//         const response = await axios.post(UPLOAD_URL, formData, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           },
//           onUploadProgress: (progressEvent) => {
//             const percentCompleted = Math.round(
//               (progressEvent.loaded * 100) / progressEvent.total
//             );
//             setUploadProgress(percentCompleted);
//           },
//         });

//         const uploadedUrl =
//           response.data?.fileUrl ||
//           response.data?.url ||
//           response.data?.urls?.[0];

//         if (type === "photo") {
//           setPhotos((prev) => {
//             const newPhotos = [...prev];
//             const tempIndex = newPhotos.indexOf(tempUrls[i]);
//             if (tempIndex !== -1) {
//               newPhotos[tempIndex] = uploadedUrl;
//             }
//             return newPhotos;
//           });
//         } else {
//           setVideos((prev) => {
//             const newVideos = [...prev];
//             const tempIndex = newVideos.indexOf(tempUrls[i]);
//             if (tempIndex !== -1) {
//               newVideos[tempIndex] = uploadedUrl;
//             }
//             return newVideos;
//           });
//         }
//       }
//     } catch (error) {
//       console.error(`Error uploading ${type}s:`, error);
//       alert(
//         `Failed to upload ${type}s: ${
//           error.response?.data?.message || error.message
//         }`
//       );

//       if (type === "photo") {
//         setPhotos((prev) => prev.filter((url) => !tempUrls.includes(url)));
//         setPhotoFiles((prev) =>
//           prev.filter((_, i) => i >= prev.length - validFiles.length)
//         );
//       } else {
//         setVideos((prev) => prev.filter((url) => !tempUrls.includes(url)));
//         setVideoFiles((prev) =>
//           prev.filter((_, i) => i >= prev.length - validFiles.length)
//         );
//       }
//     } finally {
//       setUploadingMedia(false);
//       setUploadProgress(0);
//     }
//   };

//   const onSubmit = async (data) => {
//     try {
//       setIsLoading(true);

//       const buildingData = {
//         ...data,
//         amenities,
//         photos: photos.filter((p) => typeof p === "string"),
//         videos: videos.filter((v) => typeof v === "string"),
//       };

//       if (isEditMode && selectedBuilding) {
//         await axiosInstance.put(
//           `/api/properties/building/${selectedBuilding._id}`,
//           buildingData
//         );
//         alert("Building updated successfully!");
//       } else {
//         await axiosInstance.post("/api/properties/building", buildingData);
//         alert("Building added successfully!");
//       }

//       await fetchBuildings();
//       setShowModal(false);
//       reset();
//     } catch (error) {
//       console.error("Error saving building:", error);
//       alert(
//         `Failed to ${isEditMode ? "update" : "add"} building: ${
//           error.response?.data?.message || error.message
//         }`
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDeleteBuilding = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this building?")) {
//       return;
//     }

//     try {
//       setIsLoading(true);
//       await axiosInstance.delete(`/api/properties/building/${id}`);
//       alert("Building deleted successfully!");
//       await fetchBuildings();
//     } catch (error) {
//       console.error("Error deleting building:", error);
//       alert("Failed to delete building");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const removeMedia = (index, type) => {
//     if (type === "photo") {
//       setPhotos(photos.filter((_, i) => i !== index));
//       setPhotoFiles(photoFiles.filter((_, i) => i !== index));
//     } else {
//       setVideos(videos.filter((_, i) => i !== index));
//       setVideoFiles(videoFiles.filter((_, i) => i !== index));
//     }
//   };

//   const filteredBuildings = buildings.filter((b) => {
//     const matchesProject =
//       filterProject === "All" ||
//       b.project._id === filterProject ||
//       b.project === filterProject;
//     const matchesName =
//       filterBuildingName === "" ||
//       b.buildingName.toLowerCase().includes(filterBuildingName.toLowerCase());
//     return matchesProject && matchesName;
//   });

//   const handleAddfloorClick = (id) => {
//     navigate("/PropertyFloor", {
//       state: { id },
//     });
//   };
//   const goBack = () => navigate(-1);

//   return (
//     <div className="flex flex-col h-screen overflow-auto bg-gray-100 p-4">
//       <IoMdArrowBack
//         onClick={goBack}
//         className="mb-2 text-2xl cursor-pointer"
//       />

//       {/* Filters */}
//       <div className="mb-4 flex flex-wrap gap-3 items-center justify-between">
//         <div className="flex flex-wrap gap-3 items-center flex-grow">
//           <select
//             className="border rounded p-2"
//             value={filterProject}
//             onChange={(e) => setFilterProject(e.target.value)}
//           >
//             <option value="All">All Projects</option>
//             {selectedProject && (
//               <option key={selectedProject._id} value={selectedProject._id}>
//                 {selectedProject.projectName}
//               </option>
//             )}
//           </select>
//           <input
//             type="text"
//             placeholder="Filter by building name"
//             value={filterBuildingName}
//             onChange={(e) => setFilterBuildingName(e.target.value)}
//             className="border rounded p-2"
//           />
//         </div>
//         <button
//           type="button"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition ml-auto"
//           onClick={() => openModal()}
//           disabled={isLoading}
//         >
//           {isLoading ? "Loading..." : "Add Building"}
//         </button>
//       </div>

//       {/* Buildings Grid */}
//       <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-[90%] mx-auto">
//         {isLoading && !showModal ? (
//           <div className="flex justify-center items-center h-64">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//            </div>
//         ) : filteredBuildings.length === 0 ? (
//           <p className="text-center col-span-full text-gray-700">
//             No buildings found.
//           </p>
//         ) : (
//           filteredBuildings.map((building, index) => (
//             <motion.div
//               key={building._id}
//               className="rounded-lg w-[90%] mx-auto bg-white shadow-md"
//               initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.5 }}
//               whileHover={{
//                 scale: 1.05,
//                 boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
//               }}
//               onClick={() => handleAddfloorClick(building._id)}
//               role="button"
//               aria-label={`View floors for ${building.buildingName}`}
//             >
//               {building.photos?.length > 0 ? (
//                 <img
//                   src={building.photos[0]}
//                   alt={building.buildingName}
//                   className="w-full h-40 sm:h-48 md:h-60 object-cover"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     openModal(building);
//                   }}
//                 />
//               ) : (
//                 <div
//                   className="w-full h-40 sm:h-48 md:h-60 bg-gray-300 flex items-center justify-center text-gray-600"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     openModal(building);
//                   }}
//                 >
//                   No Image
//                 </div>
//               )}
//               <div className="p-4">
//                 <h3 className="text-lg font-bold mb-1">{building.buildingName}</h3>
//                 <p className="text-lg text-red-600 font-semibold mb-1">
//                   {building.priceRange || "Contact for Price"}
//                 </p>
//                 <p className="text-sm text-gray-500 flex items-center gap-2 mb-1">
//                   <svg
//                     className="w-4 h-4"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M17.657 16.657L13.414 12.414a2 2 0 10-2.828 2.828l4.243 4.243a2 2 0 002.828-2.828z"
//                     />
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M11 19a8 8 0 100-16 8 8 0 000 16z"
//                     />
//                   </svg>
//                   {selectedProject?.projectName || "N/A"}
//                 </p>
//                 <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-2">
//                   <span className="flex items-center gap-1">
//                     <svg
//                       className="w-4 h-4"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M4 8h16M4 12h16M4 16h16"
//                       />
//                     </svg>
//                     {building.buildingArea || "Unknown Area"}
//                   </span>
//                 </div>
//                 <p className="text-sm text-gray-600 mb-2">
//                   Type: {building.type || "N/A"}
//                 </p>
//                 {/* {!expandedDescriptions[index] && (
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       toggleDescription(index);
//                     }}
//                     className="text-blue-600 underline self-start mb-2"
//                     aria-expanded={expandedDescriptions[index]}
//                     aria-controls={`description-${index}`}
//                   >
//                     Show More
//                   </button>
//                 )} */}
//                 {expandedDescriptions[index] && (
//                   <div id={`description-${index}`}>
//                     <p className="text-gray-600 mb-2">
//                       {building.description || "No description available"}
//                     </p>
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         toggleDescription(index);
//                       }}
//                       className="text-blue-600 underline self-start mb-2"
//                       aria-expanded={expandedDescriptions[index]}
//                       aria-controls={`description-${index}`}
//                     >
//                       Show Less
//                     </button>
//                   </div>
//                 )}
//                 <div className="relative z-10 mt-2">
//                   {/* <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       setDropdownOpenIndex(dropdownOpenIndex === index ? null : index);
//                     }}
//                     className="relative bg-gray-200 p-2 rounded text-sm hover:bg-gray-300"
//                     aria-haspopup="true"
//                     aria-expanded={dropdownOpenIndex === index}
//                     aria-controls={`details-${index}`}
//                   >
//                     Details ▼
//                   </button> */}
//                   {dropdownOpenIndex === index && (
//                     <div
//                       id={`details-${index}`}
//                       className="absolute top-0 right-0 bg-white border rounded shadow mt-2 p-3 w-56 z-20"
//                     >
//                       <p>
//                         <strong>Floors:</strong> {building.floorsCount ?? "N/A"}
//                       </p>
//                       <p>
//                         <strong>Type:</strong> {building.type || "N/A"}
//                       </p>
//                       <p>
//                         <strong>Area:</strong> {building.buildingArea || "N/A"}
//                       </p>
//                       <p>
//                         <strong>Price:</strong> {building.priceRange || "N/A"}
//                       </p>
//                       <p>
//                         <strong>Amenities:</strong>{" "}
//                         {building.amenities?.length
//                           ? building.amenities.join(", ")
//                           : "None"}
//                       </p>
//                     </div>
//                   )}
//                 </div>
//                 <div className="flex space-x-2 mt-4">
//                   <button
//                     className="bg-blue-600 text-white p-2 text-sm rounded hover:bg-blue-700"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       openModal(building);
//                     }}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="bg-red-600 text-white p-2 text-sm rounded hover:bg-red-700"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleDeleteBuilding(building._id);
//                     }}
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           ))
//         )}
//       </motion.div>

//       {/* Building Detail Modal */}
//       {/* {selectedBuilding && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
//           onClick={closeModal}
//         >
//           <div
//             className="bg-white rounded-lg max-w-4xl w-full max-h-full overflow-auto p-6 relative"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               onClick={closeModal}
//               className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold"
//             >
//               ×
//             </button>

//             <h2 className="text-3xl font-bold mb-3">
//               {selectedBuilding.buildingName}
//             </h2>
//             <p className="mb-2 text-gray-700">
//               <strong>Project:</strong>{" "}
//               {selectedBuilding.project?.projectName || "N/A"}
//             </p>
//             <p className="mb-2 text-gray-700">
//               <strong>Floors:</strong> {selectedBuilding.floorsCount ?? "N/A"}
//             </p>
//             <p className="mb-2 text-gray-700">
//               <strong>Type:</strong> {selectedBuilding.type || "N/A"}
//             </p>
//             <p className="mb-2 text-gray-700">
//               <strong>Building Area:</strong>{" "}
//               {selectedBuilding.buildingArea || "N/A"}
//             </p>
//             <p className="mb-2 text-gray-700">
//               <strong>Price Range:</strong>{" "}
//               {selectedBuilding.priceRange || "N/A"}
//             </p>

//             <p className="mb-4 text-gray-700">{selectedBuilding.description}</p>

//             <div className="mb-4">
//               <strong>Amenities:</strong>{" "}
//               {selectedBuilding.amenities?.length
//                 ? selectedBuilding.amenities.join(", ")
//                 : "None"}
//             </div>

//             <div className="mb-4">
//               <strong>Photos:</strong>
//               {selectedBuilding.photos?.length > 0 ? (
//                 <div className="relative mt-2">
//                   <img
//                     src={selectedBuilding.photos[photoIndex]}
//                     className="rounded max-h-96 w-full object-contain"
//                   />
//                   {selectedBuilding.photos.length > 1 && (
//                     <>
//                       <button
//                         onClick={prevPhoto}
//                         className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-r"
//                       >
//                         ‹
//                       </button>
//                       <button
//                         onClick={nextPhoto}
//                         className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-l"
//                       >
//                         ›
//                       </button>
//                     </>
//                   )}
//                   <p className="text-center mt-1 text-gray-600">
//                     Photo {photoIndex + 1} / {selectedBuilding.photos.length}
//                   </p>
//                 </div>
//               ) : (
//                 <p className="text-gray-600 mt-2">No photos available.</p>
//               )}
//             </div>

//             <div>
//               <strong>Videos:</strong>
//               {selectedBuilding.videos?.length > 0 ? (
//                 <div className="space-y-4 mt-2">
//                   {selectedBuilding.videos.map((v, i) => (
//                     <video
//                       key={i}
//                       controls
//                       src={v}
//                       className="w-full max-h-64 rounded"
//                     />
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-gray-600 mt-2">No videos available.</p>
//               )}
//             </div>
//           </div>
//         </div>
//       )} */}

//       {/* Add/Edit Building Modal */}
//       {showModal && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
//           onClick={() => setShowModal(false)}
//         >
//           <div
//             className="bg-white rounded-lg max-w-2xl w-full max-h-full overflow-auto p-6 relative"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               className="absolute top-2 right-3 text-gray-600 text-2xl"
//               onClick={() => setShowModal(false)}
//             >
//               ×
//             </button>
//             <h2 className="text-2xl font-bold mb-4">
//               {isEditMode ? "Edit Building" : "Add New Building"}
//             </h2>
//             {uploadProgress > 0 && uploadProgress < 100 && (
//               <div className="mb-4">
//                 <div className="w-full bg-gray-200 rounded-full h-2.5">
//                   <div
//                     className="bg-blue-600 h-2.5 rounded-full"
//                     style={{ width: `${uploadProgress}%` }}
//                   ></div>
//                 </div>
//                 <p className="text-sm text-gray-600 mt-1">
//                   Uploading files... {uploadProgress}%
//                 </p>
//               </div>
//             )}
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//               {/* Project Selection */}
//               <div>
//                 <label
//                   htmlFor="project"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Project*
//                 </label>
//                 <select
//                   id="project"
//                   {...register("project", { required: "Project is required" })}
//                   className={`w-full px-3 py-2 border rounded-md ${
//                     errors.project ? "border-red-500" : "border-gray-300"
//                   }`}
//                 >
//                   <option value="">Select a project</option>
//                   {projects.map((project) => (
//                     <option key={project._id} value={project._id}>
//                       {project.projectName}
//                     </option>
//                   ))}
//                 </select>
//                 {errors.project && (
//                   <p className="mt-1 text-sm text-red-600">
//                     {errors.project.message}
//                   </p>
//                 )}
//               </div>

//               {/* Building Name */}
//               <div>
//                 <label
//                   htmlFor="buildingName"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Building Name*
//                 </label>
//                 <input
//                   type="text"
//                   id="buildingName"
//                   {...register("buildingName", {
//                     required: "Building name is required",
//                     minLength: {
//                       value: 3,
//                       message: "Building name must be at least 3 characters",
//                     },
//                   })}
//                   className={`w-full px-3 py-2 border rounded-md ${
//                     errors.buildingName ? "border-red-500" : "border-gray-300"
//                   }`}
//                   placeholder="Enter building name"
//                 />
//                 {errors.buildingName && (
//                   <p className="mt-1 text-sm text-red-600">
//                     {errors.buildingName.message}
//                   </p>
//                 )}
//               </div>

//               {/* Floors Count */}
//               <div>
//                 <label
//                   htmlFor="floorsCount"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Number of Floors
//                 </label>
//                 <input
//                   type="number"
//                   id="floorsCount"
//                   {...register("floorsCount", {
//                     min: {
//                       value: 1,
//                       message: "Number of floors must be at least 1",
//                     },
//                   })}
//                   min="1"
//                   className={`w-full px-3 py-2 border rounded-md ${
//                     errors.floorsCount ? "border-red-500" : "border-gray-300"
//                   }`}
//                   placeholder="Enter number of floors"
//                 />
//                 {errors.floorsCount && (
//                   <p className="mt-1 text-sm text-red-600">
//                     {errors.floorsCount.message}
//                   </p>
//                 )}
//               </div>

//               {/* Building Area */}
//               <div>
//                 <label
//                   htmlFor="buildingArea"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Building Area (location)
//                 </label>
//                 <input
//                   type="text"
//                   id="buildingArea"
//                   {...register("buildingArea")}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   placeholder="Enter building area location"
//                 />
//               </div>

//               {/* Price Range */}
//               <div>
//                 <label
//                   htmlFor="priceRange"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Price Range
//                 </label>
//                 <input
//                   type="text"
//                   id="priceRange"
//                   {...register("priceRange")}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                   placeholder="e.g. 1.8 cr - 3 cr"
//                 />
//               </div>

//               {/* Property Type Dropdown */}
//               <div>
//                 <label
//                   htmlFor="type"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Property Type
//                 </label>
//                 <select
//                   id="type"
//                   {...register("type")}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                 >
//                   <option value="">Select property type</option>
//                   {type.map((type) => (
//                     <option key={type} value={type}>
//                       {type}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Amenities */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Amenities
//                 </label>
//                 <div className="flex space-x-2">
//                   <input
//                     type="text"
//                     value={newAmenity}
//                     onChange={(e) => setNewAmenity(e.target.value)}
//                     onKeyPress={(e) => e.key === "Enter" && handleAddAmenity()}
//                     placeholder="Add amenity (e.g. Gym, Pool)"
//                     className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
//                   />
//                   <button
//                     type="button"
//                     onClick={handleAddAmenity}
//                     className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//                   >
//                     Add
//                   </button>
//                 </div>
//                 {amenities.length > 0 && (
//                   <div className="mt-2 flex flex-wrap gap-2">
//                     {amenities.map((amenity, index) => (
//                       <div
//                         key={index}
//                         className="flex items-center bg-gray-100 px-3 py-1 rounded-full"
//                       >
//                         <span className="text-sm">{amenity}</span>
//                         <button
//                           type="button"
//                           onClick={() => handleRemoveAmenity(index)}
//                           className="ml-2 text-gray-500 hover:text-red-500"
//                         >
//                           ×
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* Photos Upload */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Building Photos (Max 5)
//                 </label>
//                 <div className="flex items-center space-x-2">
//                   <label className="flex-1 cursor-pointer">
//                     <div className="px-3 py-2 border border-gray-300 rounded-md text-center hover:bg-gray-50 transition-colors">
//                       <span className="text-sm text-gray-600">
//                         Select photos
//                       </span>
//                       <input
//                         type="file"
//                         multiple
//                         accept="image/jpeg,image/png,image/gif"
//                         onChange={(e) => handleFileUpload(e, "photo")}
//                         className="hidden"
//                         disabled={uploadingMedia}
//                       />
//                     </div>
//                   </label>
//                   <span className="text-sm text-gray-500">
//                     {photos.length} selected
//                   </span>
//                 </div>
//                 {photos.length > 0 && (
//                   <div className="mt-3 grid grid-cols-3 gap-2">
//                     {photos.map((photo, index) => (
//                       <div key={index} className="relative group">
//                         <img
//                           src={photo}
//                           alt={`Building ${index}`}
//                           className="w-full h-24 object-cover rounded"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => removeMedia(index, "photo")}
//                           className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
//                         >
//                           ×
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* Videos Upload */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Building Videos (Max 3)
//                 </label>
//                 <div className="flex items-center space-x-2">
//                   <label className="flex-1 cursor-pointer">
//                     <div className="px-3 py-2 border border-gray-300 rounded-md text-center hover:bg-gray-50 transition-colors">
//                       <span className="text-sm text-gray-600">
//                         Select videos
//                       </span>
//                       <input
//                         type="file"
//                         multiple
//                         accept="video/mp4,video/webm"
//                         onChange={(e) => handleFileUpload(e, "video")}
//                         className="hidden"
//                         disabled={uploadingMedia}
//                       />
//                     </div>
//                   </label>
//                   <span className="text-sm text-gray-500">
//                     {videos.length} selected
//                   </span>
//                 </div>
//                 {videos.length > 0 && (
//                   <div className="mt-3 grid grid-cols-1 gap-2">
//                     {videos.map((video, index) => (
//                       <div key={index} className="relative group">
//                         <video
//                           src={video}
//                           className="w-full h-auto rounded"
//                           controls
//                         />
//                         <button
//                           type="button"
//                           onClick={() => removeMedia(index, "video")}
//                           className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
//                         >
//                           ×
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* Description */}
//               <div>
//                 <label
//                   htmlFor="description"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Description
//                 </label>
//                 <textarea
//                   id="description"
//                   {...register("description", {
//                     maxLength: {
//                       value: 500,
//                       message: "Description cannot exceed 500 characters",
//                     },
//                   })}
//                   rows="4"
//                   className={`w-full px-3 py-2 border rounded-md ${
//                     errors.description ? "border-red-500" : "border-gray-300"
//                   }`}
//                   placeholder="Enter building description..."
//                 />
//                 {errors.description && (
//                   <p className="mt-1 text-sm text-red-600">
//                     {errors.description.message}
//                   </p>
//                 )}
//               </div>

//               {/* Form Actions */}
//               <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setAmenities([]);
//                     setPhotos([]);
//                     setVideos([]);
//                     setPhotoFiles([]);
//                     setVideoFiles([]);
//                     setNewAmenity("");
//                     reset();
//                   }}
//                   className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
//                 >
//                   Clear
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
//                   disabled={isLoading || uploadingMedia}
//                 >
//                   {isLoading
//                     ? "Saving..."
//                     : isEditMode
//                     ? "Update Building"
//                     : "Save Building"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }






import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import axios from "axios";
import { motion } from "framer-motion";

const BASE_URL = "https://crm-bcgg.onrender.com";
const UPLOAD_URL = "https://z-backend-2xag.onrender.com/api/upload/type";
const token = JSON.parse(sessionStorage.getItem("logindata"))?.token;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});

export default function BuildingList() {
  const location = useLocation();
  const id = location?.state?.id;
  const [buildings, setBuildings] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [dropdownOpenIndex, setDropdownOpenIndex] = useState(null);
  const [filterProject, setFilterProject] = useState("All");
  const [filterBuildingName, setFilterBuildingName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const [amenities, setAmenities] = useState([]);
  const [newAmenity, setNewAmenity] = useState("");
  const [photos, setPhotos] = useState([]);
  const [photoFiles, setPhotoFiles] = useState([]);
  const [videos, setVideos] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);
  const [uploadingMedia, setUploadingMedia] = useState(false);

  const type = [
    "Residential",
    "Commercial",
    "Industrial",
    "Mixed Use",
    "Agricultural",
    "Special Purpose",
  ];

  useEffect(() => {
    fetchBuildings();
    fetchProjectDetails();
  }, []);

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  const fetchBuildings = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(
        `/api/properties/buildings/by-project/${id}`
      );
      setBuildings(response.data);
    } catch (error) {
      console.error("Error fetching buildings:", error);
      alert("Failed to fetch buildings");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProjectDetails = async () => {
    try {
      const response = await axiosInstance.get(
        `/api/propertiesGet/project/${id}`
      );
      setSelectedProject(response.data);
      setProjects([response.data]);
    } catch (error) {
      console.error("Error fetching project details:", error);
      alert("Failed to fetch project details");
    }
  };

  const openModal = (building = null) => {
    if (building) {
      setSelectedBuilding(building);
      setIsEditMode(true);
      setValue("project", building.project._id || building.project);
      setValue("buildingName", building.buildingName);
      setValue("floorsCount", building.floorsCount);
      setValue("description", building.description);
      setValue("buildingArea", building.buildingArea);
      setValue("priceRange", building.priceRange);
      setValue("type", building.type);
      setValue("mapView", building.mapView || "");
      setAmenities(building.amenities || []);
      setPhotos(building.photos || []);
      setVideos(building.videos || []);
    } else {
      reset();
      setAmenities([]);
      setPhotos([]);
      setVideos([]);
      setPhotoFiles([]);
      setVideoFiles([]);
      setIsEditMode(false);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBuilding(null);
    setPhotoIndex(0);
  };

  const nextPhoto = () => {
    if (!selectedBuilding) return;
    setPhotoIndex((prev) => (prev + 1) % selectedBuilding.photos.length);
  };

  const prevPhoto = () => {
    if (!selectedBuilding) return;
    setPhotoIndex(
      (prev) =>
        (prev - 1 + selectedBuilding.photos.length) %
        selectedBuilding.photos.length
    );
  };

  const toggleDescription = (index) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleAddAmenity = () => {
    if (newAmenity.trim() && !amenities.includes(newAmenity.trim())) {
      setAmenities([...amenities, newAmenity.trim()]);
      setNewAmenity("");
    }
  };

  const handleRemoveAmenity = (index) => {
    setAmenities(amenities.filter((_, i) => i !== index));
  };

  const uploadSingleFile = async (file, type) => {
    const formData = new FormData();
    formData.append("files", file);
    formData.append("type", type);

    try {
      const response = await axios.post(UPLOAD_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
      });
      return response.data.urls[0];
    } catch (error) {
      console.error(`Error uploading ${type}:`, error);
      throw error;
    }
  };

  const handleFileUpload = async (e, type) => {
    const files = Array.from(e.target.files);
    const validTypes =
      type === "photo"
        ? ["image/jpeg", "image/png", "image/gif"]
        : ["video/mp4", "video/webm"];
    const maxFiles = type === "photo" ? 5 : 3;
    const currentFiles = type === "photo" ? photos : videos;
    const remainingSlots = maxFiles - currentFiles.length;

    if (files.length > remainingSlots) {
      alert(`You can only upload up to ${maxFiles} ${type}s.`);
      return;
    }

    const validFiles = files.filter((file) => validTypes.includes(file.type));
    if (validFiles.length !== files.length) {
      alert(
        `Please upload only ${
          type === "photo" ? "images (JPEG, PNG, GIF)" : "videos (MP4, WebM)"
        }.`
      );
      return;
    }

    try {
      setUploadingMedia(true);
      setUploadProgress(0);

      const tempUrls = validFiles.map((file) => URL.createObjectURL(file));
      if (type === "photo") {
        setPhotos((prev) => [...prev, ...tempUrls]);
        setPhotoFiles((prev) => [...prev, ...validFiles]);
      } else {
        setVideos((prev) => [...prev, ...tempUrls]);
        setVideoFiles((prev) => [...prev, ...validFiles]);
      }

      for (let i = 0; i < validFiles.length; i++) {
        const file = validFiles[i];
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post(UPLOAD_URL, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        });

        const uploadedUrl =
          response.data?.fileUrl ||
          response.data?.url ||
          response.data?.urls?.[0];

        if (type === "photo") {
          setPhotos((prev) => {
            const newPhotos = [...prev];
            const tempIndex = newPhotos.indexOf(tempUrls[i]);
            if (tempIndex !== -1) {
              newPhotos[tempIndex] = uploadedUrl;
            }
            return newPhotos;
          });
        } else {
          setVideos((prev) => {
            const newVideos = [...prev];
            const tempIndex = newVideos.indexOf(tempUrls[i]);
            if (tempIndex !== -1) {
              newVideos[tempIndex] = uploadedUrl;
            }
            return newVideos;
          });
        }
      }
    } catch (error) {
      console.error(`Error uploading ${type}s:`, error);
      alert(
        `Failed to upload ${type}s: ${
          error.response?.data?.message || error.message
        }`
      );

      if (type === "photo") {
        setPhotos((prev) => prev.filter((url) => !tempUrls.includes(url)));
        setPhotoFiles((prev) =>
          prev.filter((_, i) => i >= prev.length - validFiles.length)
        );
      } else {
        setVideos((prev) => prev.filter((url) => !tempUrls.includes(url)));
        setVideoFiles((prev) =>
          prev.filter((_, i) => i >= prev.length - validFiles.length)
        );
      }
    } finally {
      setUploadingMedia(false);
      setUploadProgress(0);
    }
  };

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);

      const buildingData = {
        ...data,
        amenities,
        photos: photos.filter((p) => typeof p === "string"),
        videos: videos.filter((v) => typeof v === "string"),
        mapView: data.mapView || "",
      };

      if (isEditMode && selectedBuilding) {
        await axiosInstance.put(
          `/api/properties/building/${selectedBuilding._id}`,
          buildingData
        );
        alert("Building updated successfully!");
      } else {
        await axiosInstance.post("/api/properties/building", buildingData);
        alert("Building added successfully!");
      }

      await fetchBuildings();
      setShowModal(false);
      reset();
    } catch (error) {
      console.error("Error saving building:", error);
      alert(
        `Failed to ${isEditMode ? "update" : "add"} building: ${
          error.response?.data?.message || error.message
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteBuilding = async (id) => {
    if (!window.confirm("Are you sure you want to delete this building?")) {
      return;
    }

    try {
      setIsLoading(true);
      await axiosInstance.delete(`/api/properties/building/${id}`);
      alert("Building deleted successfully!");
      await fetchBuildings();
    } catch (error) {
      console.error("Error deleting building:", error);
      alert("Failed to delete building");
    } finally {
      setIsLoading(false);
    }
  };

  const removeMedia = (index, type) => {
    if (type === "photo") {
      setPhotos(photos.filter((_, i) => i !== index));
      setPhotoFiles(photoFiles.filter((_, i) => i !== index));
    } else {
      setVideos(videos.filter((_, i) => i !== index));
      setVideoFiles(videoFiles.filter((_, i) => i !== index));
    }
  };

  const filteredBuildings = buildings.filter((b) => {
    const matchesProject =
      filterProject === "All" ||
      b.project._id === filterProject ||
      b.project === filterProject;
    const matchesName =
      filterBuildingName === "" ||
      b.buildingName.toLowerCase().includes(filterBuildingName.toLowerCase());
    return matchesProject && matchesName;
  });

  const handleAddfloorClick = (id) => {
    navigate("/PropertyFloor", {
      state: { id },
    });
  };
  const goBack = () => navigate(-1);

  return (
    <div className="flex flex-col h-screen overflow-auto bg-gray-100 p-4">
      <IoMdArrowBack
        onClick={goBack}
        className="mb-2 text-2xl cursor-pointer"
      />

      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-3 items-center justify-between">
        <div className="flex flex-wrap gap-3 items-center flex-grow">
          <select
            className="border rounded p-2"
            value={filterProject}
            onChange={(e) => setFilterProject(e.target.value)}
          >
            <option value="All">All Projects</option>
            {selectedProject && (
              <option key={selectedProject._id} value={selectedProject._id}>
                {selectedProject.projectName}
              </option>
            )}
          </select>
          <input
            type="text"
            placeholder="Filter by building name"
            value={filterBuildingName}
            onChange={(e) => setFilterBuildingName(e.target.value)}
            className="border rounded p-2 w-64"
          />
        </div>
        <button
          type="button"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition ml-auto"
          onClick={() => openModal()}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Add Building"}
        </button>
      </div>

      {/* Buildings Grid */}
      <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-[90%] mx-auto">
        {isLoading && !showModal ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredBuildings.length === 0 ? (
          <p className="text-center col-span-full text-gray-700">
            No buildings found.
          </p>
        ) : (
          filteredBuildings.map((building, index) => (
            <motion.div
              key={building._id}
              className="rounded-lg w-[90%] mx-auto bg-white shadow-md"
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
              }}
              onClick={() => handleAddfloorClick(building._id)}
              role="button"
              aria-label={`View floors for ${building.buildingName}`}
            >
              {building.photos?.length > 0 ? (
                <img
                  src={building.photos[0]}
                  alt={building.buildingName}
                  className="w-full h-40 sm:h-48 md:h-60 object-cover"
                />
              ) : (
                <div className="w-full h-40 sm:h-48 md:h-60 bg-gray-300 flex items-center justify-center text-gray-600">
                  No Image
                </div>
              )}
              <div className="p-4">
                <h3 className="text-lg font-bold mb-1">
                  {building.buildingName}
                </h3>
                <p className="text-lg text-red-600 font-semibold mb-1">
                  {building.priceRange || "Contact for Price"}
                </p>
                <p className="text-sm text-gray-500 flex items-center gap-2 mb-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 12.414a2 2 0 10-2.828 2.828l4.243 4.243a2 2 0 002.828-2.828z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 19a8 8 0 100-16 8 8 0 000 16z"
                    />
                  </svg>
                  {selectedProject?.projectName || "N/A"}
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-2">
                  <span className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 8h16M4 12h16M4 16h16"
                      />
                    </svg>
                    {building.buildingArea || "Unknown Area"}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  Type: {building.type || "N/A"}
                </p>
                <div className="relative z-10 mt-2"></div>
                <div className="flex space-x-2 mt-4">
                  <button
                    className="bg-blue-600 text-white p-2 text-sm rounded hover:bg-blue-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(building);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white p-2 text-sm rounded hover:bg-red-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteBuilding(building._id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>

      {/* Add/Edit Building Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-lg max-w-2xl w-full max-h-full overflow-auto p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-3 text-gray-600 text-2xl"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-4">
              {isEditMode ? "Edit Building" : "Add New Building"}
            </h2>
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="mb-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Uploading files... {uploadProgress}%
                </p>
              </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Project Selection */}
              <div>
                <label
                  htmlFor="project"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Project*
                </label>
                <select
                  id="project"
                  {...register("project", { required: "Project is required" })}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.project ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select a project</option>
                  {projects.map((project) => (
                    <option key={project._id} value={project._id}>
                      {project.projectName}
                    </option>
                  ))}
                </select>
                {errors.project && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.project.message}
                  </p>
                )}
              </div>

              {/* Building Name */}
              <div>
                <label
                  htmlFor="buildingName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Building Name*
                </label>
                <input
                  type="text"
                  id="buildingName"
                  {...register("buildingName", {
                    required: "Building name is required",
                    minLength: {
                      value: 3,
                      message: "Building name must be at least 3 characters",
                    },
                  })}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.buildingName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter building name"
                />
                {errors.buildingName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.buildingName.message}
                  </p>
                )}
              </div>

              {/* Floors Count */}
              <div>
                <label
                  htmlFor="floorsCount"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Number of Floors
                </label>
                <input
                  type="number"
                  id="floorsCount"
                  {...register("floorsCount", {
                    min: {
                      value: 1,
                      message: "Number of floors must be at least 1",
                    },
                  })}
                  min="1"
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.floorsCount ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter number of floors"
                />
                {errors.floorsCount && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.floorsCount.message}
                  </p>
                )}
              </div>

              {/* Building Area */}
              <div>
                <label
                  htmlFor="buildingArea"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Building Area (location)
                </label>
                <input
                  type="text"
                  id="buildingArea"
                  {...register("buildingArea")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter building area location"
                />
              </div>

              {/* Map View URL */}
              <div>
                <label
                  htmlFor="mapView"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Map View URL
                </label>
                <input
                  type="text"
                  id="mapView"
                  {...register("mapView", {
                    pattern: {
                      value: /^https?:\/\/.+/,
                      message:
                        "Map view must be a valid URL starting with http:// or https://",
                    },
                  })}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.mapView ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter map view URL"
                />
                {errors.mapView && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.mapView.message}
                  </p>
                )}
              </div>

              {/* Price Range */}
              <div>
                <label
                  htmlFor="priceRange"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Price Range
                </label>
                <input
                  type="text"
                  id="priceRange"
                  {...register("priceRange")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="e.g. 1.8 cr - 3 cr"
                />
              </div>

              {/* Property Type Dropdown */}
              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Property Type
                </label>
                <select
                  id="type"
                  {...register("type")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select property type</option>
                  {type.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Amenities */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amenities
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newAmenity}
                    onChange={(e) => setNewAmenity(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddAmenity()}
                    placeholder="Add amenity (e.g. Gym, Pool)"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <button
                    type="button"
                    onClick={handleAddAmenity}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
                {amenities.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {amenities.map((amenity, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-gray-100 px-3 py-1 rounded-full"
                      >
                        <span className="text-sm">{amenity}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveAmenity(index)}
                          className="ml-2 text-gray-500 hover:text-red-500"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Photos Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Building Photos (Max 5)
                </label>
                <div className="flex items-center space-x-2">
                  <label className="flex-1 cursor-pointer">
                    <div className="px-3 py-2 border border-gray-300 rounded-md text-center hover:bg-gray-50 transition-colors">
                      <span className="text-sm text-gray-600">
                        Select photos
                      </span>
                     <input
  type="file"
  multiple
  accept="image/jpeg,image/png,image/gif"
  onChange={(e) => handleFileUpload(e, "photo")}
  className="hidden max-files-5"
  disabled={uploadingMedia}
/>
                    </div>
                  </label>
                  <span className="text-sm text-gray-500">
                    {photos.length} selected
                  </span>
                </div>
                {photos.length > 0 && (
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {photos.map((photo, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={photo}
                          alt={`Building ${index}`}
                          className="w-full h-24 object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() => removeMedia(index, "photo")}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Videos Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Building Videos (Max 3)
                </label>
                <div className="flex items-center space-x-2">
                  <label className="flex-1 cursor-pointer">
                    <div className="px-3 py-2 border border-gray-300 rounded-md text-center hover:bg-gray-50 transition-colors">
                      <span className="text-sm text-gray-600">
                        Select videos
                      </span>
                      <input
                        type="file"
                        multiple
                        accept="video/mp4,video/webm"
                        onChange={(e) => handleFileUpload(e, "video")}
                        className="hidden max-files-5"
                        disabled={uploadingMedia}
                      />
                    </div>
                  </label>
                  <span className="text-sm text-gray-500">
                    {videos.length} selected
                  </span>
                </div>
                {videos.length > 0 && (
                  <div className="mt-3 grid grid-cols-1 gap-2">
                    {videos.map((video, index) => (
                      <div key={index} className="relative group">
                        <video
                          src={video}
                          className="w-full h-auto rounded"
                          controls
                        />
                        <button
                          type="button"
                          onClick={() => removeMedia(index, "video")}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  {...register("description", {
                    maxLength: {
                      value: 500,
                      message: "Description cannot exceed 500 characters",
                    },
                  })}
                  rows="4"
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter building description..."
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setAmenities([]);
                    setPhotos([]);
                    setVideos([]);
                    setPhotoFiles([]);
                    setVideoFiles([]);
                    setNewAmenity("");
                    reset();
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Clear
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  disabled={isLoading || uploadingMedia}
                >
                  {isLoading
                    ? "Saving..."
                    : isEditMode
                    ? "Update Building"
                    : "Save Building"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


