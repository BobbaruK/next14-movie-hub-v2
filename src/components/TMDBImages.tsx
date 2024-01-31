import { cn } from "@/lib/utils";
import {
  BackdropSizes,
  LogoSizes,
  PosterSizes,
  ProfileSizes,
  StillSizes,
} from "@/types/imageSizes";
import Image, { ImageLoaderProps } from "next/image";
import noImage from "../../public/noimage.svg";
import { ImagesType } from "@/types/ImagesResponse";

const secureBaseUrl = "https://image.tmdb.org/t/p/";

const backdropImageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  if (src === noImage.src) return src + "?w=" + width;

  const sizeSmallerThen300: BackdropSizes = "w300";
  const sizeSmallerThen780: BackdropSizes = "w780";
  const sizeSmallerThen1280: BackdropSizes = "w1280";
  const sizeSmallerThenOriginal: BackdropSizes = "original";

  if (width <= 300)
    return (
      secureBaseUrl +
      sizeSmallerThen300 +
      src +
      `?device_width=${width}&screen_size=${sizeSmallerThen300}`
    );

  if (width > 300 && width <= 780)
    return (
      secureBaseUrl +
      sizeSmallerThen780 +
      src +
      `?device_width=${width}&screen_size=${sizeSmallerThen780}`
    );

  if (width > 780 && width <= 1280)
    return (
      secureBaseUrl +
      sizeSmallerThen1280 +
      src +
      `?device_width=${width}&screen_size=${sizeSmallerThen1280}`
    );

  return (
    secureBaseUrl +
    sizeSmallerThenOriginal +
    `${src}?device_width=${width}original`
  );
};

const logoImageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  // const srcSVG = src.replace(".png", ".svg");
  // not all logos are svgs
  const srcSVG = src;

  if (srcSVG === noImage.src) return srcSVG + "?w=" + width;

  const sizeSmallerThen45: LogoSizes = "w45";
  const sizeSmallerThen92: LogoSizes = "w92";
  const sizeSmallerThen154: LogoSizes = "w154";
  const sizeSmallerThen185: LogoSizes = "w185";
  const sizeSmallerThen300: LogoSizes = "w300";
  const sizeSmallerThen500: LogoSizes = "w500";
  const sizeSmallerThenOriginal: LogoSizes = "original";

  if (width <= 45)
    return (
      secureBaseUrl +
      sizeSmallerThen45 +
      srcSVG +
      `?device_width=${width}&screen_size=${sizeSmallerThen45}`
    );

  if (width > 45 && width <= 92)
    return (
      secureBaseUrl +
      sizeSmallerThen92 +
      srcSVG +
      `?device_width=${width}&screen_size=${sizeSmallerThen92}`
    );

  if (width > 92 && width <= 154)
    return (
      secureBaseUrl +
      sizeSmallerThen154 +
      srcSVG +
      `?device_width=${width}&screen_size=${sizeSmallerThen154}`
    );

  if (width > 154 && width <= 185)
    return (
      secureBaseUrl +
      sizeSmallerThen185 +
      srcSVG +
      `?device_width=${width}&screen_size=${sizeSmallerThen185}`
    );

  if (width > 185 && width <= 300)
    return (
      secureBaseUrl +
      sizeSmallerThen300 +
      srcSVG +
      `?device_width=${width}&screen_size=${sizeSmallerThen300}`
    );

  if (width > 300 && width <= 500)
    return (
      secureBaseUrl +
      sizeSmallerThen500 +
      srcSVG +
      `?device_width=${width}&screen_size=${sizeSmallerThen500}`
    );

  return (
    secureBaseUrl +
    sizeSmallerThenOriginal +
    `${srcSVG}?device_width=${width}original`
  );
};

const posterImageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  if (src === noImage.src) return src + "?w=" + width;

  const sizeSmallerThen92: PosterSizes = "w92";
  const sizeSmallerThen154: PosterSizes = "w154";
  const sizeSmallerThen256: PosterSizes = "w185";
  const sizeSmallerThen342: PosterSizes = "w342";
  const sizeSmallerThen500: PosterSizes = "w500";
  const sizeSmallerThen780: PosterSizes = "w780";
  const sizeSmallerThenOriginal: PosterSizes = "original";

  if (width <= 92)
    return (
      secureBaseUrl +
      sizeSmallerThen92 +
      src +
      `?device_width=${width}&screen_size=${sizeSmallerThen92}`
    );

  if (width > 92 && width <= 154)
    return (
      secureBaseUrl +
      sizeSmallerThen154 +
      src +
      `?device_width=${width}&screen_size=${sizeSmallerThen154}`
    );

  if (width > 154 && width <= 342)
    return (
      secureBaseUrl +
      sizeSmallerThen256 +
      src +
      `?device_width=${width}&screen_size=${sizeSmallerThen256}`
    );

  if (width > 342 && width <= 500)
    return (
      secureBaseUrl +
      sizeSmallerThen342 +
      src +
      `?device_width=${width}&screen_size=${sizeSmallerThen342}`
    );

  if (width > 500 && width <= 780)
    return (
      secureBaseUrl +
      sizeSmallerThen500 +
      src +
      `?device_width=${width}&screen_size=${sizeSmallerThen500}`
    );

  if (width > 780 && width <= 992)
    return (
      secureBaseUrl +
      sizeSmallerThen780 +
      src +
      `?device_width=${width}&screen_size=${sizeSmallerThen780}`
    );

  return (
    secureBaseUrl +
    sizeSmallerThenOriginal +
    src +
    `?device_width=${width}&screen_size=${sizeSmallerThenOriginal}`
  );
};

const profileImageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  if (src === noImage.src) return src + "?w=" + width;

  const sizeSmallerThen45: ProfileSizes = "w45";
  const sizeSmallerThen185: ProfileSizes = "w185";
  const sizeSmallerThenH632: ProfileSizes = "h632";
  const sizeSmallerThenOriginal: ProfileSizes = "original";

  if (width <= 45)
    return (
      secureBaseUrl +
      sizeSmallerThen45 +
      src +
      `?device_width=${width}&screen_size=${sizeSmallerThen45}`
    );

  if (width > 45 && width <= 185)
    return (
      secureBaseUrl +
      sizeSmallerThen185 +
      src +
      `?device_width=${width}&screen_size=${sizeSmallerThen185}`
    );

  if (width > 185 && width <= 632)
    return (
      secureBaseUrl +
      sizeSmallerThenH632 +
      src +
      `?device_width=${width}&screen_size=${sizeSmallerThenH632}`
    );

  return (
    secureBaseUrl +
    sizeSmallerThenOriginal +
    `${src}?device_width=${width}original`
  );
};

const stillImageLoader = ({ src, width, quality }: ImageLoaderProps) => {
  if (src === noImage.src) return src + "?w=" + width;

  const sizeSmallerThen92: StillSizes = "w92";
  const sizeSmallerThen185: StillSizes = "w185";
  const sizeSmallerThen300: StillSizes = "w300";
  const sizeSmallerThenOriginal: StillSizes = "original";

  if (width <= 92)
    return (
      secureBaseUrl +
      sizeSmallerThen92 +
      src +
      `?device_width=${width}&screen_size=${sizeSmallerThen92}`
    );

  if (width > 92 && width <= 185)
    return (
      secureBaseUrl +
      sizeSmallerThen185 +
      src +
      `?device_width=${width}&screen_size=${sizeSmallerThen185}`
    );

  if (width > 185 && width <= 300)
    return (
      secureBaseUrl +
      sizeSmallerThen300 +
      src +
      `?device_width=${width}&screen_size=${sizeSmallerThen300}`
    );

  return (
    secureBaseUrl +
    sizeSmallerThenOriginal +
    `${src}?device_width=${width}original`
  );
};

const imageLoader = ({ src, width, quality }: ImageLoaderProps) =>
  src + `?device_width=${width}&screen_size=original`;

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  type: ImagesType;
  src: string | null;
  alt: string;
  sizes: string;
  priority?: boolean;
}

const TMDBImages = ({
  type,
  src,
  alt,
  sizes,
  priority,
  ...restProps
}: Props) => {
  // TODO: a lot of shit here

  const customLoader = ({ src, width, quality }: ImageLoaderProps) => {
    switch (type) {
      case "backdrop":
        return backdropImageLoader({ src, width, quality });

      case "logo":
        return logoImageLoader({ src, width, quality });

      case "poster":
        return posterImageLoader({ src, width, quality });

      case "profile":
        return profileImageLoader({ src, width, quality });

      case "still":
        return stillImageLoader({ src, width, quality });

      case "other":
        return imageLoader({ src, width, quality });

      default:
        return imageLoader({ src, width, quality });
    }
  };

  // Pixel GIF code adapted from https://stackoverflow.com/a/33919020/266535
  const keyStr =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

  const triplet = (e1: number, e2: number, e3: number) =>
    keyStr.charAt(e1 >> 2) +
    keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
    keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
    keyStr.charAt(e3 & 63);

  const rgbDataURL = (r: number, g: number, b: number) =>
    `data:image/gif;base64,R0lGODlhAQABAPAA${
      triplet(0, r, g) + triplet(b, 255, 255)
    }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;

  return (
    <>
      <div
        {...restProps}
        className={cn(
          `relative w-full overflow-hidden rounded-lg ${restProps.className || ""}`,
        )}
      >
        <Image
          loader={customLoader}
          src={src || noImage}
          alt={alt}
          priority={priority}
          title={alt}
          fill
          className="object-cover"
          sizes={sizes}
          placeholder="blur"
          blurDataURL={rgbDataURL(37, 181, 6)}
        />
      </div>
    </>
  );
};

export default TMDBImages;
