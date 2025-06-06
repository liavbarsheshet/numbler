import React from "react";

type ConditionalProps = {
  /** Children to be rendered */
  children?: React.ReactNode;
  /** Condition to be rendered */
  condition?: boolean;
};

export default function Conditional({ condition = false, children }: ConditionalProps) {
  if (!condition) return null;

  return children;
}
