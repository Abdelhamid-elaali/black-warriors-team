export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: 'Tournament' | 'Team Update' | 'Player Focus' | 'Media' | 'Community';
  image: string;
  author: string;
}

export const NEWS: NewsArticle[] = [
  {
    id: '1',
    title: 'BLACK WARRIORS Secure Championship Victory at Asia Cup 2025',
    excerpt: 'Dominant performance secures first place at the largest regional tournament of the year.',
    content: 'In a stunning display of tactical mastery and mechanical excellence, BLACK WARRIORS claimed the top prize at the Free Fire Asia Cup 2025. The team defeated 15 other competitors in a thrilling finals match, showcasing the synergy and strategy that defines our organization. Congratulations to our champions!',
    date: '2025-02-10',
    category: 'Tournament',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
    author: 'Admin',
  },
  {
    id: '2',
    title: 'APEX Joins BLACK WARRIORS as 5th Squad Member',
    excerpt: 'Rising star Aditya Pandey (APEX) completes our elite roster with exceptional flex capabilities.',
    content: 'After months of training and evaluation, we are proud to announce the official signing of Aditya Pandey, known as APEX. His versatility and game sense make him the perfect addition to complete our squad. APEX brings valuable experience from international competitions and a hunger to prove himself on the world stage.',
    date: '2025-01-28',
    category: 'Team Update',
    image: 'https://images.unsplash.com/photo-1535430557519-7c7d2b6de8ec?w=600&h=400&fit=crop',
    author: 'CIPHER',
  },
  {
    id: '3',
    title: 'GHOST Wins Best Aggressive Player Award at Spring Invitational',
    excerpt: 'Captain Priya Sharma recognized for outstanding entry fragging and leadership throughout the tournament.',
    content: 'Priya Sharma, our in-game captain known as GHOST, was awarded the Best Aggressive Player trophy at the Spring Invitational. Her fearless entry strategies and clutch performances throughout the tournament exemplified what makes BLACK WARRIORS a force to be reckoned with. GHOST continues to set the standard for excellence.',
    date: '2025-01-15',
    category: 'Player Focus',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=400&fit=crop',
    author: 'Admin',
  },
  {
    id: '4',
    title: 'Behind the Scenes: Training Regimen of Champions',
    excerpt: 'Exclusive look at how BLACK WARRIORS prepares for high-stakes tournaments.',
    content: 'Our documentary team followed the squad through a typical competition week. From early morning scrims to late-night strategy sessions, witness the dedication and discipline required to compete at the highest level. The path to championship requires more than just raw skill—it demands consistency, teamwork, and unwavering commitment.',
    date: '2024-12-20',
    category: 'Media',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
    author: 'Media Team',
  },
  {
    id: '5',
    title: 'Community Tournament Announced: Road to BLACK WARRIORS Academy',
    excerpt: 'Emerging players can compete for spots in our youth development program.',
    content: 'We are proud to announce a community tournament with the winner earning a place in the BLACK WARRIORS academy program. This is your chance to prove yourself against some of Asia\'s best upcoming talent. Registration opens February 15th. Are you ready to join the elite?',
    date: '2024-12-05',
    category: 'Community',
    image: 'https://images.unsplash.com/photo-1493711662714-5ce5e675756d?w=600&h=400&fit=crop',
    author: 'NEXUS',
  },
  {
    id: '6',
    title: 'SHADOW Breaks All-Time Kill Record with 1,247 Season Eliminations',
    excerpt: 'Arjun Singh achieves unprecedented milestone in competitive Free Fire.',
    content: 'In a historic feat, SHADOW shattered the previous seasonal kill record with an incredible 1,247 eliminations. His precision and consistency throughout the season have been nothing short of remarkable. This record stands as a testament to the elite level of play we maintain at BLACK WARRIORS.',
    date: '2024-11-22',
    category: 'Player Focus',
    image: 'https://images.unsplash.com/photo-1535430557519-7c7d2b6de8ec?w=600&h=400&fit=crop',
    author: 'Admin',
  },
];
