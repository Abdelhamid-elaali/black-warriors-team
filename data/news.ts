export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: 'Tournament' | 'Team Update' | 'Player Focus' | 'Media' | 'Community' | 'Announcement' | 'Collaboration' | 'Patch Note';
  image: string;
  author: string;
}

export const NEWS: NewsArticle[] = [
  {
    id: 'ff-1617',
    title: 'Free Fire sends players on a mysterious desert adventure in its latest ‘Lost Treasure’ campaign',
    excerpt: 'Explore the mysterious desert and uncover Lost Treasure in the latest campaign.',
    content: 'Free Fire sends players on a mysterious desert adventure in its latest ‘Lost Treasure’ campaign. Experience thrilling big events like Winterlands and Anniversary Celebrations, plus epic collaborations with popular franchises and entertainment icons. Dive into immersive gameplay and enjoy rewards for endless fun and excitement!',
    date: '2026-02-16',
    category: 'Announcement',
    image: '/news/ff_desert_campaign.png',
    author: 'Garena Free Fire',
  },
  {
    id: 'ff-1605',
    title: 'Garena unveils Free Fire 2026 Esports Roadmap',
    excerpt: 'Expanded global competition, new standalone Clash Squad tournament, and EWC return.',
    content: 'Garena unveils Free Fire 2026 Esports Roadmap with expanded global competition, new standalone Clash Squad tournament, and EWC return. Free Fire’s most iconic offline tournament - Free Fire World Series (FFWS in short) is a global tournament held by Garena. It is an epic battle of the best teams in the world, a carnival for all Free Fire players.',
    date: '2026-01-19',
    category: 'Announcement',
    image: '/news/ff_esports_roadmap.png',
    author: 'Garena Free Fire',
  },
  {
    id: 'ff-1604',
    title: '18 teams to compete in Free Fire Ramadan Cup 2026',
    excerpt: 'The Ramadan Cup 2026 begins February 21st.',
    content: '18 teams to compete in Free Fire Ramadan Cup 2026 beginning February 21. BATTLE IN STYLE with Free Fire, a free-to-play survival shooter accessible to almost all smartphones across the globe. Take on foes in Battle Royale, Clash Squad, and other exciting modes. In each 10-minute match, BOOYAH your way out for adrenaline, style, and fun!',
    date: '2026-01-19',
    category: 'Announcement',
    image: '/news/ff_ramadan_cup.png',
    author: 'Garena Free Fire',
  },
  {
    id: 'ff-1601',
    title: 'Awaken the Curse: Jujutsu Kaisen will soon manifest in Free Fire',
    excerpt: 'The highly anticipated Jujutsu Kaisen collaboration is coming to Free Fire.',
    content: 'Awaken the Curse: Jujutsu Kaisen will soon manifest in Free Fire. Experience thrilling big events like Winterlands and Anniversary Celebrations, plus epic collaborations with popular franchises and entertainment icons. Dive into immersive gameplay and enjoy rewards for endless fun and excitement!',
    date: '2026-01-13',
    category: 'Collaboration',
    image: '/news/ff_jujutsu_kaisen.png',
    author: 'Garena Free Fire',
  },
  {
    id: 'ff-1595',
    title: 'OB52 PATCH NOTES',
    excerpt: 'Check out what is new in OB52!',
    content: 'OB52 PATCH NOTES. Check out what is new in OB52! Visual upgrades to the maps and lobby provide players a unique and premium gaming experience right from the moment they enter the game. New weapon animations and improved movements provide players smoother and more realistic expericence.',
    date: '2026-01-09',
    category: 'Patch Note',
    image: '/news/ff_patch_notes.png',
    author: 'Garena Free Fire',
  },
  {
    id: 'ff-1571',
    title: 'Dive into Free Fire Winterlands: Dreamspace',
    excerpt: 'A festive adventure awaits in the new Winterlands event.',
    content: 'Dive into Free Fire Winterlands: Dreamspace for a festive adventure. BATTLE IN STYLE with Free Fire, a free-to-play survival shooter accessible to almost all smartphones across the globe. Take on foes in Battle Royale, Clash Squad, and other exciting modes. In each 10-minute match, BOOYAH your way out for adrenaline, style, and fun!',
    date: '2025-12-12',
    category: 'Announcement',
    image: '/news/ff_winterlands.png',
    author: 'Garena Free Fire',
  },
  {
    id: 'ff-1570',
    title: 'Calling on courage and evolution: Free Fire kicks off collaboration with Digimon Adventure',
    excerpt: 'The Free Fire x Digimon Adventure collaboration begins on November 17, 2025.',
    content: 'Calling on courage and evolution: Free Fire kicks off collaboration with Digimon Adventure on November 17, 2025. Experience thrilling big events like Winterlands and Anniversary Celebrations, plus epic collaborations with popular franchises and entertainment icons. Dive into immersive gameplay and enjoy rewards for endless fun and excitement!',
    date: '2025-12-02',
    category: 'Collaboration',
    image: '/news/ff_digimon.png',
    author: 'Garena Free Fire',
  },
];
