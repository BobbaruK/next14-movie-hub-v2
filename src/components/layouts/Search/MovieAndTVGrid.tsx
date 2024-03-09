import CustomAlert from "@/components/CustomAlert";

interface Props {
  query: string | undefined;
}

const MovieAndTVGridSearch = ({ query }: Props) => {
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
      Movies and TV Shows: <b>{query}</b>
    </div>
  );
};

export default MovieAndTVGridSearch;
