/**
 * Retrieves the 2D coordinates of the pointer within the context of an event.
 *
 * This function extracts the 2D coordinates (x, y) of the pointer from a MouseEvent, TouchEvent, or PointerEvent.
 * It provides a convenient way to access the exact position of the pointer within the event's context,
 * facilitating various interactive applications, such as event-driven user interfaces or canvas-based drawings.
 *
 * @param e The event object (MouseEvent, TouchEvent, or PointerEvent) containing pointer information.
 */
export function getPointerCoordinatesFromEvent(e: MouseEvent | TouchEvent | PointerEvent): T2DPoint {
  if (e instanceof PointerEvent || e instanceof MouseEvent) return { x: e.clientX, y: e.clientY };

  return {
    x: e.touches[0]?.clientX,
    y: e.touches[0]?.clientY,
  };
}

/**
 * Delays the execution of a function for a specified duration.
 * @param ms The duration in milliseconds to delay the execution of the function. The default value is 2000ms.
 * @returns A Promise that resolves after the specified duration.
 */
export function delay(ms: number = 2000): Promise<void> {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}
