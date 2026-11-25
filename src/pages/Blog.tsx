import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import Header from "@/components/0Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { posts } from "@/lib/blog";
import { formatDate } from "@/lib/blog-core";
import { useSeo } from "@/hooks/use-seo";

export const BLOG_TITLE = "Blog | Henrique Arsego";
export const BLOG_DESCRIPTION =
  "Artigos práticos sobre mídia paga, rastreamento de conversões, automação e marketing para negócio local — escritos por Henrique Arsego.";

const Blog = () => {
  useSeo({ title: BLOG_TITLE, description: BLOG_DESCRIPTION, path: "/blog" });
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="min-h-screen bg-background">
      <Header showBlogLink />
      <main className="pt-28 pb-24 lg:pt-36">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <header className="space-y-4 mb-14">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Blog</p>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight">
                Marketing que dá para medir
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">{BLOG_DESCRIPTION}</p>
            </header>

            {posts.length === 0 ? (
              <p className="text-muted-foreground">Nenhum artigo publicado ainda.</p>
            ) : (
              <ul className="space-y-6">
                {posts.map((post) => (
                  <li key={post.slug}>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="group block card-elevated rounded-2xl p-6 md:p-8 border border-white/5 hover:border-accent/30 transition-colors"
                    >
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono text-muted-foreground/80 mb-3">
                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {post.readingTime} min de leitura
                        </span>
                        {post.draft && (
                          <span className="rounded-full bg-amber-500/15 text-amber-400 px-2 py-0.5">rascunho</span>
                        )}
                      </div>
                      <h2 className="font-display text-xl md:text-2xl font-semibold text-foreground tracking-tight group-hover:text-accent transition-colors">
                        {post.title}
                      </h2>
                      {post.description && (
                        <p className="mt-3 text-muted-foreground leading-relaxed">{post.description}</p>
                      )}
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent">
                        Ler artigo
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Blog;
