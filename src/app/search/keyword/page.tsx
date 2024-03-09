import KeywordGridSearch from "@/components/layouts/Search/KeywordGrid";
import SearchPageComponent from "@/components/layouts/Search/SearchPage";

interface Props {
  searchParams: {
    query: string;
  };
}

const SearchPageKeyword = ({ searchParams: { query } }: Props) => {
  return (
    <SearchPageComponent
      query={query}
      contentGrid={<KeywordGridSearch query={query} />}
    />
  );
};

export default SearchPageKeyword;
