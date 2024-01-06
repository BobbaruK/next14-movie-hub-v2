import MainTitleHeroSection from "@/components/MainTitleHeroSection";
import { RQ_TVSHOW_KEY, RQ_TVSHOW_ENDPOINT } from "@/constants";

interface Props {
  params: {
    id: string;
  };
}

export default function Movie({ params: { id } }: Props) {
  return (
    <MainTitleHeroSection
      queryKey={RQ_TVSHOW_KEY(id)}
      endpoint={RQ_TVSHOW_ENDPOINT(id)}
    />
  );
}
