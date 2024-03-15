import MainTitleHeroSection from "@/components/MainTitle/HeroSection";
import CollectionMovies from "@/components/layouts/Collection/Movies";
import { RQ_COLLECTION_KEY } from "@/constants";

interface Props {
  params: {
    id: string;
  };
}

const Collection = ({ params: { id } }: Props) => {
  return (
    <>
      <MainTitleHeroSection queryKey={RQ_COLLECTION_KEY(id)} />
      <div className="container flex flex-col gap-8 py-20">
        {/* <div>
          <h2>Featured Cast</h2>
          <hr />
        </div>
        <div>
          <h2>Featured Crew</h2>
          <hr />
        </div> */}
        <CollectionMovies />
      </div>
    </>
  );
};

export default Collection;
