import React from "react";

interface Props {
  params: {
    user: string;
  };
}

const UserPage = ({ params: { user } }: Props) => {
  return <div className="container">UserPage: {user}</div>;
};

export default UserPage;
