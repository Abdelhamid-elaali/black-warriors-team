import KineticIntro from '@/components/KineticIntro'
import { Hero } from '@/components/hero'
import { FeaturedPlayers } from '@/components/featured-players'
import { Achievements } from '@/components/achievements'

export default function Page() {
  return (
    <>
      <KineticIntro />
      <Hero />
      <FeaturedPlayers />
      <Achievements />
    </>
  )
}

