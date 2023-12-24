interface Props {
  params: {
    id: string;
  };
}

export default function Person({ params: { id } }: Props) {
  return (
    <div>
      <h1>Person: {id}</h1>
    </div>
  );
}
