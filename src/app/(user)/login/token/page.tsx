import React from "react";
import { redirect } from "next/navigation";

const RequestTokenPage = async () => {
  const res: { request_token: string } = await fetch(
    `https://api.themoviedb.org/3/authentication/token/new?api_key=${process.env.TMDB_API_KEY}`,
    { cache: "no-cache" , },
  ).then((res) => res.json());

  redirect(
    `https://www.themoviedb.org/authenticate/${res.request_token}?redirect_to=http://localhost:3000/login/session`,
  );

  return <div>Request Token...</div>;
};

export default RequestTokenPage;
