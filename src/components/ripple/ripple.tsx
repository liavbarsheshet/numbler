import { useEffect, createRef } from "react";
import "./ripple.css";

type RippleProps = {
  /** Disabled ? */
  disabled?: boolean;
};

export default function Ripple({ disabled = false }: RippleProps) {
  const parentRef = createRef<HTMLDivElement>();

  useEffect(() => {
    const parentDiv = parentRef.current;
    if (!parentDiv) return;

    const parent = parentDiv.parentElement;
    if (!parent) return;

    const handlePointerDown = (e: PointerEvent) => {
      if (disabled) return;
      if (e.button !== 0) return; // Only primary button (left click)

      const { clientX, clientY } = e;
      const dim = parent.getBoundingClientRect();
      const size = dim.width;
      const x = clientX - dim.left - size / 2;
      const y = clientY - dim.top - size / 2;

      const ripple = document.createElement("div");
      ripple.style.height = `${size}px`;
      ripple.style.width = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.className = "ripple";
      parentDiv.appendChild(ripple);

      // Capture the pointer to track it even outside the element
      parent.setPointerCapture(e.pointerId);

      const handlePointerUp = (e: PointerEvent) => {
        ripple.setAttribute("state", "end");

        // Release the pointer capture
        parent.releasePointerCapture(e.pointerId);

        setTimeout(() => {
          parent.removeEventListener("pointerup", handlePointerUp);
          parent.removeEventListener("pointercancel", handlePointerUp);
          ripple.remove();
        }, 300);
      };

      parent.addEventListener("pointerup", handlePointerUp, { once: true });
      parent.addEventListener("pointercancel", handlePointerUp, { once: true });
    };

    parent.addEventListener("pointerdown", handlePointerDown);

    return () => {
      parent.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [disabled, parentRef]);

  return <div ref={parentRef} className="ripple-container"></div>;
}
