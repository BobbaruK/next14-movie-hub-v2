import CustomAlert from "@/components/CustomAlert";

interface Props {
  query: string | undefined;
}

const KeywordGridSearch = ({ query }: Props) => {
  if (!query)
    return (
      <CustomAlert
        variant={"destructive"}
        title={"Error"}
        description="No query passed to search"
      />
    );

  return (
    <div>
      Keyword: <b>{query}</b>
    </div>
  );
};

export default KeywordGridSearch;
