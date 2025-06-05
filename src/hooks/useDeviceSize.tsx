import { DeviceSizeContext } from "@/context";
import type { TDeviceSize } from "@/context";
import React from "react";

export const useDeviceSize = (): TDeviceSize => {
  const context = React.use(DeviceSizeContext);

  if (context === null) throw new Error("useDeviceSize must be used within a DeviceSizeProvider");

  return context;
};
