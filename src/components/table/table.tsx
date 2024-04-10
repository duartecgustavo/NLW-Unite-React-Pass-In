import { ComponentProps } from "react";

interface ITable extends ComponentProps<"table"> {}

export function TableComponent({ ...props }: ITable) {
  return (
    <div className="border border-white/10 rounded-lg">
      <table {...props} className="w-full" />
    </div>
  );
}
