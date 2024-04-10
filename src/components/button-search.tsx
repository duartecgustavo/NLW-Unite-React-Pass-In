import { ComponentProps } from "react";

interface IButtonSearch extends ComponentProps<'input'>{}

export function ButtonSearch({...props}: IButtonSearch) {
  return(
    <input {...props} className="bg-transparent font-normal text-sm flex-1 outline-none" />
  )
}