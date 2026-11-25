import { buildPosts, type Post } from "./blog-core";

// Todos os arquivos .md em /content/blog entram no bundle como texto.
const files = import.meta.glob("/content/blog/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

// Em `npm run dev` os rascunhos aparecem, para você revisar antes de publicar.
export const posts: Post[] = buildPosts(files, { includeDrafts: import.meta.env.DEV });

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export type { Post };
