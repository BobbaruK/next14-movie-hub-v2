import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/login/token") {
    // const res: { request_token: string } = await fetch(
    //   `https://api.themoviedb.org/3/authentication/token/new?api_key=${process.env.TMDB_API_KEY}`,
    // ).then((res) => res.json());

    // // console.log(res);

    // // return NextResponse.rewrite(new URL('/about-2', request.url))
    // return NextResponse.redirect(
    //   `https://www.themoviedb.org/authenticate/${res.request_token}?redirect_to=http://localhost:3000/login/session`,
    // );
  }

  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.rewrite(new URL("/dashboard/user", request.url));
  }
}
