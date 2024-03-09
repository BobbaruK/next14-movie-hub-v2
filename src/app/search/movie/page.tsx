import MovieAndTVGridSearch from "@/components/layouts/Search/MovieAndTVGrid";
import SearchPageComponent from "@/components/layouts/Search/SearchPage";

interface Props {
  searchParams: {
    query: string;
  };
}

const SearchPageMovie = ({ searchParams: { query } }: Props) => {
  return (
    <SearchPageComponent
      query={query}
      contentGrid={<MovieAndTVGridSearch query={query} />}
    />
  );
};

export default SearchPageMovie;
