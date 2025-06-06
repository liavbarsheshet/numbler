import type { TVariables } from "@/context/variables";
import { VariablesContext } from "@/context";
import React from "react";

const DeviceSizeProvider: React.FC<IProvidersProps> = ({ children }) => {
  const [variables, setVariables] = React.useState<TVariables>({
    shufflerState: "initial", // Initial state for shuffler
    muteMusic: false, // Default value for mute
    muteSound: false, // Default value for mute
  });

  // Render provider with current device size
  return <VariablesContext.Provider value={[variables, setVariables]}>{children}</VariablesContext.Provider>;
};

export default DeviceSizeProvider;
