import { Button, Conditional, NumberInput } from "@/components";
import { useAudio, useVariables, useConfetti } from "@/hooks";
import type { TVariables } from "@/context";
import { randomNumber } from "@/util";
import clsx from "clsx";

import React from "react";

import "./shuffler.css";

const BUTTON_TEXT: Record<TVariables["shufflerState"], string> = {
  initial: "BEGIN",
  shuffling: "SHUFFLING...",
  shuffled: "NEXT NUMBER",
  finished: "PLAY AGAIN",
} as const;

const MAX_SAFE_SIZE = 16_777_216;
const SLOWEST_DELAY_MS = 300;
const MAX_NUM_DISPLAY = 50;
const MIN_DELAY_MS = 100;

// Memoized delay calculation function
const calculateDelay = (n: number, maxDisplays: number): number => {
  if (n <= maxDisplays / 2) return MIN_DELAY_MS;

  const halfMax = maxDisplays / 2.2;
  const factor = (SLOWEST_DELAY_MS - MIN_DELAY_MS) / halfMax ** 2;
  return factor * (n - halfMax) ** 2 + MIN_DELAY_MS;
};

export default function Shuffler() {
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const showCaseRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Local state for shuffler-specific data
  const [memory, setMemory] = React.useState<number[] | Record<string, boolean>>([]);
  const [counter, setCounter] = React.useState<number>(0);
  const [size, setSize] = React.useState<number>(30);

  // External state
  const [{ shufflerState, agreed, distinctMode }, setVariables] = useVariables();
  const playSound = useAudio();

  const fire = useConfetti();

  // Memoized values
  const maxDisplays = React.useMemo(() => Math.trunc(Math.min(MAX_NUM_DISPLAY, size)), [size]);
  const isMemoryArray = React.useMemo(() => Array.isArray(memory), [memory]);
  const isFinished = React.useMemo(() => counter + 1 === size, [counter, size]);

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  // Memoized random number selector
  const selectRandomNumber = React.useCallback((): number => {
    if (isMemoryArray) {
      const memoryArray = memory as number[];
      const randomIndex = randomNumber(0, memoryArray.length);
      const randomValue = memoryArray[randomIndex] ?? randomIndex + 1;

      if (distinctMode) {
        setMemory((prev) => {
          if (!Array.isArray(prev)) return prev;
          const newMemory = [...prev];
          newMemory[randomIndex] = newMemory[newMemory.length - 1] ?? newMemory.length;
          newMemory.pop();
          return newMemory;
        });
        setCounter((prev) => prev + 1);
      }

      return randomValue;
    }

    const memoryObject = memory as Record<string, boolean>;
    let randomValue: number;

    // More efficient random selection for object-based memory
    do {
      randomValue = randomNumber(0, size) + 1;
    } while (memoryObject[randomValue.toString()]);

    if (distinctMode) {
      setMemory((prev) => {
        if (Array.isArray(prev)) return prev;
        return { ...prev, [randomValue.toString()]: true };
      });
      setCounter((prev) => prev + 1);
    }

    return randomValue;
  }, [memory, size, distinctMode, isMemoryArray]);

  // Memoized timeout handler
  const createTimeoutHandler = React.useCallback(() => {
    let currentIteration = 0;

    const handleTimeout = (): void => {
      const showCase = showCaseRef.current;
      if (!showCase) return;

      if (currentIteration < maxDisplays) {
        // Animation phase
        const someNumber = (randomNumber(0, size) + 1).toLocaleString();
        showCase.setAttribute("data-length", someNumber.length.toString());
        showCase.innerText = someNumber;

        playSound("click", 1 + (1 - currentIteration / maxDisplays));

        currentIteration++;
        timeoutRef.current = setTimeout(handleTimeout, calculateDelay(currentIteration, maxDisplays));
        return;
      }

      // Final result phase
      const selectedNumber = selectRandomNumber().toLocaleString();
      showCase.setAttribute("data-length", selectedNumber.length.toString());
      showCase.innerText = selectedNumber;
      fire();

      if (isFinished) playSound("gameover", 1);
      else playSound("yay", 1);

      // Update state based on completion
      setVariables((prev) => ({
        ...prev,
        shufflerState: isFinished ? "finished" : "shuffled",
      }));

      timeoutRef.current = null;
    };

    return handleTimeout;
  }, [maxDisplays, size, playSound, selectRandomNumber, setVariables, isFinished]);

  // Handle shuffling effect
  React.useEffect(() => {
    if (shufflerState !== "shuffling" || timeoutRef.current) return;

    const timeoutHandler = createTimeoutHandler();
    timeoutRef.current = setTimeout(timeoutHandler, calculateDelay(0, maxDisplays));
  }, [shufflerState, createTimeoutHandler, maxDisplays]);

  // Memoized click handler
  const handleClick = React.useCallback(() => {
    if (!agreed) return;

    switch (shufflerState) {
      case "initial": {
        const input = inputRef.current;
        if (!input) return;

        const value = input.value.trim();
        if (!value) return;

        const inputSize = parseInt(value, 10);
        if (isNaN(inputSize) || inputSize <= 0) return;

        // Initialize memory structure based on size
        const newMemory = inputSize > MAX_SAFE_SIZE ? {} : new Array(inputSize);
        setMemory(newMemory);
        setSize(inputSize);
        setCounter(0);

        setVariables((prev) => ({ ...prev, shufflerState: "shuffling" }));
        break;
      }
      case "shuffled":
        setVariables((prev) => ({ ...prev, shufflerState: "shuffling" }));
        break;
      case "finished":
        setVariables((prev) => ({ ...prev, shufflerState: "initial" }));
        break;
    }
  }, [agreed, shufflerState, setVariables]);

  return (
    <article className="shuffler">
      <div className="vfx"></div>
      <div className="wrapper">
        <div className="show-case-container" data-is-initial={shufflerState === "initial"}>
          <Conditional condition={shufflerState === "initial"}>
            <NumberInput ref={inputRef} maxLength={11} defaultValue={30} />
          </Conditional>
          <Conditional condition={shufflerState !== "initial"}>
            <div
              className={clsx("result default no-sel", shufflerState === "shuffling" ? "ping" : undefined)}
              ref={showCaseRef}
            ></div>
          </Conditional>
        </div>

        <Button
          loadingLabel={BUTTON_TEXT[shufflerState]}
          loading={shufflerState === "shuffling"}
          text={BUTTON_TEXT[shufflerState]}
          onClick={handleClick}
          size="full"
        />
      </div>
    </article>
  );
}
