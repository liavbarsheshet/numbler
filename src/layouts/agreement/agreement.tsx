import { useVariables } from "@/hooks";
import { Button } from "@/components";

import React from "react";

import "./agreement.css";

export default function Agreement() {
  const [visibility, setVisibility] = React.useState(true);
  const [{ agreed }, setVariables] = useVariables();

  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleClick = () => {
    const container = containerRef.current;

    if (agreed || !container) return;

    const callback = () => {
      container.removeEventListener("transitionend", callback);
      setVariables((prev) => ({ ...prev, agreed: true }));
      setVisibility(false);
    };

    container.addEventListener("transitionend", callback);

    container.style.opacity = "0";
  };

  React.useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    container.style.opacity = "1";
  }, []);

  if (!visibility) return null;

  return (
    <article ref={containerRef} className="agreement">
      <section>
        <h4 className="black">Welcome to NUMBLER 🎲</h4>
        <p>
          A fun web application for generating random numbers.
          <br />
          <br />
          We do <strong>not use cookies</strong>, do <strong>not store any personal data</strong>, and we do{" "}
          <strong>not track you</strong> in any way.
          <br />
          <br />
          <strong>Please note:</strong> This site plays short sound effects (like clicks) during number shuffling.
          <br />
          <br />
          For the best experience, you'll need to grant audio permission by clicking below.
          <br />
          <br />
          Hope you enjoy using NUMBLER!
        </p>
        <Button text="Understood" onClick={handleClick} size="large" />
      </section>
    </article>
  );
}
