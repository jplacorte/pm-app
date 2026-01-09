import { InputProps } from "@/types/ui/Input";
import classNames from "classnames";

export default function Input({
  type,
  value,
  className,
  placeholder,
  onChange,
}: InputProps) {
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
