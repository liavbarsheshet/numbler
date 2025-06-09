import React from "react";

export type TSoundNames = ("click" | "yay") & string;

export type TAudio = (name: TSoundNames, pitch: number) => void;

export const AudioContext = React.createContext<TAudio | null>(null);
