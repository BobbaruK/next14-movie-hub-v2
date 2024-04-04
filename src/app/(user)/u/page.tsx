interface Props {
  searchParams: {
    session_id: string;
  };
}

const UserPage = async ({ searchParams: { session_id } }: Props) => {
  // const { bears, increasePopulation } = useLoginStore();

  const p = new Promise((resolve, reject) => {
    setInterval(() => {
      resolve("au trecut 2 sec");
    }, 2000);
  });

  const p2 = new Promise((resolve, reject) => {
    setInterval(() => {
      resolve("au trecut 1.5 sec");
    }, 1500);
  });

  // p.then((msg) => console.log(msg)).catch((err) => console.log(err));
  // p2.then((msg) => console.log(msg)).catch((err) => console.log(err));

  Promise.all([p, p2]).then((values) => {
    console.log(values);
  });

  return (
    <div className="container">
      UserPage: {session_id}
      <br />
      {/* bears: {bears} */}
      <br />
      <button
      // onClick={() => {
      //   increasePopulation();
      // }}
      >
        sda
      </button>
    </div>
  );
};

export default UserPage;
