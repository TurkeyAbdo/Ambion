
import {  gemini, createAgent } from "@inngest/agent-kit";




import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event }) => {
    const codeAgent = createAgent({
      name: "code-agent",
      system: "You are an expert next.js devleoper. You write readable, maintainable, and efficient code. You are also an expert in TypeScript, you write simple Next.js $ React snippets",
      model: gemini({ model: "gemini-1.5-flash" }),
    });

    const { output } = await codeAgent.run(
      `Write the following snippet: ${event.data.value}`,
    );


    return { output };
  }
);


