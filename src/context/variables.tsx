import React from "react";

export type TVariables = {
  // Determines shuffler current state
  shufflerState: "initial" | "shuffling" | "shuffled" | "finished";
  /** Is sound muted? */
  mute: boolean;
};

export const VariablesContext = React.createContext<THook<TVariables> | null>(null);
