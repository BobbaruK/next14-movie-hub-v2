import Link from "next/link";

interface Props {
  params: {
    id: string;
  };
}

export default function MovieImagesBackdrops({ params: { id } }: Props) {
  return (
    <div>
      <h1>Movie Images Backdrops</h1>
      <Link href={`/movie/${id}/images/image/12`}>backdrop 12</Link> <br />
      <Link href={`/movie/${id}/images/image/13`}>backdrop 13</Link> <br />
      <Link href={`/movie/${id}/images/image/123`}>backdrop 123</Link>
    </div>
  );
}
