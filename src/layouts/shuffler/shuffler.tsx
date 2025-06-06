import { Button, Conditional, NumberInput } from "@/components";
import { useVariables } from "@/hooks";
import React from "react";

import "./shuffler.css";

const buttonText = {
  initial: "BEGIN",
  shuffling: "SHUFFLING...",
  shuffled: "NEXT",
  finished: "PLAY AGAIN",
};

export default function Shuffler() {
  const [{ shufflerState }] = useVariables();

  return (
    <article className="shuffler">
      <div className="vfx"></div>
      <div className="wrapper">
        <Conditional condition={shufflerState === "initial"}>
          <NumberInput />
        </Conditional>
        <Conditional condition={shufflerState !== "initial"}>
          <div className="result default no-sel"></div>
        </Conditional>
        <Button text={buttonText[shufflerState]} loadingLabel={buttonText[shufflerState]} size="full" />
      </div>
    </article>
  );
}
