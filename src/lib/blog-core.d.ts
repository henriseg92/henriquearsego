export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated: string | null;
  tags: string[];
  cover: string | null;
  draft: boolean;
  readingTime: number;
  content: string;
  html: string;
}

export const SITE_URL: string;
export const SITE_NAME: string;
export const AUTHOR: string;
export const DEFAULT_IMAGE: string;

export function parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string };
export function slugFromPath(path: string): string;
export function readingTime(markdown: string): number;
export function buildPosts(
  files: Record<string, string>,
  options?: { includeDrafts?: boolean; now?: Date },
): Post[];
export function formatDate(isoDate: string): string;
