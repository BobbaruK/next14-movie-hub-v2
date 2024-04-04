import TMDBImages from "@/components/TMDBImages";
import MyAPIClient from "@/services/myApiClient";
import { redirect } from "next/navigation";

interface Props {
  searchParams: {
    request_token: string;
  };
}

const CreateSessionIdPage = async ({
  searchParams: { request_token },
}: Props) => {
  // const queryClient = new QueryClient();

  interface SessionIdResponse {
    success: boolean;
    session_id: string;
  }

  interface ProfileResponse {
    avatar: {
      gravatar: { hash: string };
      tmdb: { avatar_path: string };
    };
    id: number;
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    include_adult: boolean;
    username: string;
  }

  const sessionIdPromise = new Promise<SessionIdResponse>((resolve, reject) => {
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: process.env.TMDB_AUTHORIZATION!,
      },
      body: JSON.stringify({
        request_token: request_token,
      }),
    };

    fetch(`https://api.themoviedb.org/3/authentication/session/new`, options)
      .then((res) => res.json())
      .then((res) => {
        resolve(res);
      })
      .catch((err) => reject(err));
  });

  const seshId = (await sessionIdPromise).session_id;

  const profilePromise = new Promise<ProfileResponse>((resolve, reject) => {
    const options = {
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: process.env.TMDB_AUTHORIZATION!,
      },
    };

    fetch(`https://api.themoviedb.org/3/account?session_id=${seshId}`, options)
      .then((res) => res.json())
      .then((res) => {
        resolve(res);
      })
      .catch((err) => reject(err));
  });

  const [session, profile] = await Promise.all([
    sessionIdPromise,
    profilePromise,
  ]);

  console.log(session, profile);

  return (
    <div>
      <h1>CreateSessionIdPage</h1>
      request_token: {request_token} <br />
      session_id: {(await sessionIdPromise).session_id}
      {/* <div>{response.session_id}</div> */}
      <br />
      <br />
      profile name: {profile.name} <br />
      profile username: {profile.username} <br />
      profile id: {profile.id} <br />
      profile include adult: {profile.include_adult ? "true" : "false"} <br />
      profile avatar:
      {/* <TMDBImages
        type={"profile"}
        src={profile.avatar.tmdb.avatar_path}
        alt={""}
        sizes={""}
        className="h-20 w-20 rounded-full"
      /> */}
      <br />
    </div>
  );
};

export default CreateSessionIdPage;
