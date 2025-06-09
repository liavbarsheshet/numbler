import { AudioContext } from "@/context";
import type { TAudio } from "@/context";
import React from "react";

export const useAudio = (): TAudio => {
  const context = React.use(AudioContext);

  if (context === null) throw new Error("useAudio must be used within a AudioProvider");

  return context;
};
