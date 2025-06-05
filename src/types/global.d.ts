declare global {
  /** Global providers props */
  interface IProvidersProps {
    children?: React.ReactNode;
  }

  /** Represents a point in 2D space. */
  export type T2DPoint = {
    /** The value on the X axis. */
    x: number;
    /** The value on the Y axis. */
    y: number;
  };

  /** Represents a point in 3D space. */
  export type T3DPoint = T2DPoint & {
    /** The value on the Z axis. */
    z: number;
  };

  /** Represents a 2D rectangle */
  export type T2DRectangle = {
    /** Top-left anchor point. */
    anchor: T2DPoint;
    /** Rectangle width. */
    w: number;
    /** Rectangle height. */
    h: number;
  };

  export type THook<T> = [T, React.Dispatch<React.SetStateAction<T>>];
}

export {};
