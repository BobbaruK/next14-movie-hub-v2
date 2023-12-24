import Link from "next/link";

export default function NowPlayingMovies() {
  return (
    <div>
      <h1>Now playing movies</h1>

      <Link href="/movie/507089-five-nights-at-freddy-s">
        movie 507089-five-nights-at-freddy-s
      </Link>
    </div>
  );
}
