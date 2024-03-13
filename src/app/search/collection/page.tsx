import CollectionGridSearch from "@/components/layouts/Search/CollectionGrid";
import SearchPageComponent from "@/components/layouts/Search/SearchPage";

interface Props {
  searchParams: {
    query: string;
    page: string;
  };
}

const SearchPageCollection = ({ searchParams: { query, page } }: Props) => {
  return (
    <SearchPageComponent
      query={query}
      contentGrid={<CollectionGridSearch query={query} />}
      page={parseInt(page)}
    />
  );
};

export default SearchPageCollection;
