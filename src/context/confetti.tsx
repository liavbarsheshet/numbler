import React from "react";

export type TConfetti = () => void;

export const ConfettiContext = React.createContext<TConfetti | null>(null);
