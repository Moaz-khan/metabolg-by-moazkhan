import { Button } from "@/components/ui/button";

interface ButtonOutlineProps {
  buttonText: string; // Prop to pass button text dynamically
}

export function ButtonOutline({ buttonText }: ButtonOutlineProps) {
  return <Button variant="outline">{buttonText}</Button>;
}
