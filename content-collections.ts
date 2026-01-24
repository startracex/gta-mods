import { defineCollection, defineConfig } from "@content-collections/core";
import { z } from "zod";

const mods = defineCollection({
  name: "mods",
  directory: "mods",
  include: "**/*.md",
  schema: z.object({
    name: z.string().optional(),
    id: z.string().optional(),
    tags: z.array(z.string()).optional(),
    author: z.string().optional(),
    description: z.string().optional(),
    content: z.string(),
  }),
});

export default defineConfig({
  collections: [mods],
});
