interface Props {
  size?: "xs" | "sm" | "md" | "lg";
}

const LoadingSpinner = ({ size = "xs" }: Props) => {
  return (
    <span
      className={["loading", "loading-bars", `loading-${size}`].join(" ")}
    ></span>
  );
};

export default LoadingSpinner;
