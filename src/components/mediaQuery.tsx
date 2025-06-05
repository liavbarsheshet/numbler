import type { TDeviceSize } from "@/context";
import { useDeviceSize } from "@/hooks";
import React from "react";

type MediaQueryProps = {
  /** The size(s) of the device to render for */
  device?: TDeviceSize[];
  /** Content to render if the device size condition is met */
  children?: React.ReactNode;
  /** Excludes size(s) */
  exclude?: boolean;
};

export default function MediaQuery({ device = ["XL"], exclude = false, children }: MediaQueryProps) {
  const currentDeviceSize = useDeviceSize();

  // Check if we should render based on the current device size
  const shouldRender = device.some((requestedSize) => {
    return currentDeviceSize === requestedSize;
  });

  const condition = exclude ? !shouldRender : shouldRender;

  return condition ? <>{children}</> : null;
}
