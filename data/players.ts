export interface Player {
  id: string;
  name: string;
  nickname: string;
  role: string;
  joinDate: string;
  image: string;
  stats: {
    kills: number;
    wins: number;
    kd: number;
    headshots: number;
  };
  bio: string;
  achievements: string[];
  social: {
    instagram?: string;
    twitch?: string;
    youtube?: string;
  };
}

export const PLAYERS: Player[] = [
  {
    id: '1',
    name: 'Arjun Singh',
    nickname: 'LBOSS',
    role: 'AWM Specialist',
    joinDate: '2022-03-15',
    image: '/Admin.png',
    stats: {
      kills: 4821,
      wins: 287,
      kd: 2.8,
      headshots: 1245,
    },
    bio: 'Elite sniper with exceptional accuracy and positioning. 3x tournament champion. Known for clutch plays in high-pressure situations.',
    achievements: [
      'Asia Championship 2025 - 1st Place',
      'International Invitational 2024 - 2nd Place',
      'Highest Kill Count Record - 1,247 season kills',
    ],
    social: {
      instagram: '@shadow_pro',
      twitch: 'shadowpro',
    },
  },
  {
    id: '2',
    name: 'Priya Sharma',
    nickname: 'TITAN',
    role: 'Assault Leader',
    joinDate: '2022-06-20',
    image: '/fitgirl.png',
    stats: {
      kills: 5124,
      wins: 312,
      kd: 3.1,
      headshots: 1389,
    },
    bio: 'Aggressive playmaker and team captain. Leading the assault with precision and strategy. Multiple championship titles.',
    achievements: [
      'Team Captain',
      'Most Aggressive Player Award',
      'Best Entry Fragger 2024',
    ],
    social: {
      instagram: '@ghost_warrior',
      twitch: 'ghostwarrior',
      youtube: 'GhostWarrior',
    },
  },
  {
    id: '3',
    name: 'Rohan Verma',
    nickname: 'Chinwi',
    role: 'Support Specialist',
    joinDate: '2023-01-10',
    image: '/Blue White Modern Neurologist Instagram Post.png',
    stats: {
      kills: 3456,
      wins: 289,
      kd: 2.3,
      headshots: 892,
    },
    bio: 'Strategic support player and map controller. Expert in utility usage and team coordination. Graduated from academy system.',
    achievements: [
      'Rising Star Award 2024',
      'Best Utility Usage',
      'Most Improved Player',
    ],
    social: {
      instagram: '@nexus_pro',
      twitch: 'nexusgaming',
    },
  },
  {
    id: '4',
    name: 'Vikram Patel',
    nickname: 'ARYANA',
    role: 'In-Game Leader (IGL)',
    joinDate: '2021-11-05',
    image: '/Comptable.png',
    stats: {
      kills: 4234,
      wins: 298,
      kd: 2.6,
      headshots: 1098,
    },
    bio: 'Visionary leader and tactical mastermind. Founded BLACK WARRIORS with a vision of excellence. Experienced in international competitions.',
    achievements: [
      'Team Founder & IGL',
      'Strategic Excellence Award',
      '5+ Championship Titles',
    ],
    social: {
      instagram: '@cipher_leader',
      twitch: 'cipherleader',
      youtube: 'CipherLeader',
    },
  },
  {
    id: '5',
    name: 'Aditya Pandey',
    nickname: 'XBAN',
    role: 'Flex Player',
    joinDate: '2023-05-22',
    image: '/logo.png',
    stats: {
      kills: 3892,
      wins: 276,
      kd: 2.4,
      headshots: 967,
    },
    bio: 'Versatile player who can adapt to any role. Strong mechanical skills and game sense. Key player in recent tournaments.',
    achievements: [
      'Spring Invitational 2025 - 2nd Place',
      'Flex Player of the Year 2024',
      'Best Adaptability Award',
    ],
    social: {
      instagram: '@apex_warrior',
      twitch: 'apexwarrior',
    },
  },
];
