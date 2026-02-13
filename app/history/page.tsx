export const metadata = {
  title: 'History - BLACK WARRIORS',
  description: 'The journey of BLACK WARRIORS from its founding to becoming a dominant force in Free Fire esports.',
};

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  highlight?: boolean;
}

const TIMELINE: TimelineEvent[] = [
  {
    year: '2021',
    title: 'Foundation & Vision',
    description: 'BLACK WARRIORS is founded by Vikram Patel (CIPHER) with a mission to establish Asia\'s premier Free Fire esports organization. The organization begins with intensive recruitment and training protocols.',
    highlight: true,
  },
  {
    year: '2022',
    title: 'First Championship',
    description: 'The newly assembled roster claims their first major tournament victory, announcing BLACK WARRIORS as a force to be reckoned with in competitive Free Fire.',
  },
  {
    year: '2022',
    title: 'Regional Expansion',
    description: 'BLACK WARRIORS establishes training facilities across three major cities in Asia, implementing world-class coaching and sports science programs.',
  },
  {
    year: '2023',
    title: 'Youth Academy Launch',
    description: 'The organization launches its academy program to identify and develop emerging talent from the broader gaming community.',
  },
  {
    year: '2023',
    title: 'International Recognition',
    description: 'BLACK WARRIORS begins competing in international tournaments, establishing themselves as one of Asia\'s best teams on the global stage.',
  },
  {
    year: '2024',
    title: 'Record Breaking Season',
    description: 'The organization sets multiple tournament records, including SHADOW\'s all-time seasonal kill record of 1,247 eliminations.',
    highlight: true,
  },
  {
    year: '2024',
    title: 'Media & Sponsorship Growth',
    description: 'Partnership with major sponsors and extensive media coverage brings BLACK WARRIORS into mainstream recognition.',
  },
  {
    year: '2025',
    title: 'Squad Completion & Dominance',
    description: 'APEX joins the roster, completing the five-player squad. BLACK WARRIORS secures Asia Cup 2025 championship with dominant performance.',
    highlight: true,
  },
];

export default function HistoryPage() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Our <span className="text-accent">History</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            From a bold vision to becoming Asia's dominant Free Fire esports organization. This is the journey of BLACK WARRIORS.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-accent via-accent to-transparent" />

          {/* Timeline Events */}
          <div className="space-y-12 md:space-y-20">
            {TIMELINE.map((event, index) => (
              <div
                key={`${event.year}-${index}`}
                className={`flex gap-8 md:gap-0 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Content */}
                <div className="w-full md:w-1/2 md:px-8">
                  <div className={`glass p-8 rounded-lg border ${
                    event.highlight
                      ? 'border-accent/50 glow-gold'
                      : 'border-border'
                  } transition-smooth`}>
                    <div className="text-accent font-bold text-sm uppercase tracking-wider mb-2">
                      {event.year}
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{event.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className="hidden md:flex w-1/2 justify-center">
                  <div className={`w-4 h-4 rounded-full ${
                    event.highlight ? 'bg-accent' : 'bg-muted'
                  } border-4 border-background z-10`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass p-8 rounded-lg border border-border">
            <div className="text-4xl font-bold text-accent mb-2">5</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wider">
              Elite Players
            </div>
            <p className="text-muted-foreground mt-4">
              The most skilled roster in competitive Free Fire, hand-selected and trained by the best coaching staff.
            </p>
          </div>

          <div className="glass p-8 rounded-lg border border-border">
            <div className="text-4xl font-bold text-accent mb-2">12+</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wider">
              Major Tournaments Won
            </div>
            <p className="text-muted-foreground mt-4">
              Championship titles spanning regional and international competitions, establishing our dominance.
            </p>
          </div>

          <div className="glass p-8 rounded-lg border border-border">
            <div className="text-4xl font-bold text-accent mb-2">4</div>
            <div className="text-sm text-muted-foreground uppercase tracking-wider">
              Years of Excellence
            </div>
            <p className="text-muted-foreground mt-4">
              Since 2021, we've been pushing the boundaries of competitive gaming in Asia.
            </p>
          </div>
        </div>

        {/* Future Vision */}
        <div className="mt-20 glass rounded-xl border border-border p-12">
          <h2 className="text-3xl font-bold mb-6">Our Vision for 2025 & Beyond</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-muted-foreground leading-relaxed">
            <div>
              <p className="mb-4">
                BLACK WARRIORS is not just a team—we're a movement toward excellence in esports. Our vision extends beyond winning tournaments; we aim to elevate the entire competitive gaming ecosystem in Asia.
              </p>
              <p>
                We're committed to developing the next generation of esports talent, creating opportunities for emerging players, and proving that Asian teams can dominate on the world stage.
              </p>
            </div>
            <div>
              <p className="mb-4">
                Through innovation in training methodologies, investment in sports science, and community engagement, BLACK WARRIORS will continue to set the standard for what it means to be a championship esports organization.
              </p>
              <p>
                The future is ours. The legends are being written. Join us on this incredible journey.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
