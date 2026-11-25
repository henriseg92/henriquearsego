// Roda depois do `vite build`: gera um HTML estático para /blog e para cada
// post, com título, descrição, Open Graph, canonical e JSON-LD corretos e o
// texto do artigo já no HTML. Assim o Google indexa sem depender de JavaScript
// e o link compartilhado no WhatsApp/LinkedIn mostra a prévia do próprio post.
// O React assume a página normalmente quando o JS carrega.
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  buildPosts,
  formatDate,
  SITE_URL,
  SITE_NAME,
  AUTHOR,
  DEFAULT_IMAGE,
} from "../src/lib/blog-core.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const contentDir = join(root, "content", "blog");

const BLOG_TITLE = "Blog | Henrique Arsego";
const BLOG_DESCRIPTION =
  "Artigos práticos sobre mídia paga, rastreamento de conversões, automação e marketing para negócio local — escritos por Henrique Arsego.";

const esc = (s = "") =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const files = Object.fromEntries(
  readdirSync(contentDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => [`/content/blog/${f}`, readFileSync(join(contentDir, f), "utf8")]),
);
const posts = buildPosts(files);
const template = readFileSync(join(dist, "index.html"), "utf8");

function render({ title, description, path, image, type, jsonLd, body }) {
  const url = `${SITE_URL}${path}`;
  const img = `${SITE_URL}${image || DEFAULT_IMAGE}`;
  const head = [
    `<link rel="canonical" href="${esc(url)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:image" content="${esc(img)}" />`,
    `<meta property="og:site_name" content="${esc(SITE_NAME)}" />`,
    `<meta property="og:locale" content="pt_BR" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<link rel="alternate" type="application/rss+xml" title="${esc(BLOG_TITLE)}" href="${SITE_URL}/blog/rss.xml" />`,
    `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, "\\u003c")}</script>`,
  ].join("\n  ");

  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*(")/, `$1${esc(description)}$2`)
    .replace(/(<meta\s+property="og:title"\s+content=")[^"]*(")/, `$1${esc(title)}$2`)
    .replace(/(<meta\s+property="og:description"\s+content=")[^"]*(")/, `$1${esc(description)}$2`)
    .replace(/(<meta\s+property="og:type"\s+content=")[^"]*(")/, `$1${type}$2`)
    .replace("</head>", `  ${head}\n</head>`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  return html;
}

function write(relPath, html) {
  const out = join(dist, relPath);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
}

// /blog
write(
  "blog/index.html",
  render({
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    path: "/blog",
    type: "website",
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: BLOG_TITLE,
      description: BLOG_DESCRIPTION,
      url: `${SITE_URL}/blog`,
      author: { "@type": "Person", name: AUTHOR, url: SITE_URL },
    },
    body: `<main><h1>Blog — Henrique Arsego</h1><p>${esc(BLOG_DESCRIPTION)}</p><ul>${posts
      .map(
        (p) =>
          `<li><a href="/blog/${p.slug}">${esc(p.title)}</a> — ${esc(p.description)}</li>`,
      )
      .join("")}</ul></main>`,
  }),
);

// /blog/:slug
for (const p of posts) {
  const title = `${p.title} | Henrique Arsego`;
  write(
    `blog/${p.slug}/index.html`,
    render({
      title,
      description: p.description,
      path: `/blog/${p.slug}`,
      image: p.cover,
      type: "article",
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: p.title,
        description: p.description,
        datePublished: p.date,
        dateModified: p.updated || p.date,
        inLanguage: "pt-BR",
        mainEntityOfPage: `${SITE_URL}/blog/${p.slug}`,
        image: `${SITE_URL}${p.cover || DEFAULT_IMAGE}`,
        keywords: p.tags.join(", "),
        author: { "@type": "Person", name: AUTHOR, url: SITE_URL },
        publisher: { "@type": "Person", name: AUTHOR, url: SITE_URL },
      },
      body: `<main><article><h1>${esc(p.title)}</h1><p>${esc(p.description)}</p><p>Por ${AUTHOR} — ${formatDate(
        p.date,
      )}</p>${p.html}</article></main>`,
    }),
  );
}

// sitemap.xml
const urls = [
  { loc: "/", lastmod: null },
  { loc: "/blog", lastmod: posts[0]?.date ?? null },
  ...posts.map((p) => ({ loc: `/blog/${p.slug}`, lastmod: p.updated || p.date })),
  { loc: "/politica-de-privacidade", lastmod: null },
];
write(
  "sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url><loc>${SITE_URL}${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ""}</url>`,
  )
  .join("\n")}
</urlset>
`,
);

// RSS
const rfc822 = (d) => new Date(`${d}T09:00:00-03:00`).toUTCString();
write(
  "blog/rss.xml",
  `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${esc(BLOG_TITLE)}</title>
  <link>${SITE_URL}/blog</link>
  <description>${esc(BLOG_DESCRIPTION)}</description>
  <language>pt-br</language>
  <atom:link href="${SITE_URL}/blog/rss.xml" rel="self" type="application/rss+xml" />
${posts
  .map(
    (p) => `  <item>
    <title>${esc(p.title)}</title>
    <link>${SITE_URL}/blog/${p.slug}</link>
    <guid>${SITE_URL}/blog/${p.slug}</guid>
    <pubDate>${rfc822(p.date)}</pubDate>
    <description>${esc(p.description)}</description>
  </item>`,
  )
  .join("\n")}
</channel>
</rss>
`,
);

console.log(`✓ Blog pré-renderizado: ${posts.length} post(s), sitemap.xml e rss.xml`);
