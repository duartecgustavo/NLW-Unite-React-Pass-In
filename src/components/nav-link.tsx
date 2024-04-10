import { ComponentProps } from "react";

interface INavLink extends ComponentProps<"a"> {}

export function NavLink({ ...props }: INavLink) {
  return <a {...props} />;
}
