/**
 * Normalize by comparison.
 * @param a The first number to compare.
 * @param b The second number to compare.
 * @returns 1 if a > b, -1 if a < b, o.w 0.
 */
export function normalize(a: number, b: number): 1 | -1 | 0 {
  if (a == b) return 0;
  if (a > b) return 1;
  return -1;
}

/**
 * Generates a random number within the specified range using an optional seed.
 * @param min The minimum number within the range.
 * @param max The maximum number within the range [DEFAULT=0].
 * @param seed The optional seed for the random number generator. The default value is 14327.
 * @returns A random number within the specified range, or -1 if the provided parameters are valid.
 */
export function randomNumber(min: number, max: number = 0, seed: number = 14327): number {
  if (min > max || max < 0 || min < 0 || seed < 1) return -1;

  if (max === min) return min;

  return ((Math.floor(Math.random() * (max * seed - min)) + min) % (max - min)) + min;
}

/**
 * Computes the distance, angle, element dimensions, and anchor point between a given point and a specified HTML element.
 *
 * This function calculates the Euclidean distance and the angle between the center of an HTML element
 * and a specified 2D point. It also provides information about the element's dimensions and its anchor point.
 * The results can be used for various purposes, such as determining proximity, orientation, graphical transformations,
 * or collision detection.
 *
 * @param element The target HTML element for which the calculations are performed. The element's dimensions and position are used in the calculations.
 * @param point The 2D point represented as an object with `x` and `y` coordinates.
 * @returns An object containing the element bounding rect and additional metrics such as distance, angle, element dimensions, and anchor point.
 */
export function computeElementMetrics(element: Element, point: T2DPoint) {
  const rect = element.getBoundingClientRect();

  const center: T2DPoint = {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };

  const difference: T2DPoint = { x: point.x - center.x, y: point.y - center.y };
  const distance = Math.sqrt(difference.x * difference.x + difference.y * difference.y);
  const angle = Math.atan2(difference.y, difference.x) * (180 / Math.PI);

  return {
    ...rect,
    difference,
    distance,
    center,
    angle,
  };
}
