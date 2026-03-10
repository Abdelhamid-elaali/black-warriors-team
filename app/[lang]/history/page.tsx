import { getDictionary } from '@/lib/dictionaries';

export const metadata = {
  title: 'History - BLACK WARRIORS',
  description: 'The journey of BLACK WARRIORS from its founding to becoming a dominant force in Free Fire esports.',
};

export default async function HistoryPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const dict = await getDictionary(lang as 'en' | 'fr' | 'ar');
  const t = dict.history;

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-accent">{t.title}</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">{t.description}</p>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-accent via-accent to-transparent" />
          <div className="space-y-12 md:space-y-20">
            {t.timeline.map((event, index) => (
              <div
                key={`${event.year}-${index}`}
                className={`flex gap-8 md:gap-0 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className="w-full md:w-1/2 md:px-8">
                  <div className={`glass p-8 rounded-lg border ${event.highlight ? 'border-accent/50 glow-gold' : 'border-border'} transition-smooth`}>
                    <div className="text-accent font-bold text-sm uppercase tracking-wider mb-2">{event.year}</div>
                    <h3 className="text-2xl font-bold mb-3">{event.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{event.description}</p>
                  </div>
                </div>
                <div className="hidden md:flex w-1/2 justify-center">
                  <div className={`w-4 h-4 rounded-full ${event.highlight ? 'bg-accent' : 'bg-muted'} border-4 border-background z-10`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass p-8 rounded-lg border border-border">
            <div className="text-4xl font-bold text-accent mb-2">5</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wider">{t.elitePlayers}</div>
            <p className="text-muted-foreground mt-4">{t.elitePlayersDesc}</p>
          </div>
          <div className="glass p-8 rounded-lg border border-border">
            <div className="text-4xl font-bold text-accent mb-2">12+</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wider">{t.tournamentsWon}</div>
            <p className="text-muted-foreground mt-4">{t.tournamentsDesc}</p>
          </div>
          <div className="glass p-8 rounded-lg border border-border">
            <div className="text-4xl font-bold text-accent mb-2">4</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wider">{t.yearsExcellence}</div>
            <p className="text-muted-foreground mt-4">{t.yearsDesc}</p>
          </div>
        </div>

        {/* Future Vision */}
        <div className="mt-20 glass rounded-xl border border-border p-12">
          <h2 className="text-3xl font-bold mb-6">{t.visionTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-muted-foreground leading-relaxed">
            <div>
              <p className="mb-4">{t.vision1}</p>
              <p>{t.vision2}</p>
            </div>
            <div>
              <p className="mb-4">{t.vision3}</p>
              <p>{t.vision4}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
