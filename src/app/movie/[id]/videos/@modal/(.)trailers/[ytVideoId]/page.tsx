import Modal from "@/components/Modal";
import SingleVideo from "@/components/layouts/SingleVideo";

interface Props {
  params: { id: string; ytVideoId: string };
}

const MovieModalTrailersYTVideoId = ({ params: { id, ytVideoId } }: Props) => {
  return (
    <>
      <Modal>
        <SingleVideo />
      </Modal>
    </>
  );
};

export default MovieModalTrailersYTVideoId;
