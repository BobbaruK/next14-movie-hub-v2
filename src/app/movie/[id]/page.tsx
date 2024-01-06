import MainTitleHeroSection from "@/components/MainTitleHeroSection";
import { RQ_MOVIE_KEY, RQ_MOVIE_ENDPOINT } from "@/constants";

interface Props {
  params: {
    id: string;
  };
}

export default function Movie({ params: { id } }: Props) {
  return (
    <MainTitleHeroSection
      queryKey={RQ_MOVIE_KEY(id)}
      endpoint={RQ_MOVIE_ENDPOINT(id)}
    />
  );
}
