// Núcleo do blog — JavaScript puro para ser usado tanto pelo app (Vite)
// quanto pelo script de pré-renderização (Node, scripts/prerender-blog.mjs).
import { marked } from "marked";

export const SITE_URL = "https://henriquearsego.com.br";
export const SITE_NAME = "Henrique Arsego";
export const AUTHOR = "Henrique Arsego";
export const DEFAULT_IMAGE = "/henrique-arsego.jpg";

marked.setOptions({ gfm: true, breaks: false });

/**
 * Lê o bloco de frontmatter (--- ... ---) no topo do arquivo.
 * Suporta `chave: valor`, valores entre aspas, booleanos e listas
 * no formato `tags: [a, b]` ou com itens `- a` nas linhas seguintes.
 */
export function parseFrontmatter(raw) {
  const text = raw.replace(/^﻿/, "").replace(/\r\n/g, "\n");
  const match = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: text };

  const data = {};
  let currentListKey = null;
  for (const line of match[1].split("\n")) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    const item = line.match(/^\s*-\s+(.*)$/);
    if (item && currentListKey) {
      data[currentListKey].push(cleanValue(item[1]));
      continue;
    }
    const kv = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!kv) continue;
    const [, key, value] = kv;
    if (value === "") {
      data[key] = [];
      currentListKey = key;
      continue;
    }
    currentListKey = null;
    if (value.startsWith("[") && value.endsWith("]")) {
      data[key] = value
        .slice(1, -1)
        .split(",")
        .map((v) => cleanValue(v))
        .filter(Boolean);
    } else {
      data[key] = cleanValue(value);
    }
  }
  return { data, content: match[2] };
}

function cleanValue(v) {
  const s = v.trim();
  if (s === "true") return true;
  if (s === "false") return false;
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    return s.slice(1, -1);
  }
  return s;
}

export function slugFromPath(path) {
  return path.split("/").pop().replace(/\.md$/, "");
}

export function readingTime(markdown) {
  const words = markdown.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/**
 * Transforma { caminho: conteúdo bruto } em uma lista de posts
 * ordenada do mais recente para o mais antigo. Posts com
 * `draft: true` ou com data futura ficam de fora.
 */
export function buildPosts(files, { includeDrafts = false, now = new Date() } = {}) {
  const posts = Object.entries(files).map(([path, raw]) => {
    const { data, content } = parseFrontmatter(raw);
    const slug = data.slug || slugFromPath(path);
    if (!data.title) throw new Error(`Post "${slug}" sem "title" no frontmatter.`);
    if (!data.date) throw new Error(`Post "${slug}" sem "date" no frontmatter.`);
    return {
      slug,
      title: data.title,
      description: data.description || "",
      date: data.date,
      updated: data.updated || null,
      tags: Array.isArray(data.tags) ? data.tags : data.tags ? [data.tags] : [],
      cover: data.cover || null,
      draft: data.draft === true,
      readingTime: readingTime(content),
      content,
      html: marked.parse(content),
    };
  });

  return posts
    .filter((p) => includeDrafts || (!p.draft && new Date(`${p.date}T00:00:00-03:00`) <= now))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function formatDate(isoDate) {
  const [y, m, d] = isoDate.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
