import { Button } from "@/components";
import React from "react";

import "./shuffler.css";

export default function Shuffler() {
  return (
    <article className="shuffler">
      <div className="vfx"></div>
      <div className="wrapper">
        <div className="result default no-sel">24</div>
        <Button text="BEGIN" loadingLabel="SHUFFLING..." loading size="large" />
      </div>
    </article>
  );
}
