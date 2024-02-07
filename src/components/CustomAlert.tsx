import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { cn } from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  variant: "default" | "destructive";
  title: string;
  description?: string;
}

const CustomAlert = ({ variant, title, description, ...restProps }: Props) => {
  return (
    <div {...restProps} className={cn(restProps.className)}>
      <Alert variant={variant}>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{title}</AlertTitle>
        {description && <AlertDescription>{description}</AlertDescription>}
      </Alert>
    </div>
  );
};

export default CustomAlert;
