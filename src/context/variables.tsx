import React from "react";

export type TVariables = {
  // Determines shuffler current state
  shufflerState: "initial" | "shuffling" | "shuffled" | "finished";
  /** Is bgm muted? */
  muteMusic: boolean;
  /** Is sound muted? */
  muteSound: boolean;
};

export const VariablesContext = React.createContext<THook<TVariables> | null>(null);
