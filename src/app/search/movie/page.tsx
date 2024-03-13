import MovieGridSearch from "@/components/layouts/Search/MovieGrid";
import SearchPageComponent from "@/components/layouts/Search/SearchPage";

interface Props {
  searchParams: {
    query: string;
    page: string;
  };
}

const SearchPageMovie = ({ searchParams: { query, page } }: Props) => {
  return (
    <SearchPageComponent
      query={query}
      contentGrid={<MovieGridSearch query={query} />}
      page={parseInt(page)}
    />
  );
};

export default SearchPageMovie;
