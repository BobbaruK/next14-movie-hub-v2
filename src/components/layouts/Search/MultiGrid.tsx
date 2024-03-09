import CustomAlert from "@/components/CustomAlert";

interface Props {
  query: string | undefined;
}

const MultiGridSearch = ({ query }: Props) => {
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
      Multi: <b>{query}</b>
    </div>
  );
};

export default MultiGridSearch;
