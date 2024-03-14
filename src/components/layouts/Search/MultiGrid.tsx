import CustomAlert from "@/components/CustomAlert";

interface Props {
  query: string;
}

const MultiGridSearch = ({ query }: Props) => {
  return (
    <div>
      <h1>Search movies, tv shows and people: &bdquo;{query}&rdquo;</h1>
      <p className="leading-5">Coming soon...</p>
    </div>
  );
};

export default MultiGridSearch;
