import React from "react";

import "./navigation.css";
import clsx from "clsx";

type NavigationProps = {
  children?: React.ReactNode;
};

export default function Navigation({ children }: NavigationProps) {
  return <nav className="navigation">{children}</nav>;
}

type NavigationLinkProps = {
  text?: string;
  href?: string;
} & React.HTMLAttributes<HTMLAnchorElement>;

Navigation.NavLink = function ({ text = "", className, ...rest }: NavigationLinkProps) {
  return (
    <a className={clsx("nav-link medium", className)} {...rest}>
      {text}
    </a>
  );
};
