'use client';

import { useTRPC } from "@/trpc/client";
import { useState } from "react";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// server call
// import { caller } from "@/trpc/server";
// const data = await caller.createAI({text:"Abdulrhman SERVER"})  
{/* {JSON.stringify(data)} */}

// import { getQueryClient, trpc } from "@/trpc/server";
// import { HydrationBoundary } from "@tanstack/react-query";
// import { Suspense } from "react";
// import { Client } from "./client";


const Page =() => {
  const[value,setValue] = useState("");
  // const queryClient = getQueryClient();
  // void queryClient.prefetchQuery(trpc.createAI.queryOptions({text:"Abdulrhman PREFETCH"}))
  const trpc = useTRPC()
  const invoke = useMutation(trpc.invoke.mutationOptions({
    onSuccess:() =>{
      toast.success("Background job Started")
    }
  }))
  return (  
    <div className="p-4">
      {/* <HydrationBoundary>
        <Suspense fallback={<p>...Loading</p>}>
          <Client />
        </Suspense>
      </HydrationBoundary> */}
        <Input value={value} onChange={(e) => setValue(e.target.value)}/>

        <Button disabled={invoke.isPending}  onClick={() => invoke.mutate({value:value})}>
          Invoke Background Job
        </Button>
    </div>
  );
}
 
export default Page;