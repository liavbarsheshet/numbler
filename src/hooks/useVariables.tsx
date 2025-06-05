import { VariablesContext } from "@/context";
import type { TVariables } from "@/context";
import React from "react";

export const useVariables = (): THook<TVariables> => {
  const context = React.use(VariablesContext);

  if (context === null) throw new Error("useVariables must be used within a VariablesProvider");

  return context;
};
