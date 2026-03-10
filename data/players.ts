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
    joinDate: '2022-03-15',
    image: '/members/LBOSS.png',
    stats: {
      kills: 7821,
      wins: 1504,
      kd: 7.4,
      headshots: 2543,
    },
    bio: 'Elite sniper with exceptional accuracy and positioning. 3x tournament champion. Known for clutch plays in high-pressure situations.',
    achievements: [
      'MENA Championship 2025 - 1st Place',
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
    name: 'Anas',
    nickname: 'TITAN',
    role: 'First Rusher ',
    joinDate: '2022-06-20',
    image: '/members/TITAN.png',
    stats: {
      kills: 5124,
      wins: 516,
      kd: 5.6,
      headshots: 3389,
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
    name: 'Fouad',
    nickname: 'Chinwi',
    role: 'Support Specialist',
    joinDate: '2023-01-10',
    image: '/members/CHINWI.png',
    stats: {
      kills: 6456,
      wins: 857,
      kd: 6.1,
      headshots: 1288,
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
    id: '5',
    name: 'Iyad',
    nickname: 'XBAN',
    role: 'Second Rusher',
    joinDate: '2023-05-22',
    image: '/members/XBAN.png',
    stats: {
      kills: 4892,
      wins: 1302,
      kd: 5.8,
      headshots: 1720,
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
