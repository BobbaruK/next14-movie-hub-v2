interface Props {
  params: {
    id: string;
  };
}

export default function MovieTranslations({ params: { id } }: Props) {
  return (
    <div>
      <h1>Movie Translations: {id}</h1>
    </div>
  );
}
