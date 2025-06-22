import { useRef } from "react";
import { Button } from "@mui/material";
import { Print } from "@mui/icons-material";
import { colours, Rimcolours, useCustomization } from "../../contexts/Customization";
import clickSound from "../../assets/audio/a.mp3";

type ColourOption = {
  name: string;
  colour: string;
};

const Configurator = () => {
  const {
    car,
    setCar,
    accessory,
    setAccessory,
    carColour,
    setCarColour,
    carDetails,
    setCarDetails,
    setTyreColour,
    setRotation,
    rotation,
    setBrake
  } = useCustomization();

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playClickSound = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(clickSound);
      audioRef.current.volume = 0.3;
    }
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(e => console.log("Audio play failed:", e));
  };

  let cost = car === "car1" ? 100000 : 150000;
  if (accessory === 1) cost += 1000;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleCarChange = (newCar: string) => {
    playClickSound();
    setCar(newCar);
  };

  const handleCarColourChange = (colour: ColourOption) => {
    playClickSound();
    setCarColour(colour);
  };

  const handleTyreColourChange = (colour: ColourOption) => {
    playClickSound();
    setTyreColour(colour);
  };

  const handleAccessoryChange = (value: number) => {
    playClickSound();
    setAccessory(value);
    setBrake(value === 1);
  };

  const handleRotationToggle = () => {
    playClickSound();
    setRotation(!rotation);
  };

  const handleDetailsToggle = () => {
    playClickSound();
    setCarDetails((prev: boolean) => !prev);
  };

  return (
    <>
      <div className="fixed right-1/2 bottom-8 z-10 transform translate-x-1/2 ">
        <button
          onClick={handleRotationToggle}
          className={`${rotation ? 'bg-red-700' : 'bg-black'} text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2`}
        >
          <div className={`w-1.5 h-1.5 rounded-full bg-red-500 ${rotation ? 'animate-pulse' : ''}`}></div>
          <span>{rotation ? "Stop Rotation" : "Start Rotation"}</span>
        </button>
      </div>

      <div className={`fixed right-8 top-1/2 -translate-y-1/2 w-90 bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300
          ${!rotation ? "transform max-h-[80vh]" : "hidden fade-out-0 slide-out-to-left-4"}`}>

        {/* Header with gradient and improved spacing */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-5 py-3 sticky top-0 z-10">
          <h2 className="text-lg font-semibold text-white tracking-tight">Configure Your Porsche</h2>
          <p className="text-gray-300 text-xs mt-0.5">Customize every detail</p>
        </div>

        {/* Scrollable content container */}
        <div className="p-5 space-y-6 overflow-y-auto" style={{ maxHeight: 'calc(80vh - 120px)' }}>

          {/* Model Selection - more compact */}
          <div className="space-y-3">
            <h3 className="text-xs font-medium text-gray-900 uppercase tracking-wider">Model</h3>
            <div className="bg-gray-50 rounded-lg p-3">
              <div
                className={`flex items-center justify-between cursor-pointer transition-all duration-200 ${
                  car === "car1" ? "opacity-100" : "opacity-80"
                }`}
                onClick={() => handleCarChange("car1")}
              >
                <div>
                  <div className="font-medium text-gray-900 text-sm">Porsche 911</div>
                  <div className="text-xs text-gray-600">Base Model</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900 text-sm">{formatPrice(100000)}</div>
                </div>
              </div>
            </div>

            <Button
              onClick={handleDetailsToggle}
              variant="contained"
              endIcon={<Print />}
              sx={{
                backgroundColor: '#111827',
                '&:hover': { backgroundColor: '#1f2937' },
                color: 'white',
                fontWeight: '500',
                textTransform: 'none',
                borderRadius: '10px',
                padding: '8px 16px',
                width: '100%',
                boxShadow: 'none',
                fontSize: '0.75rem'
              }}
            >
              {carDetails ? "Hide Specs" : "Show Specs"}
            </Button>
          </div>

          {/* Color Selection - tighter grid */}
          <div className="space-y-3">
            <h3 className="text-xs font-medium text-gray-900 uppercase tracking-wider">Exterior</h3>
            <div className="grid grid-cols-4 gap-2">
              {colours.map((item: ColourOption, index: number) => (
                <button
                  key={index}
                  onClick={() => handleCarColourChange(item)}
                  className={`group relative flex flex-col items-center p-1 rounded-md transition-all duration-200 ${
                    item.colour === carColour.colour
                      ? 'bg-gray-100 ring-1 ring-gray-900'
                      : 'hover:bg-gray-50 opacity-80'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full border transition-all duration-200 ${
                      item.colour === carColour.colour
                        ? 'border-gray-900 scale-110'
                        : 'border-gray-300 group-hover:border-gray-400'
                    }`}
                    style={{ backgroundColor: item.colour }}
                  />
                  <span className={`text-[0.65rem] mt-1 transition-colors duration-200 text-center ${
                    item.colour === carColour.colour ? 'text-gray-900 font-medium' : 'text-gray-600'
                  }`}>
                    {item.name.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Rim Color Selection - more compact */}
          <div className="space-y-3">
            <h3 className="text-xs font-medium text-gray-900 uppercase tracking-wider">Wheels</h3>
            <div className="grid grid-cols-4 gap-2">
              {Rimcolours.map((item: ColourOption, index: number) => (
                <button
                  key={index}
                  onClick={() => handleTyreColourChange(item)}
                  className={`group relative flex flex-col items-center p-1 rounded-md transition-all duration-200 ${
                    item.colour === carColour.colour
                      ? 'bg-gray-100 ring-1 ring-gray-900'
                      : 'hover:bg-gray-50 opacity-80'
                  }`}
                >
                  <div
                    className="w-6 h-6 rounded-full border border-gray-300 group-hover:border-gray-400 transition-all duration-200"
                    style={{ backgroundColor: item.colour }}
                  />
                  <span className="text-[0.65rem] mt-1 text-gray-600 transition-colors duration-200">
                    {item.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Accessories - more compact */}
          <div className="space-y-3">
            <h3 className="text-xs font-medium text-gray-900 uppercase tracking-wider">Performance</h3>
            <div className="space-y-2">
              <button
                onClick={() => handleAccessoryChange(1)}
                className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all duration-200 ${
                  accessory === 1
                    ? 'border-gray-900 bg-gray-50 opacity-100'
                    : 'border-gray-200 hover:border-gray-300 opacity-80'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full border transition-all duration-200 ${
                    accessory === 1 ? 'border-gray-900 bg-gray-900' : 'border-gray-300'
                  }`}>
                    {accessory === 1 && <div className="w-1 h-1 bg-white rounded-full m-0.5" />}
                  </div>
                  <div className="text-left">
                    <div className={`font-medium text-xs transition-colors duration-200 ${
                      accessory === 1 ? 'text-gray-900' : 'text-gray-600'
                    }`}>Sport Calipers</div>
                    <div className="text-[0.65rem] text-gray-500">Performance brakes</div>
                  </div>
                </div>
                <div className="font-semibold text-gray-900 text-xs">+£1,000</div>
              </button>

              <button
                onClick={() => handleAccessoryChange(0)}
                className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all duration-200 ${
                  accessory === 0
                    ? 'border-gray-900 bg-gray-50 opacity-100'
                    : 'border-gray-200 hover:border-gray-300 opacity-80'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full border transition-all duration-200 ${
                    accessory === 0 ? 'border-gray-900 bg-gray-900' : 'border-gray-300'
                  }`}>
                    {accessory === 0 && <div className="w-1 h-1 bg-white rounded-full m-0.5" />}
                  </div>
                  <div className="text-left">
                    <div className={`font-medium text-xs transition-colors duration-200 ${
                      accessory === 0 ? 'text-gray-900' : 'text-gray-600'
                    }`}>Standard</div>
                    <div className="text-[0.65rem] text-gray-500">Factory brakes</div>
                  </div>
                </div>
                <div className="font-semibold text-gray-900 text-xs">Included</div>
              </button>
            </div>
          </div>
        </div>

        {/* Sticky Price Summary at bottom */}
        <div className="border-t border-gray-200 bg-gray-50 px-5 py-3 sticky bottom-0">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-gray-600">Total Price</div>
              <div className="text-[0.65rem] text-gray-500">Including all options</div>
            </div>
            <div className="text-xl font-bold text-gray-900">{formatPrice(cost)}</div>
          </div>
          <button
            onClick={playClickSound}
            className="w-full mt-3 bg-gray-900 text-white py-2 px-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 text-sm"
          >
            Request Quote
          </button>
        </div>
      </div>
    </>
  );
};

export default Configurator;