import { PLAYERS } from '@/data/players';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Instagram, Facebook, Youtube } from 'lucide-react';

interface Props {
  params: Promise<{ lang: string; id: string }>;
}

export async function generateStaticParams() {
  return PLAYERS.map((player) => ({
    id: player.id,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const player = PLAYERS.find((p) => p.id === id);

  if (!player) {
    return {
      title: 'Player Not Found',
    };
  }

  return {
    title: `${player.nickname} - BLACK WARRIORS`,
    description: `${player.name} | ${player.role} | BLACK WARRIORS esports team`,
  };
}

export default async function PlayerPage({ params }: Props) {
  const { lang, id } = await params;
  const player = PLAYERS.find((p) => p.id === id);

  if (!player) {
    notFound();
  }

  const otherPlayers = PLAYERS.filter((p) => p.id !== id).slice(0, 3);

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link
          href={`/${lang}/squad`}
          className="inline-flex items-center gap-2 text-accent font-semibold hover:gap-4 transition-all mb-8"
        >
          <ArrowLeft size={20} /> Back to Squad
        </Link>

        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          {/* Image */}
          <div className="relative">
            <div className="relative aspect-square rounded-xl overflow-hidden">
              <img
                src={player.image}
                alt={player.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
              <div className="text-xs font-semibold text-accent mb-2 uppercase tracking-wider">
                {player.role}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                {player.nickname}
              </h1>
              <p className="text-xl text-gray-300">{player.name}</p>
            </div>
          </div>

          {/* Info Section */}
          <div className="flex flex-col justify-center">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4">About</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {player.bio}
              </p>
            </div>

            {/* Joined Date */}
            <div className="glass p-6 rounded-lg border border-border mb-8">
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                Joined BLACK WARRIORS
              </div>
              <div className="text-2xl font-bold text-accent">
                {new Date(player.joinDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                })}
              </div>
            </div>

            {/* Social Links */}
            {(player.social.instagram || player.social.twitch || player.social.youtube) && (
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
                  Follow {player.nickname}
                </h3>
                <div className="flex gap-3">
                  {player.social.instagram && (
                    <a
                      href={`https://instagram.com/${player.social.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-muted rounded-lg transition-smooth hover:bg-accent hover:text-accent-foreground"
                      aria-label="Instagram"
                    >
                      <Instagram size={20} />
                    </a>
                  )}
                  {player.social.youtube && (
                    <a
                      href={`https://youtube.com/@${player.social.youtube}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-muted rounded-lg transition-smooth hover:bg-accent hover:text-accent-foreground"
                      aria-label="YouTube"
                    >
                      <Youtube size={20} />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8">Performance Stats</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glass p-6 rounded-lg border border-border text-center">
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                Total Kills
              </div>
              <div className="text-4xl font-bold text-accent">
                {player.stats.kills.toLocaleString()}
              </div>
            </div>
            <div className="glass p-6 rounded-lg border border-border text-center">
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                Tournament Wins
              </div>
              <div className="text-4xl font-bold text-accent">
                {player.stats.wins}
              </div>
            </div>
            <div className="glass p-6 rounded-lg border border-border text-center">
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                Kill/Death Ratio
              </div>
              <div className="text-4xl font-bold text-accent">
                {player.stats.kd.toFixed(1)}
              </div>
            </div>
            <div className="glass p-6 rounded-lg border border-border text-center">
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                Headshots
              </div>
              <div className="text-4xl font-bold text-accent">
                {player.stats.headshots}
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        {player.achievements.length > 0 && (
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-8">Key Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {player.achievements.map((achievement, idx) => (
                <div
                  key={idx}
                  className="glass p-6 rounded-lg border border-border hover:border-accent/30 transition-smooth"
                >
                  <div className="text-sm text-accent font-semibold mb-2">
                    Achievement {idx + 1}
                  </div>
                  <p className="text-lg font-semibold">{achievement}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* More Squad Members */}
        <div className="border-t border-border pt-20">
          <h2 className="text-3xl font-bold mb-8">Meet the Rest of the Squad</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherPlayers.map((teammate) => (
              <Link
                key={teammate.id}
                href={`/${lang}/players/${teammate.id}`}
                className="group"
              >
                <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
                  <img
                    src={teammate.image}
                    alt={teammate.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1">{teammate.nickname}</h3>
                <p className="text-sm text-muted-foreground">{teammate.role}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
