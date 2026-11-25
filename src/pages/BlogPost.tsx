import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import Header from "@/components/0Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { getPost } from "@/lib/blog";
import { formatDate } from "@/lib/blog-core";
import { useSeo } from "@/hooks/use-seo";
import NotFound from "./NotFound";

const WHATSAPP_LINK =
  "https://wa.me/5551996719696?text=Olá! Li um artigo no seu blog e queria conversar sobre o marketing da minha empresa.";

const BlogPost = () => {
  const { slug = "" } = useParams();
  const post = getPost(slug);

  useSeo({
    title: post ? `${post.title} | Henrique Arsego` : "Artigo não encontrado | Henrique Arsego",
    description: post?.description,
    path: `/blog/${slug}`,
    image: post?.cover,
    type: "article",
  });
  useEffect(() => window.scrollTo(0, 0), [slug]);

  if (!post) return <NotFound />;

  return (
    <div className="min-h-screen bg-background">
      <Header showBlogLink />
      <main className="pt-28 pb-24 lg:pt-36">
        <div className="container">
          <article className="max-w-3xl mx-auto">
            <header className="space-y-5 mb-12">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Todos os artigos
              </Link>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight leading-[1.1]">
                {post.title}
              </h1>
              {post.description && (
                <p className="text-lg text-muted-foreground leading-relaxed">{post.description}</p>
              )}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono text-muted-foreground/80">
                <span>Por Henrique Arsego</span>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readingTime} min de leitura
                </span>
              </div>
              {post.cover && (
                <img src={post.cover} alt="" className="w-full rounded-2xl border border-white/5 mt-6" />
              )}
            </header>

            <div className="blog-prose" dangerouslySetInnerHTML={{ __html: post.html }} />

            {post.tags.length > 0 && (
              <ul className="mt-12 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <li key={tag} className="rounded-full bg-secondary px-3 py-1 text-xs font-mono text-muted-foreground">
                    {tag}
                  </li>
                ))}
              </ul>
            )}

            <aside className="mt-16 card-elevated rounded-2xl p-8 border border-accent/20 text-center space-y-4">
              <h2 className="font-display text-2xl font-semibold text-foreground tracking-tight">
                Quer aplicar isso no seu negócio?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Me chama no WhatsApp e me conta como está o seu marketing hoje. Eu te digo, sem
                compromisso, por onde eu começaria.
              </p>
              <Button variant="cta" size="lg" asChild>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  Chamar no WhatsApp
                </a>
              </Button>
            </aside>
          </article>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default BlogPost;
