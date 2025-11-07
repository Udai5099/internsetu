// client/components/InteractiveMap.tsx

import React, { useState, useCallback, memo } from "react";
import ReactDatamapsIndia from "react-datamaps-india";

// Map layout settings remain the same
const MAP_LAYOUT = {
  noDataColor: "#A5D8FF",
  borderColor: "#FFFFFF",
  hoverBorderColor: "#FFFFFF",
  hoverColor: "#007BFF",
};

const REGION_DATA = {};

const InteractiveMap = () => {
  const [selectedState, setSelectedState] = useState(null);

  // --- 1. MODIFIED the function to accept the state name directly ---
  const handleStateClick = useCallback((stateName: string) => {
    // Generate random numbers for the stats
    const randomOpportunities = Math.floor(Math.random() * (15000 - 100 + 1)) + 100;
    const randomSectors = Math.floor(Math.random() * (25 - 5 + 1)) + 5;

    // Update the state with the new random data
    setSelectedState({
      name: stateName,
      opportunities: randomOpportunities,
      sectors: randomSectors,
    });
  }, []);

  return (
    <section className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-start gap-8">
      <div className="w-full md:w-1/2 relative">
        <ReactDatamapsIndia
          regionData={REGION_DATA}
          mapLayout={MAP_LAYOUT}
          // --- 2. CORRECTED the prop name from onMapClick to onClick ---
          onClick={handleStateClick}
        />
      </div>

      <div className="w-full md:w-1/2">
        {selectedState ? (
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 text-center">
            <h3 className="text-2xl font-bold text-blue-600 mb-2">
              {selectedState.name}
            </h3>
            <p className="text-lg text-gray-700">
              <span className="font-semibold">
                {selectedState.opportunities?.toLocaleString() || "N/A"}
              </span>{" "}
              Internship Opportunities
            </p>
            <p className="text-md text-gray-600">
              Across{" "}
              <span className="font-semibold">{selectedState.sectors || "N/A"}</span>{" "}
              Sectors
            </p>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 text-center">
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              Click on a state
            </h3>
            <p className="text-lg text-gray-500">to view internship details.</p>
          </div>
        )}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-gradient-to-br from-blue-100 to-red-100 p-6 rounded-xl shadow-md text-center">
            <p className="text-3xl font-bold text-blue-800">118K+</p>
            <p className="text-md text-gray-600">Internship Opportunities</p>
          </div>
          <div className="bg-gradient-to-br from-blue-100 to-green-100 p-4 rounded-xl shadow-md text-center">
            <p className="text-3xl font-bold text-blue-800">25</p>
            <p className="text-md text-gray-600">Sectors</p>
          </div>
          <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-4 rounded-xl shadow-md text-center">
            <p className="text-3xl font-bold text-blue-800">36</p>
            <p className="text-md text-gray-600">States/UTs</p>
          </div>
          <div className="bg-gradient-to-br from-blue-100 to-yellow-100 p-4 rounded-xl shadow-md text-center">
            <p className="text-3xl font-bold text-blue-800">734</p>
            <p className="text-md text-gray-600">Districts</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(InteractiveMap);