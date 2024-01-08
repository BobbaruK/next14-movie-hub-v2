import { Header } from "@/components/Header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {
  RQ_CONFIG_ENDPOINT,
  RQ_CONFIG_KEY,
  RQ_LANGUAGES_ENDPOINT,
  RQ_LANGUAGES_KEY,
} from "@/constants";
import MyAPIClient from "@/services/myApiClient";
import { Image_Configuration } from "@/types/TMDB_API_Configuration";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { ReactNode } from "react";
import "../globals.css";
import ReactQueryProvider from "./ReactQueryProvider";
import { Language } from "@/types/movies/Language";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movie HUB APP",
  description:
    "Movie HUB APP is based on The Movie Database (TMDB) wich is a popular, user editable database for movies and TV shows.",
};

interface Props {
  children: ReactNode;
}

export default async function RootLayout({ children }: Props) {
  const queryClient = new QueryClient();

  // Config
  const apiClientConfig = new MyAPIClient<Image_Configuration>(
    RQ_CONFIG_ENDPOINT,
  );

  await queryClient.prefetchQuery({
    queryKey: [RQ_CONFIG_KEY],
    queryFn: () => apiClientConfig.getAll(),
  });

  // Languages
  const apiClientLanguages = new MyAPIClient<Language[]>(RQ_LANGUAGES_ENDPOINT);
  await queryClient.prefetchQuery({
    queryKey: [RQ_LANGUAGES_KEY],
    queryFn: () => apiClientLanguages.getAll(),
  });

  return (
    <html lang="en">
      <body className={inter.className} data-theme="night">
        <ReactQueryProvider>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <div id="siteWrapper">
              <Header />
              <main>{children}</main>
              <Footer />
            </div>
          </HydrationBoundary>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
