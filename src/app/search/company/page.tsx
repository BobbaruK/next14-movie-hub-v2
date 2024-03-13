import CompanyGridSearch from "@/components/layouts/Search/CompanyGrid";
import SearchPageComponent from "@/components/layouts/Search/SearchPage";

interface Props {
  searchParams: {
    query: string;
    page: string;
  };
}

const SearchPageCompany = ({ searchParams: { query, page } }: Props) => {
  return (
    <SearchPageComponent
      query={query}
      contentGrid={<CompanyGridSearch query={query} />}
      page={parseInt(page)}
    />
  );
};

export default SearchPageCompany;
