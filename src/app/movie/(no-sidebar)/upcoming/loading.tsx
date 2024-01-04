export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <>
      <div className="appContaier flex flex-col gap-8 lg:flex-row">
        <p className="flex items-center justify-center gap-4">
          Loading Upcoming movies...
          <span className="loading loading-infinity loading-lg"></span>
        </p>
      </div>
    </>
  );
}
