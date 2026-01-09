import { ChangeEventHandler, HTMLInputTypeAttribute } from "react";

export interface InputProps {
  type?: HTMLInputTypeAttribute;
  value?: string | readonly string[] | number | undefined;
  className?: string;
  placeholder?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}
