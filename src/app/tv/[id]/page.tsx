import BackToMain from "@/components/BackToMain/BackToMain";

interface Props {
  params: {
    id: string;
  };
}

export default function Movie({ params: { id } }: Props) {
  return (
    <div>
      <h1>TVShow: {id}</h1>
    </div>
  );
}
