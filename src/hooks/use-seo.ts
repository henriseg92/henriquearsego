import { useEffect } from "react";
import { DEFAULT_IMAGE, SITE_URL } from "@/lib/blog-core";

interface SeoOptions {
  title: string;
  description?: string;
  path: string;
  image?: string | null;
  type?: "website" | "article";
}

const setMeta = (attr: "name" | "property", key: string, value: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
};

/**
 * Atualiza título e meta tags durante a navegação dentro do app.
 * (Para robôs e prévias de link, o HTML estático gerado no build
 * já traz essas tags — ver scripts/prerender-blog.mjs.)
 */
export const useSeo = ({ title, description, path, image, type = "website" }: SeoOptions) => {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    const img = `${SITE_URL}${image || DEFAULT_IMAGE}`;
    document.title = title;
    if (description) {
      setMeta("name", "description", description);
      setMeta("property", "og:description", description);
    }
    setMeta("property", "og:title", title);
    setMeta("property", "og:url", url);
    setMeta("property", "og:type", type);
    setMeta("property", "og:image", img);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [title, description, path, image, type]);
};
