import { Button, Conditional, NumberInput } from "@/components";
import { useAudio, useVariables } from "@/hooks";
import { randomNumber } from "@/util";
import React from "react";

import "./shuffler.css";

const buttonText = {
  initial: "BEGIN",
  shuffling: "SHUFFLING...",
  shuffled: "NEXT NUMBER",
  finished: "PLAY AGAIN",
};

const MAX_SAFE_SIZE = 16_777_216;
const SLOWEST_DELAY_MS = 300;
const MAX_NUM_DISPLAY = 50;
const MIN_DELAY_MS = 100;

export default function Shuffler() {
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const showCaseRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [useMemory, setMemory] = React.useState<number[] | { [key: string]: boolean }>([]);
  const [{ shufflerState, agreed, distinctMode }, setVariables] = useVariables();
  const [useCounter, setCounter] = React.useState<number>(0);
  const [useSize, setSize] = React.useState(30);

  const playSound = useAudio();

  const handleClick = () => {
    if (!agreed) return;

    if (shufflerState === "initial") {
      const input = inputRef.current;

      if (!input) return;

      const value = input.value.trim();

      if (!value) return;

      const size = parseInt(value, 10);

      if (isNaN(size) || size <= 0) return;

      setMemory(size > MAX_SAFE_SIZE ? {} : new Array(size));
      setSize(size);
      setCounter(0);

      // Change State
      setVariables((prev) => ({ ...prev, shufflerState: "shuffling" }));
      return;
    }

    if (shufflerState === "shuffled") {
      setVariables((prev) => ({ ...prev, shufflerState: "shuffling" }));
      return;
    }

    if (shufflerState === "finished") {
      setVariables((prev) => ({ ...prev, shufflerState: "initial" }));
      return;
    }
  };

  React.useEffect(() => {
    if (shufflerState !== "shuffling" || timeoutRef.current) return;

    const showCase = showCaseRef.current;

    if (!showCase) return;

    const maxDisplays = Math.trunc(Math.min(MAX_NUM_DISPLAY, useSize));

    // Function to calculate the shuffle animation
    const fn = (n: number) =>
      n > maxDisplays / 2
        ? ((SLOWEST_DELAY_MS - MIN_DELAY_MS) / (maxDisplays / 2) ** 2) * (n - maxDisplays / 2) ** 2 + MIN_DELAY_MS
        : MIN_DELAY_MS;

    const selectRandomNumber = () => {
      if (Array.isArray(useMemory)) {
        const randomIndex = randomNumber(0, useMemory.length - 1);
        const randomValue = useMemory[randomIndex] ?? randomIndex + 1;

        if (distinctMode) {
          setMemory((prev) => {
            if (!Array.isArray(prev)) return prev;

            const newMemory = [...prev];
            if (!newMemory[randomIndex]) newMemory[randomIndex] = randomValue;
            newMemory[newMemory.length - 1] = newMemory[randomIndex];
            newMemory.pop();

            return newMemory;
          });
          setCounter((prev) => prev + 1);
        }

        return randomValue;
      }

      let randomValue = randomNumber(1, useSize);

      while (useMemory[`${randomValue}`]) randomValue = randomNumber(1, useSize);

      if (distinctMode) {
        setMemory((prev) => {
          if (Array.isArray(prev)) return prev;

          const newMemory = { ...prev };
          newMemory[`${randomValue}`] = true;
          return newMemory;
        });
        setCounter((prev) => prev + 1);
      }

      return randomValue;
    };

    const handleTimeout = (n: number) => {
      if (n < maxDisplays) {
        showCase.innerText = `${randomNumber(1, useSize)}`;
        playSound("click", 1 + (1 - n / maxDisplays));
        // Play click sound with decreasing volume
        timeoutRef.current = setTimeout(() => handleTimeout(n + 1), fn(n + 1));
        return;
      }

      // Show the number
      showCase.innerText = `${selectRandomNumber()}`;
      playSound("yay", 1);

      if (useCounter + 1 === useSize) {
        setVariables((prev) => ({ ...prev, shufflerState: "finished" }));
        return;
      }

      setVariables((prev) => ({ ...prev, shufflerState: "shuffled" }));

      timeoutRef.current = null;
    };

    timeoutRef.current = setTimeout(() => handleTimeout(0), fn(0));
  }, [shufflerState, useMemory, useSize, useCounter, setVariables, playSound, distinctMode]);

  React.useEffect(() => {
    if (!timeoutRef.current) return;

    return () => {
      clearTimeout(timeoutRef.current ?? undefined);
      timeoutRef.current = null;
    };
  }, []);

  return (
    <article className="shuffler">
      <div className="vfx"></div>
      <div className="wrapper">
        <Conditional condition={shufflerState === "initial"}>
          <NumberInput ref={inputRef} maxLength={11} defaultValue={30} />
        </Conditional>
        <Conditional condition={shufflerState !== "initial"}>
          <div ref={showCaseRef} className="result default no-sel"></div>
        </Conditional>
        <Button
          loadingLabel={buttonText[shufflerState]}
          text={buttonText[shufflerState]}
          onClick={handleClick}
          size="full"
        />
      </div>
    </article>
  );
}
