import PeopleGridSearch from "@/components/layouts/Search/PeopleGrid";
import SearchPageComponent from "@/components/layouts/Search/SearchPage";

interface Props {
  searchParams: {
    query: string;
    page: string;
  };
}

const SearchPageTVShows = ({ searchParams: { query, page } }: Props) => {
  return (
    <SearchPageComponent
      query={query}
      contentGrid={<PeopleGridSearch query={query} />}
      page={parseInt(page)}
    />
  );
};

export default SearchPageTVShows;
