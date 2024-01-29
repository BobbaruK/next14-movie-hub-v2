"use client";

import { RQ_CONFIG_ENDPOINT, RQ_CONFIG_KEY } from "@/constants";
import { cn } from "@/lib/utils";
import MyAPIClient from "@/services/myApiClient";
import { Image_Configuration } from "@/types/TMDB_API_Configuration";
import {
  BackdropSizes,
  LogoSizes,
  PosterSizes,
  ProfileSizes,
  StillSizes,
} from "@/types/imageSizes";
import { useQuery } from "@tanstack/react-query";
import Image, { ImageLoaderProps } from "next/image";
import noImage from "../../public/noimage.svg";

const imageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  return `${src}?w=${width}`;
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  type:
    | {
        type: "backdrop";
        size: BackdropSizes;
      }
    | {
        type: "logo";
        size: LogoSizes;
      }
    | {
        type: "poster";
        size: PosterSizes;
      }
    | {
        type: "profile";
        size: ProfileSizes;
      }
    | {
        type: "still";
        size: StillSizes;
      }
    | {
        type: "other";
      };
  src: string | null;
  alt: string;
  priority?: boolean;
}

const TMDBImages = ({ type, src, alt, priority, ...restProps }: Props) => {
  const apiClientConfig = new MyAPIClient<Image_Configuration>(
    RQ_CONFIG_ENDPOINT,
  );

  const { data: config } = useQuery<Image_Configuration>({
    queryKey: [RQ_CONFIG_KEY],
    queryFn: () => apiClientConfig.getAll(),
  });

  const secureBaseUrl = config?.images.secure_base_url
    ? config.images.secure_base_url
    : "https://image.tmdb.org/t/p/";

  const getOuputSrc = () => {
    if (src && type.type !== "other") return secureBaseUrl + type.size + src;
    if (src && type.type === "other") return src;
    return noImage;
  };

  const outputSrc = getOuputSrc();

  return (
    <>
      <div
        {...restProps}
        className={cn(
          `relative w-full overflow-hidden rounded-md ${restProps.className}`,
        )}
      >
        <Image
          loader={imageLoader}
          src={outputSrc}
          alt={alt}
          // width={width}
          // height={height}
          priority={priority}
          title={alt}
          fill
          className="object-cover"
        />
      </div>
    </>
  );
};

export default TMDBImages;
