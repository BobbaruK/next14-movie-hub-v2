interface Props {
  params: {
    id: string;
    seasonNumber: string;
  };
}

export default function TVShowEpisodes({
  params: { id, seasonNumber },
}: Props) {
  return (
    <div>
      <h1>
        TVShow ({id}) - Season {seasonNumber} - episode list
      </h1>
    </div>
  );
}
