import type { ConfettiRef } from "@/components";
import { ConfettiContext } from "@/context";
import { Confetti } from "@/components";

import "./confetti.css";

import React from "react";

const ConfettiProvider: React.FC<IProvidersProps> = ({ children }) => {
  const confettiRef = React.useRef<ConfettiRef>(null);

  const handleFire = () => confettiRef.current?.shoot();

  return (
    <ConfettiContext.Provider value={handleFire}>
      <Confetti ref={confettiRef} className="confetti" />
      {children}
    </ConfettiContext.Provider>
  );
};

export default ConfettiProvider;
