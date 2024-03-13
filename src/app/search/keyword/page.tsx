import KeywordGridSearch from "@/components/layouts/Search/KeywordGrid";
import SearchPageComponent from "@/components/layouts/Search/SearchPage";

interface Props {
  searchParams: {
    query: string;
    page: string;
  };
}

const SearchPageKeyword = ({ searchParams: { query, page } }: Props) => {
  return (
    <SearchPageComponent
      query={query}
      contentGrid={<KeywordGridSearch query={query} />}
      page={parseInt(page)}
    />
  );
};

export default SearchPageKeyword;
