import classNames from "classnames";
import { ChangeEventHandler, HTMLInputTypeAttribute } from "react";

interface Props {
  type?: HTMLInputTypeAttribute;
  value?: string | readonly string[] | number | undefined;
  className?: string;
  placeholder?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}
export default function Input({
  type,
  value,
  className,
  placeholder,
  onChange,
}: Props) {
  return (
    <input
      type={type}
      value={value}
      className={classNames(
        "w-full text-primary px-3 py-2 border-2 border-secondary rounded-xl shadow-lg focus:outline-2 focus:outline-primary",
        { className }
      )}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}
