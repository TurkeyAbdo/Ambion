// server call
// import { caller } from "@/trpc/server";
// const data = await caller.createAI({text:"Abdulrhman SERVER"})  
{/* {JSON.stringify(data)} */}

import { getQueryClient, trpc } from "@/trpc/server";
import { HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { Client } from "./client";


const Page = async () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.createAI.queryOptions({text:"Abdulrhman PREFETCH"}))

  return (  
    <div >
      <HydrationBoundary>
        <Suspense fallback={<p>...Loading</p>}>
          <Client />
        </Suspense>
      </HydrationBoundary>
    </div>
  );
}
 
export default Page;