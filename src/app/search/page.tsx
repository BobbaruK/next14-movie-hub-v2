import MultiGridSearch from "@/components/layouts/Search/MultiGrid";
import SearchPageComponent from "@/components/layouts/Search/SearchPage";
import { notFound } from "next/navigation";

interface Props {
  searchParams: {
    query: string;
    page: string;
  };
}

const SearchPage = async ({ searchParams: { query, page } }: Props) => {
  if (!query && query !== "") notFound();

  return (
    <SearchPageComponent
      query={query}
      contentGrid={<MultiGridSearch query={query} />}
      page={parseInt(page)}
    />
  );
};

export default SearchPage;
