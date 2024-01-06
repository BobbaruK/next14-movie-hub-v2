import MainTitleHeroSection from "@/components/MainTitleHeroSection";
import HomePage from "@/components/Sidebar/MainTitle/HomePage";
import MainKeywords from "@/components/Sidebar/MainTitle/MainKeywords";
import OriginalLanguage from "@/components/Sidebar/MainTitle/OriginalLanguage";
import Status from "@/components/Sidebar/MainTitle/Status";
import {
  RQ_TVSHOW_ENDPOINT,
  RQ_TVSHOW_KEY,
  RQ_TVSHOW_KEYWORDS_ENDPOINT,
  RQ_TVSHOW_KEYWORDS_KEY,
} from "@/constants";

interface Props {
  params: {
    id: string;
  };
}

export default function TvShow({ params: { id } }: Props) {
  return (
    <>
      <MainTitleHeroSection
        queryKey={RQ_TVSHOW_KEY(id)}
        endpoint={RQ_TVSHOW_ENDPOINT(id)}
      />
      <div className="appContaier flex flex-col gap-8 py-20 lg:flex-row">
        <div className="lg:basis-3/4">content</div>
        <div className="lg:basis-1/4">
          <div className="flex flex-col gap-10">
            <HomePage
              queryKey={RQ_TVSHOW_KEY(id)}
              endpoint={RQ_TVSHOW_ENDPOINT(id)}
            />
            <Status
              queryKey={RQ_TVSHOW_KEY(id)}
              endpoint={RQ_TVSHOW_ENDPOINT(id)}
            />
            <OriginalLanguage
              queryKey={RQ_TVSHOW_KEY(id)}
              endpoint={RQ_TVSHOW_ENDPOINT(id)}
            />
            <MainKeywords
              queryKey={RQ_TVSHOW_KEYWORDS_KEY(id)}
              endpoint={RQ_TVSHOW_KEYWORDS_ENDPOINT(id)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
