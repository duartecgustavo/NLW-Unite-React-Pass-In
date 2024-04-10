import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface IButtonAction extends ComponentProps<"button"> {
  transparent?: boolean;
}

export function ButtonAction({ transparent, ...props }: IButtonAction) {
  return (
    <button
      {...props}
      className={twMerge(
        "bg-white/10 border border-white/10 rounded-md p-1.5 hover:bg-orange-400",
        transparent &&
          "bg-black/20 border border-white/10 rounded-md p-1.5 hover:bg-orange-400",
        props.disabled &&
          "bg-white/30 border border-white/10 rounded-md p-1.5 hover:bg-orange-400"
      )}
    />
  );
}
