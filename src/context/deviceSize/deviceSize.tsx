import type { TDeviceSize } from "./deviceSize";

import React from "react";

const DeviceSizeContext = React.createContext<TDeviceSize | null>(null);

// Create the context with undefined as initial value
export default DeviceSizeContext;
