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
    name: 'Abdo',
    nickname: 'LBOSS',
    role: 'Cover AWM - Leader',
    joinDate: '2020-10-15',
    image: '/members/LBOSS.png',
    stats: {
      kills: 7821,
      wins: 1504,
      kd: 7.4,
      headshots: 2543,
    },
    bio: 'The Leader of Black Warriors Team and a versatile player who can adapt to any role (bomber and Support player). Strong mechanical skills and game sense. He is one of the main players in tournaments.',
    achievements: [
      'MENA Championship 2025 - 1st Place',
      'International Invitational 2024 - 2nd Place',
      'Highest Kill Count Record - 1,247 season kills',
    ],
    social: {
      instagram: '@lboss_vtx'
    },
  },
  {
    id: '2',
    name: 'Anas',
    nickname: 'TITAN',
    role: 'First Rusher ',
    joinDate: '2020-11-20',
    image: '/members/TITAN.png',
    stats: {
      kills: 5124,
      wins: 1130,
      kd: 5.6,
      headshots: 3389,
    },
    bio: 'Aggressive playmaker and first rusher player in the BW Team. Leading the assault with precision and strategy. Multiple championship titles.',
    achievements: [
      'Team Captain',
      'Most Aggressive Player Award',
      'Best Entry Fragger 2024',
    ],
    social: {
      instagram: '@anasdaghi'
    },
  },
  {
    id: '3',
    name: 'Fouad',
    nickname: 'Chinwi',
    role: 'Support Specialist',
    joinDate: '2025-07-10',
    image: '/members/CHINWI.png',
    stats: {
      kills: 6456,
      wins: 857,
      kd: 6.1,
      headshots: 1288,
    },
    bio: 'Strategic support player and map controller, and the second main rusher in the squad. Expert in utility usage and team coordination. Graduated from the academy system.',
    achievements: [
      'Rising Star Award 2024',
      'Best Utility Usage',
      'Most Improved Player',
    ],
    social: {
      instagram: '@fouad_laifa_'
    },
  },
  {
    id: '4',
    name: 'Ayoub',
    nickname: 'L4EO',
    role: 'First Rusher',
    joinDate: '2026-05-01',
    image: '/members/L4EO.png',
    stats: {
      kills: 4508,
      wins: 780,
      kd: 3.8,
      headshots: 1525,
    },
    bio: 'Pro rusher player and the first rusher for BLACK WARRIORS. A mobile player known for aggressive openings, fast pressure, and fearless entry fights.',
    achievements: [],
    social: {},
  },
  {
    id: '5',
    name: 'Iyad',
    nickname: 'XBAN',
    role: 'Second Rusher',
    joinDate: '2021-05-22',
    image: '/members/XBAN.png',
    stats: {
      kills: 4892,
      wins: 1028,
      kd: 5.8,
      headshots: 1720,
    },
    bio: 'Elite sniper with exceptional accuracy and positioning. 3x tournament champion. Known for clutch plays in high-pressure situations.',
    achievements: [
      'Spring Invitational 2025 - 2nd Place',
      'Flex Player of the Year 2024',
      'Best Adaptability Award',
    ],
    social: {
      instagram: '@benaddi_iyad'
    },
  },
];
