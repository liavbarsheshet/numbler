import React from "react";
import clsx from "clsx";

import "./link.css";

type LinkProps = {
  children?: React.ReactNode;
  target?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export default function link({ children, className, ...rest }: LinkProps) {
  return (
    <a className={clsx("link bt", className)} {...rest}>
      {children}
    </a>
  );
}
