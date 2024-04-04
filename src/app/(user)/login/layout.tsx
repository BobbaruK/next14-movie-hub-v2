import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const loginLayout = async ({ children }: Props) => {
  // const queryClient = new QueryClient();

  // // Languages
  // const apiClientLanguages = new MyAPIClient<{
  //   success: boolean;
  //   expires_at: string;
  //   request_token: string;
  // }>("/authentication/token/new");
  // await queryClient.prefetchQuery({
  //   queryKey: ["request_token"],
  //   queryFn: () => apiClientLanguages.getAll(),
  //   staleTime: 0,
  // });

  return (
    <div className="container">
      {/* <HydrationBoundary state={dehydrate(queryClient)}> */}
      {children}
      {/* </HydrationBoundary> */}
    </div>
  );
};

export default loginLayout;
