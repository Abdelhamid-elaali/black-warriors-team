import { NEWS } from '@/data/news';
import Link from 'next/link';
import { ArrowRight, Calendar, User } from 'lucide-react';

export const metadata = {
  title: 'News & Updates - BLACK WARRIORS',
  description: 'Latest news, tournament updates, and stories from BLACK WARRIORS esports team.',
};

export default function NewsPage() {
  const categories = ['All', ...new Set(NEWS.map((n) => n.category))];

  // Sort news by date (newest first)
  const sortedNews = [...NEWS].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Latest <span className="text-accent">News & Updates</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Stay updated with tournament results, team announcements, player highlights, and exclusive behind-the-scenes content from BLACK WARRIORS.
          </p>
        </div>

        {/* Featured Article */}
        {sortedNews.length > 0 && (
          <Link href={`/news/${sortedNews[0].id}`} className="group mb-16 block">
            <div className="glass rounded-xl overflow-hidden border border-border hover:border-accent/30 transition-smooth hover:glow-gold">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                {/* Image */}
                <div className="relative h-64 md:h-96 overflow-hidden">
                  <img
                    src={sortedNews[0].image}
                    alt={sortedNews[0].title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-8 md:p-12 flex flex-col justify-between">
                  <div>
                    <span className="inline-block px-3 py-1 bg-accent/20 text-accent rounded-full text-xs font-semibold mb-4">
                      {sortedNews[0].category}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                      {sortedNews[0].title}
                    </h2>
                    <p className="text-muted-foreground text-lg mb-6">
                      {sortedNews[0].excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-border">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        {new Date(sortedNews[0].date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </div>
                      <div className="flex items-center gap-2">
                        <User size={16} />
                        {sortedNews[0].author}
                      </div>
                    </div>
                    <div className="text-accent font-semibold flex items-center gap-2 group-hover:gap-4 transition-all">
                      Read More <ArrowRight size={18} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Articles Grid */}
        <div>
          <h2 className="text-2xl font-bold mb-8">More Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedNews.slice(1).map((article) => (
              <Link key={article.id} href={`/news/${article.id}`} className="group h-full">
                <div className="glass rounded-lg border border-border hover:border-accent/30 transition-smooth hover:glow-gold overflow-hidden h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <span className="inline-block px-2 py-1 bg-accent/20 text-accent rounded text-xs font-semibold mb-3">
                        {article.category}
                      </span>
                      <h3 className="font-bold text-lg leading-snug mb-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {article.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-border mt-4">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <time>
                          {new Date(article.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </time>
                        <span className="text-accent font-semibold group-hover:text-opacity-80 transition-colors">
                          Read →
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
