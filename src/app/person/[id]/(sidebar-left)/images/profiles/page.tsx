interface Props {
  params: {
    id: string;
  };
}

export default function PersonImagesProfiles({ params: { id } }: Props) {
  return (
    <div>
      <h1>Person ({id}) ImagesProfiles</h1>
    </div>
  );
}
