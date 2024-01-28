import { TheCast } from "@/types/movies/CastAndCrew";
import { MovieRecommendation } from "@/types/movies/movie/MovieRecommendations";
import { TVShowRecommendation } from "@/types/movies/tv/TVShowRecommendations";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import dynamic from "next/dynamic";
import { Button } from "./ui/button";
const DynamicCastPersonCard = dynamic(() => import("./Cards/CastPerson"));
const DynamicMainCard = dynamic(() => import("./Cards/Main"));

interface Props {
  typeOptions:
    | {
        type: "cast";
        arr: TheCast[];
      }
    | {
        type: "movie-recommendation";
        arr: (MovieRecommendation | TVShowRecommendation)[];
      };

  carouselOptions?: EmblaOptionsType;
  slideSizes?: string;
}

export function MainTitleEmblaCarousel({
  typeOptions,
  carouselOptions,
  slideSizes,
}: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    containScroll: "trimSnaps",
    align: "start",
    skipSnaps: true,
    // loop: true,
    // slidesToScroll: 3,
    // startIndex: 4
    ...carouselOptions,
  });

  const scrollPrev = () => {
    if (emblaApi) emblaApi.scrollPrev();
  };

  const scrollNext = () => {
    if (emblaApi) emblaApi.scrollNext();
  };

  const cardRender = (arrItem: any) => {
    switch (typeOptions.type) {
      case "cast":
        const cast = arrItem as TheCast;
        return <DynamicCastPersonCard cast={cast} key={cast.id} />;

      case "movie-recommendation":
        const recommendation = arrItem as
          | MovieRecommendation
          | TVShowRecommendation;
        return <DynamicMainCard movie={arrItem} />;

      default:
        break;
    }
  };

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {typeOptions.arr.map((arrItem) => (
            <div key={arrItem.id} className="embla__slide">
              {cardRender(arrItem)}
            </div>
          ))}
        </div>
      </div>
      <Button className="embla__prev" onClick={scrollPrev}>
        Prev
      </Button>
      <Button className="embla__next" onClick={scrollNext}>
        Next
      </Button>
    </div>
  );
}
