import CustomAlert from "@/components/CustomAlert";

interface Props {
  query: string | undefined;
}

const CompanyGridSearch = ({ query }: Props) => {
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
      Company: <b>{query}</b>
    </div>
  );
};

export default CompanyGridSearch;
