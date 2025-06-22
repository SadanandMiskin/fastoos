// Customization.tsx
import React, { createContext, useContext, useState } from "react";

export type ColourOption = {
  colour: string;
  name: string;
};

export const colours: ColourOption[] = [
  { colour: "#FF0000", name: "red" },
  // { colour: "#1a5e1a", name: "green" },
  { colour: "#0000FF", name: "blue" },
  { colour: "#ddbd07", name: "yellow" },
  // { colour: "#ffa500", name: "orange" },
  { colour: "#59555b", name: "grey" },
  // { colour: "#222222", name: "black" },
  { colour: "#ececec", name: "white" },
];


export const Rimcolours: ColourOption[] = [
  { colour: "#FF0000", name: "red" },
  { colour: "#59555b", name: "grey" },
  { colour: "#222222", name: "black" },
  { colour: "#ececec", name: "white" },
];

interface CustomizationContextType {
  car: string;
  setCar: (car: string) => void;
  accessory: number;
  setAccessory: (accessory: number) => void;
  carColour: ColourOption;
  tyreColour: ColourOption;
  setTyreColour: (colour: ColourOption) => void;
  setCarColour: (colour: ColourOption) => void;
  carDetails: boolean;
  setCarDetails: React.Dispatch<React.SetStateAction<boolean>>;
  rotation: boolean;
  setRotation: (rotation: boolean) => void
  Brake: boolean;
  setBrake: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomizationContext = createContext<CustomizationContextType | undefined>(undefined);
// const rotation = false;

export const CustomizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [car, setCar] = useState("car1");
  const [accessory, setAccessory] = useState(0);
  const [carColour, setCarColour] = useState<ColourOption>(colours[2]);
  const [tyreColour, setTyreColour] = useState<ColourOption>(Rimcolours[2])
  const [carDetails, setCarDetails] = useState(false);
  const [rotation, setRotation] = useState<boolean>(false);
  const [Brake, setBrake] = useState<boolean>(false);
  return (
    <CustomizationContext.Provider
      value={{
        car,
        setCar,
        accessory,
        setAccessory,
        carColour,
        setCarColour,
        tyreColour,
        setTyreColour,
        carDetails,
        setCarDetails,
        rotation,
        setRotation,
        Brake,
        setBrake
      }}
    >
      {children}
    </CustomizationContext.Provider>
  );
};

export const useCustomization = (): CustomizationContextType => {
  const context = useContext(CustomizationContext);
  if (!context) {
    throw new Error("useCustomization must be used within a CustomizationProvider");
  }
  return context;
};
