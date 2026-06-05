import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

/**
 * Markdown-driven changelog. Drop a `content/changelog/*.md` file with
 * `version`, `date`, and optional `title` frontmatter; the body is authored as
 * plain markdown (### Added / Changed / Fixed) and rendered to HTML at build
 * time. Entries are returned newest-first.
 */
const CHANGELOG_DIR = path.join(process.cwd(), "content", "changelog");

export type ChangelogEntry = {
  slug: string;
  version: string;
  date: string; // ISO (YYYY-MM-DD)
  title?: string;
  html: string;
};

export function getChangelog(): ChangelogEntry[] {
  const files = fs
    .readdirSync(CHANGELOG_DIR)
    .filter((file) => file.endsWith(".md"));

  const entries = files.map((file): ChangelogEntry => {
    const raw = fs.readFileSync(path.join(CHANGELOG_DIR, file), "utf8");
    const { data, content } = matter(raw);
    return {
      slug: file.replace(/\.md$/, ""),
      version: String(data.version),
      date: String(data.date),
      title: data.title ? String(data.title) : undefined,
      html: marked.parse(content, { async: false }),
    };
  });

  return entries.sort((a, b) => +new Date(b.date) - +new Date(a.date));
}
