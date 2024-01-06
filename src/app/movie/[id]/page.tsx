interface Props {
  params: {
    id: string;
  };
}

export default function Movie({ params: { id } }: Props) {
  return (
    <div className="appContaier flex flex-col gap-8 lg:flex-row">
      <div>
        <h1>Movie: {id}</h1>
      </div>
    </div>
  );
}
