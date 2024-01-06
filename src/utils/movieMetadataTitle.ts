import releaseDateUI from "../utils/releaseDateUI";

const movieMetadataTitle = (
  title: string,
  releaseDate: string,
  page?: string
) => {
  const { year } = releaseDateUI(releaseDate);

  if (page) return `${title} (${year}) | ${page}`;

  return `${title} (${year})`;
};

export default movieMetadataTitle;
