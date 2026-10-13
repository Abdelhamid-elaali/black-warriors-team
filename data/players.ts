export interface Player {
  id: string;
  name: string;
  nickname: string;
  role: string;
  joinDate: string;
  image: string;
  imageLight?: string;
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
    imageLight: '/members/LBOSS-light.jpeg',
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
    joinDate: '2020-10-01',
    image: '/members/TITAN.png',
    imageLight: '/members/TITAN-light.jpeg',
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
    nickname: 'Zzz!',
    role: 'Support Specialist',
    joinDate: '2025-07-01',
    image: '/members/CHINWI.png',
    imageLight: '/members/CHINWI-light.jpeg',
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
    id: '5',
    name: 'Iyad',
    nickname: 'XBAN',
    role: 'Second Rusher',
    joinDate: '2021-04-01',
    image: '/members/XBAN.png',
    imageLight: '/members/XBAN-light.jpeg',
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
  {
    id: '6',
    name: 'Mohammed',
    nickname: 'ETM',
    role: 'Support Specialist',
    joinDate: '2025-02-01',
    image: '/members/ETM.jpeg',
    imageLight: '/members/ETM-light.jpeg',
    stats: {
      kills: 6585,
      wins: 952,
      kd: 5.5,
      headshots: 2908,
    },
    bio: 'Support Specialist for BLACK WARRIORS. Known for exceptional tactical awareness, utility management, and clutch team support in competitive tournaments.',
    achievements: [
      'MENA Championship 2025 - 1st Place',
      'Best Support Specialist Award',
    ],
    social: {
      instagram: '@etm__018'
    },
  },
  {
    id: '7',
    name: 'KAZx',
    nickname: 'KAZx',
    role: 'Rusher',
    joinDate: '2026-10-05',
    image: '/members/KazX.png',
    imageLight: '/members/KazX.png',
    stats: {
      kills: 5640,
      wins: 980,
      kd: 5.7,
      headshots: 2310,
    },
    bio: 'Aggressive rusher for BLACK WARRIORS. Known for pinpoint precision, lightning-fast reflex frags, and tactical execution in competitive Free Fire tournaments.',
    achievements: [
      'Top Fragger Award',
      'Rising Star 2025',
    ],
    social: {},
  },
];

