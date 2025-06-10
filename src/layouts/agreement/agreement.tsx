import { useVariables } from "@/hooks";
import { Button, Link } from "@/components";

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
        <h4 className="black">Hey it's Numbler 🎲</h4>
        <p>
          A fun and elegant web application for generating random numbers.
          <br />
          <br />
          It <strong>doesn’t</strong> use cookies, collect personal data, or track you in any way.
          <br />
          <br />
          To enjoy the full experience, please grant audio permission by clicking below.
          <br />
          <br />
          For more information, visit our {""}
          <Link href="https://github.com/liavbarsheshet/numbler" target="_blank" rel="noopener noreferrer">
            Github repo
          </Link>
          .
        </p>
        <Button text="Understood" onClick={handleClick} size="large" />
      </section>
    </article>
  );
}
