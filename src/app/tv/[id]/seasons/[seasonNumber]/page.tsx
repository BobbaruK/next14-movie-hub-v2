interface Props {
  params: {
    seasonNumber: string;
  };
}

export default function TVShowSeason({ params: { seasonNumber } }: Props) {
  return (
    <div>
      <h1>TVShow Season: {seasonNumber}</h1>
    </div>
  );
}
