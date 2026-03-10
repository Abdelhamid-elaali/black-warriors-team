import { NEWS } from '@/data/news';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Share2 } from 'lucide-react';

// Generate static params for all known news articles
export function generateStaticParams() {
  return NEWS.map((article) => ({
    id: article.id,
  }));
}

export default async function ArticlePage({ params }: { params: Promise<{ lang: string; id: string }> }) {
  const { lang, id } = await params;
  const article = NEWS.find((n) => n.id === id);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <Link 
          href={`/${lang}/news`} 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to News
        </Link>

        {/* Article Header */}
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
            <span className="px-3 py-1 bg-accent/20 text-accent rounded-full font-semibold">
              {article.category}
            </span>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              {new Date(article.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center justify-between pb-6 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                <User size={20} className="text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground">{article.author}</p>
                <p className="text-xs text-muted-foreground">Author</p>
              </div>
            </div>

            <button className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
              <Share2 size={20} />
            </button>
          </div>
        </header>

        {/* Featured Cover Image */}
        <div className="relative h-[400px] md:h-[500px] w-full mb-12 rounded-2xl overflow-hidden glass border border-border">
          <img 
            src={article.image} 
            alt={article.title} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-invert prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-accent hover:prose-a:text-accent-foreground prose-strong:text-foreground">
          {/* We use a simple paragraph render here since the content in data/news.ts is raw text, 
              but in a real-world scenario with markdown/HTML, you would parse it or use dangerouslySetInnerHTML */}
          {article.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-6 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Action Call to Action Footer */}
        <div className="mt-16 p-8 glass rounded-2xl border border-border bg-gradient-to-r from-background to-secondary/30 flex flex-col items-center text-center">
          <h3 className="text-2xl font-bold mb-3">Enjoyed tracking this update?</h3>
          <p className="text-muted-foreground mb-6">Join the BLACK WARRIORS community on our official recruitment page.</p>
          <Link
            href={`/${lang}/recruitment`}
            className="px-8 py-3 bg-accent text-accent-foreground font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:glow-gold hover:scale-105"
          >
            Become a Warrior
          </Link>
        </div>
      </div>
    </div>
  );
}
