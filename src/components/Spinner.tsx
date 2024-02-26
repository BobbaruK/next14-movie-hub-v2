import { ImSpinner10 } from "react-icons/im";

interface Props {
  size?: string | number;
}

const Spinner = ({ size }: Props) => {
  return (
    <ImSpinner10
      className="animate-spin transition-all duration-1000 ease-linear"
      size={size || 20}
    />
  );
};

export default Spinner;
