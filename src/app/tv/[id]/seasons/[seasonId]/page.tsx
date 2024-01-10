interface Props {
  params: {
    id: string;
  };
}

export default function TVShowSeason({ params: { id } }: Props) {
  return (
    <div>
      <h1>TVShow Season: {id}</h1>
    </div>
  );
}
