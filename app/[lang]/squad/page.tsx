import { PLAYERS } from '@/data/players';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getDictionary } from '@/lib/dictionaries';

export const metadata = {
  title: 'Squad - BLACK WARRIORS',
  description: 'Meet the elite roster of BLACK WARRIORS Free Fire team.',
};

export default async function SquadPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as 'en' | 'fr' | 'ar');
  const t = dict.squad;

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-accent">{t.title}</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            {t.description}
          </p>
        </div>

        {/* Players Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PLAYERS.map((player) => (
            <Link
              key={player.id}
              href={`/${lang}/players/${player.id}`}
              className="group"
            >
              <div className="glass rounded-xl overflow-hidden border border-border hover:border-accent/30 transition-smooth hover:glow-gold">
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="relative w-full md:w-56 h-56 flex-shrink-0 overflow-hidden">
                    <img
                      src={player.image}
                      alt={player.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="text-xs font-semibold text-accent mb-2 uppercase tracking-wider">
                            {player.role}
                          </div>
                          <h3 className="text-3xl font-bold">{player.nickname}</h3>
                          <p className="text-muted-foreground">{player.name}</p>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed mt-4">
                        {player.bio}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
                      <div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{t.kills}</div>
                        <div className="text-xl font-bold text-accent">{player.stats.kills.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{t.wins}</div>
                        <div className="text-xl font-bold text-accent">{player.stats.wins}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">K/D</div>
                        <div className="text-xl font-bold text-accent">{player.stats.kd.toFixed(1)}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{t.headshots}</div>
                        <div className="text-xl font-bold text-accent">{player.stats.headshots}</div>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-2 text-accent font-semibold mt-6 group-hover:gap-4 transition-all">
                      {t.viewProfile} <ArrowRight size={18} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Team Philosophy */}
        <div className="mt-20 glass rounded-xl border border-border p-12">
          <h2 className="text-3xl font-bold mb-4">{t.teamPhilosophy}</h2>
          <p className="text-muted-foreground max-w-3xl leading-relaxed">
            {t.philosophyText}
          </p>
        </div>
      </div>
    </div>
  );
}
