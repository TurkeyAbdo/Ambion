import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    // imagine your doing 
    await step.sleep("wait-a-moment", "20s"); // you can increase the running time
    await step.sleep("wait-a-moment", "10s"); // you can increase the running time
    await step.sleep("wait-a-moment", "5s"); // you can increase the running time
    return { message: `Hello ${event.data.email}!` };
  },
);
