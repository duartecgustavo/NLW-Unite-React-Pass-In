import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface ITableCell extends ComponentProps<"td"> {
  className?: string;
}

export function TableCell({ ...props }: ITableCell) {
  return (
    <td
      {...props}
      className={twMerge("px-4 py-3 text-sm font-light", props.className)}
    />
  );
}
