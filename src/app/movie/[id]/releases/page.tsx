interface Props {
  params: {
    id: string;
  };
}

export default function MovieReleases({ params: { id } }: Props) {
  return (
    <div>
      <h1>Movie Releases: {id}</h1>
    </div>
  );
}
