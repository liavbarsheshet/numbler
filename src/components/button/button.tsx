import React from "react";
import { Ripple, Loading } from "../index.tsx";

import "./button.css";
import clsx from "clsx";

type ButtonProps = {
  /** Button Type */
  variant?: "text" | "regular" | "outlined";
  /** Size */
  size?: "small" | "medium" | "large" | "full";
  /** Font contrast */
  contrast?: boolean;
  /** Disabled? */
  disabled?: boolean;
  /** Aria Label */
  ariaLabel?: string;
  /** Loading label. */
  loadingLabel?: string;
  /** Loading? */
  loading?: boolean;
  /** Button Icon */
  icon?: React.ReactNode;
  /** Is button active */
  active?: boolean;
  /** Text */
  text?: string;
} & React.HTMLAttributes<HTMLButtonElement>;

export default function Button({
  loadingLabel = "Loading...",
  variant = "regular",
  contrast = false,
  disabled = false,
  size = "medium",
  loading = false,
  active = false,
  className,
  text = "",
  icon,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={clsx(`button bt no-sel`, className)}
      data-disabled={disabled}
      data-contrast={contrast}
      data-variant={variant}
      data-loading={loading}
      data-active={active}
      data-size={size}
      tabIndex={0}
      autoFocus
      {...rest}
    >
      <Ripple disabled={disabled || loading} />

      {loading && <Loading />}
      {!loading && icon}
      <div className="button-main no-sel">{loading ? loadingLabel : text}</div>
    </button>
  );
}
