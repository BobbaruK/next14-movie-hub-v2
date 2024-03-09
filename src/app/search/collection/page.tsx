import CollectionGridSearch from "@/components/layouts/Search/CollectionGrid";
import SearchPageComponent from "@/components/layouts/Search/SearchPage";

interface Props {
  searchParams: {
    query: string;
  };
}

const SearchPageCollection = ({ searchParams: { query } }: Props) => {
  return (
    <SearchPageComponent
      query={query}
      contentGrid={<CollectionGridSearch query={query} />}
    />
  );
};

export default SearchPageCollection;
