import React from "react";

export type TVariables = {
  // Determines shuffler current state
  shufflerState: "initial" | "shuffling" | "shuffled" | "finished";
  /** Is distinct mode? */
  distinctMode: boolean;
  /** Is bgm muted? */
  muteMusic: boolean;
  /** Is sound muted? */
  muteSound: boolean;
  /** Is user agreed? */
  agreed: boolean;
};

export const VariablesContext = React.createContext<THook<TVariables> | null>(null);
