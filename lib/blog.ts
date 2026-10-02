import "server-only";

import fs from "node:fs/promises";
import path from "node:path";
import type { BlogArticle } from "@/lib/types";

function parseFrontmatter(source: string) {
  const match = /^---\n([\s\S]*?)\n---/.exec(source);
  if (!match) return {};

  return Object.fromEntries(
    match[1]
      .split("\n")
      .map((line) => {
        const separator = line.indexOf(":");
        return separator > -1
          ? [line.slice(0, separator).trim(), line.slice(separator + 1).trim()]
          : [line, ""];
      }),
  );
}

export async function getBlogArticles(): Promise<BlogArticle[]> {
  const directory = path.join(process.cwd(), "content", "blog");
  const files = await fs.readdir(directory);
  const articles = await Promise.all(
    files
      .filter((file) => file.endsWith(".mdx"))
      .map(async (file) => {
        const source = await fs.readFile(path.join(directory, file), "utf8");
        const data = parseFrontmatter(source);
        return {
          slug: file.replace(/\.mdx$/, ""),
          title: data.title || "Untitled",
          excerpt: data.excerpt || "",
          category: data.category || "Travel",
          date: data.date || "",
          readTime: data.readTime || "5 min read",
          image: data.image || "/images/maasai-mara.jpg",
          imageAlt: data.imageAlt || data.title || "Tembo travel story",
        };
      }),
  );

  return articles.sort((a, b) => b.date.localeCompare(a.date));
}
