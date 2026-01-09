import type { Size, Theme, Version } from "@/types/Button";
import classNames from "classnames";

interface Props {
  label: string;
  size?: Size;
  theme?: Theme;
  version?: Version;
  onClick: () => void;
}

export default function TextButton({
  label,
  size = "regular",
  theme = "light",
  version = "primary",
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={classNames("px-4 py-2 rounded-xl cursor-pointer ", {
        "bg-primary hover:bg-primary/90": version === "primary",
        "bg-none border-2 border-secondary  hover:bg-primary ":
          version === "secondary",
        "bg-red-500 hover:bg-red-600": version === "danger",
        "text-primary hover:text-quaternary":
          theme === "light" && version === "secondary",
        "text-quaternary": theme === "dark" && version === "secondary",
        "text-sm": size === "sm",
        "text-lg": size === "lg",
        "text-xl": size === "xl",
      })}
    >
      {label}
    </button>
  );
}
