import React from "react";

type Props = {
  /** Typography type to be rendered */
  type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "small";
  children?: React.ReactNode;
} & React.HTMLProps<HTMLHeadingElement>;

export function Typography({ type = "p", children, ...rest }: Props) {
  switch (type) {
    case "h1":
      return <h1 {...rest}>{children}</h1>;
    case "h2":
      return <h2 {...rest}>{children}</h2>;
    case "h3":
      return <h3 {...rest}>{children}</h3>;
    case "h4":
      return <h4 {...rest}>{children}</h4>;
    case "h5":
      return <h5 {...rest}>{children}</h5>;
    case "h6":
      return <h6 {...rest}>{children}</h6>;
    case "p":
      return <p {...rest}>{children}</p>;
    case "small":
      return <small {...rest}>{children}</small>;
  }
}
