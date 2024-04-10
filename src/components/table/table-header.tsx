import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface ITableHeader extends ComponentProps<"th"> {
  className?: string;
}

export function TableHeader({ ...props }: ITableHeader) {
  return (
    <th
      {...props}
      className={twMerge(
        "px-4 py-3 text-sm font-semibold text-start",
        props.className
      )}
    />
  );
}
