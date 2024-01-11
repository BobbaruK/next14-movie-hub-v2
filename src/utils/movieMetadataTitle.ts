import releaseDateUI from "../utils/releaseDateUI";

const movieMetadataTitle = (
  title: string,
  releaseDate?: string | null,
  page?: string | null,
) => {
  if (page && releaseDate) {
    const { year } = releaseDateUI(releaseDate);
    return `${title} (${year}) | ${page}`;
  }

  if (page) {
    return `${title} | ${page}`;
  }

  if (releaseDate) {
    const { year } = releaseDateUI(releaseDate);
    return `${title} (${year})`;
  }

  return `${title}`;
};

export default movieMetadataTitle;
