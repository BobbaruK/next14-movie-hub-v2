interface Props {
  params: {
    id: string;
  };
}

export default function MovieTitles({ params: { id } }: Props) {
  return (
    <div>
      <h1>Movie Titles: {id}</h1>
    </div>
  );
}
