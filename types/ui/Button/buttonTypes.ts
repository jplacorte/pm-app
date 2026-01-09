type Version = "primary" | "secondary" | "alt" | "danger";

type Size = "sm" | "regular" | "lg" | "xl" | "2xl";

type Theme = "light" | "dark";

type ButtonType = "submit" | "reset" | "button";

export interface ButtonProps {
  label: string;
  size?: Size;
  type?: ButtonType;
  theme?: Theme;
  version?: Version;
  onClick?: () => void;
}
