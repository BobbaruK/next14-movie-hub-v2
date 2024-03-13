import SearchPageComponent from "@/components/layouts/Search/SearchPage";
import TVShowsGridSearch from "@/components/layouts/Search/TVShowsGrid";

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
      contentGrid={<TVShowsGridSearch query={query} />}
      page={parseInt(page)}
    />
  );
};

export default SearchPageTVShows;
