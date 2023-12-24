interface Props {
  params: {
    id: string;
  };
}

export default function PersonTranslations({ params: { id } }: Props) {
  return (
    <div>
      <h1>Person ({id}) Translations</h1>
    </div>
  );
}
