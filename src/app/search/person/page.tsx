import PeopleGridSearch from "@/components/layouts/Search/PeopleGrid";
import SearchPageComponent from "@/components/layouts/Search/SearchPage";

interface Props {
  searchParams: {
    query: string;
  };
}

const SearchPageTVShows = ({ searchParams: { query } }: Props) => {
  return (
    <SearchPageComponent
      query={query}
      contentGrid={<PeopleGridSearch query={query} />}
    />
  );
};

export default SearchPageTVShows;
