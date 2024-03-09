import CompanyGridSearch from "@/components/layouts/Search/CompanyGrid";
import SearchPageComponent from "@/components/layouts/Search/SearchPage";

interface Props {
  searchParams: {
    query: string;
  };
}

const SearchPageCompany = ({ searchParams: { query } }: Props) => {
  return (
    <SearchPageComponent
      query={query}
      contentGrid={<CompanyGridSearch query={query} />}
    />
  );
};

export default SearchPageCompany;
