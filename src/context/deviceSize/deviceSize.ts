export const DeviceSize = {
  XS: 320,
  S: 480,
  SM: 640,
  M: 768,
  L: 1024,
  XL: 1280,
} as const;

export type TDeviceSize = keyof typeof DeviceSize;
