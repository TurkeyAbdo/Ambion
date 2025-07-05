
import {  gemini, createAgent } from "@inngest/agent-kit";
import {Sandbox} from "@e2b/code-interpreter"

import { inngest } from "./client";
import { getSandboxUrl } from "./utils";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step}) => {

    const sandboxId = await step.run("get-sandbox-id", async () => {
      const sandbox = await Sandbox.create("ambion-nextjs-test2");
      return sandbox.sandboxId
    })

    const codeAgent = createAgent({
      name: "code-agent",
      system: "You are an expert next.js devleoper. You write readable, maintainable, and efficient code. You are also an expert in TypeScript, you write simple Next.js $ React snippets",
      model: gemini({ model: "gemini-1.5-flash" }),
    });

    const { output } = await codeAgent.run(
      `Write the following snippet: ${event.data.value}`,
    );

    const sandboxUrl = await step.run("get-sandbox-url", async () => {
      const sandbox = await getSandboxUrl(sandboxId)
      const host = sandbox.getHost(3000);
      return `http://${host}`;
    })


    return { output, sandboxUrl};
  }
);


