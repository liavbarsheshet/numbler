import { DeviceSize, DeviceSizeContext } from "@/context";
import type { TDeviceSize } from "@/context";
import React from "react";

const DeviceSizeProvider: React.FC<IProvidersProps> = ({ children }) => {
  const [deviceSize, setDeviceSize] = React.useState<TDeviceSize>("XL");

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width <= DeviceSize.XS) {
        setDeviceSize("XS");
      } else if (width <= DeviceSize.S) {
        setDeviceSize("S");
      } else if (width <= DeviceSize.SM) {
        setDeviceSize("SM");
      } else if (width <= DeviceSize.M) {
        setDeviceSize("M");
      } else if (width <= DeviceSize.L) {
        setDeviceSize("L");
      } else {
        setDeviceSize("XL");
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    // Cleanup function to remove event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Render provider with current device size
  return <DeviceSizeContext.Provider value={deviceSize}>{children}</DeviceSizeContext.Provider>;
};

export default DeviceSizeProvider;
