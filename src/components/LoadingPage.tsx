import LoadingSpinner from "./LoadingSpinner";

interface Props {
  message: string;
}

const LoadingPage = ({ message }: Props) => {
  return (
    <div className="appContaier flex flex-col gap-8 py-8 lg:flex-row">
      <p className="flex items-center justify-center gap-4">
        <LoadingSpinner size="lg" />
        {message}
      </p>
    </div>
  );
};

export default LoadingPage;
