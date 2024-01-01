// import { Modal } from "./modal";

import Modal from "@/components/Modal";

interface Props {
  params: {
    id: string;
    image: string;
  };
}

export default function PhotoModal({ params: { id, image } }: Props) {
  return (
    <Modal>
      ImagePage: {image} - {id}
    </Modal>
  );
}
