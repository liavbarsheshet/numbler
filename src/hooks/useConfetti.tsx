import { ConfettiContext } from "@/context";
import type { TConfetti } from "@/context";
import React from "react";

export const useConfetti = (): TConfetti => {
  const context = React.use(ConfettiContext);

  if (context === null) throw new Error("useConfetti must be used within a ConfettiProvider");

  return context;
};
