'use client';

import { useTheme } from '@/components/ThemeProvider';
import { Player } from '@/data/players';
import { useState, useEffect } from 'react';

interface PlayerImageProps {
  player: Player;
  className?: string;
  alt?: string;
}

export function PlayerImage({ player, className = '', alt }: PlayerImageProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const imgSrc = mounted && theme === 'light' && player.imageLight ? player.imageLight : player.image;

  return (
    <img
      src={imgSrc}
      alt={alt || player.name}
      className={className}
    />
  );
}
