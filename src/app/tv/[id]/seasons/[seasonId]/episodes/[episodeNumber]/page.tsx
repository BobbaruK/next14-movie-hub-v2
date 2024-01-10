interface Props {
  params: {
    id: string;
    seasonNumber: string;
    episodeNumber: string;
  };
}

export default function TVShowEpisode({
  params: { id, seasonNumber, episodeNumber },
}: Props) {
  return (
    <div>
      <h1>
        TVShow ({id}) - Season {seasonNumber} - Episode {episodeNumber}
      </h1>
    </div>
  );
}
