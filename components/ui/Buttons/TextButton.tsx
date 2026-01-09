import type { ButtonProps } from "@/types/ui/Button";
import classNames from "classnames";

export default function TextButton({
  label,
  size = "regular",
  theme = "light",
  version = "primary",
  type = "button",
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames(
        "px-4 py-2 rounded-xl cursor-pointer text-center items-center",
        {
          "bg-primary hover:bg-primary/90 text-quaternary":
            version === "primary",
          "bg-none border-2 border-secondary hover:bg-primary ":
            version === "secondary",
          "bg-red-500 hover:bg-red-600 text-quaternary": version === "danger",
          "text-primary hover:text-quaternary":
            theme === "light" && version === "secondary",
          "text-quaternary": theme === "dark" && version === "secondary",
          "text-sm": size === "sm",
          "text-lg": size === "lg",
          "text-xl": size === "xl",
        }
      )}
    >
      {label}
    </button>
  );
}
