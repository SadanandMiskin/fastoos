import React from "react";
import { useCustomization } from "../../contexts/Customization";

const Details: React.FC = () => {
  const { carDetails } = useCustomization();

  if (!carDetails) {
    return null; // Hide component when details are not shown
  }

  return (
    <div className="fixed bottom-8 left-8 w-96 bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-2xl overflow-hidden z-40 animate-in fade-in-0 slide-in-from-left-4 duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4">
        <h2 className="text-xl font-semibold text-white tracking-tight">Vehicle Specifications</h2>
        <p className="text-gray-300 text-sm mt-1">Detailed technical information</p>
      </div>

      <div className="p-6 space-y-6 max-h-96 overflow-y-auto">
        {/* Car Specifications Section */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide border-b border-gray-200 pb-2">
            Model Details
          </h3>
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-gray-900">Porsche 911</div>
                <div className="text-sm text-gray-600">2022 Model Year</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Base MSRP</div>
                <div className="font-semibold text-gray-900">£100,000</div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Section */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide border-b border-gray-200 pb-2">
            Performance
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="text-xs text-gray-500 uppercase tracking-wide">0-60 MPH</div>
              <div className="font-semibold text-gray-900 text-lg">3.0s</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="text-xs text-gray-500 uppercase tracking-wide">Top Speed</div>
              <div className="font-semibold text-gray-900 text-lg">182 mph</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="text-xs text-gray-500 uppercase tracking-wide">Engine</div>
              <div className="font-semibold text-gray-900 text-sm">3.0L Twin-Turbo</div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="text-xs text-gray-500 uppercase tracking-wide">Power</div>
              <div className="font-semibold text-gray-900 text-sm">379 HP</div>
            </div>
          </div>
        </div>

        {/* Standard Equipment Section */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide border-b border-gray-200 pb-2">
            Standard Equipment
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-700">Sport Suspension</span>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-700">LED Headlights</span>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-700">Leather Interior</span>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-700">Premium Audio System</span>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Wheels & Tires Section */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide border-b border-gray-200 pb-2">
            Wheels & Tires
          </h3>
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Front</span>
                <span className="text-sm font-medium text-gray-900">245/35 ZR20</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Rear</span>
                <span className="text-sm font-medium text-gray-900">305/30 ZR20</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Wheel Size</span>
                <span className="text-sm font-medium text-gray-900">20" Alloy</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Type</span>
                <span className="text-sm font-medium text-gray-900">Performance</span>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide border-b border-gray-200 pb-2">
            Technical Data
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between py-1">
              <span className="text-gray-600">Length</span>
              <span className="font-medium text-gray-900">4,519 mm</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-600">Width</span>
              <span className="font-medium text-gray-900">1,852 mm</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-600">Height</span>
              <span className="font-medium text-gray-900">1,300 mm</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-600">Wheelbase</span>
              <span className="font-medium text-gray-900">2,450 mm</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-600">Curb Weight</span>
              <span className="font-medium text-gray-900">1,515 kg</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-600">Fuel Capacity</span>
              <span className="font-medium text-gray-900">64 L</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 bg-gray-50 px-6 py-3">
        <div className="text-xs text-gray-500 text-center">
          * Specifications may vary by market and configuration
        </div>
      </div>
    </div>
  );
};

export default Details;