import { LivingSpaceSection } from '@/components/home/LivingSpaceSection'
import { SignalToContext } from '@/components/home/SignalToContext'
import { ContextExplorer } from '@/components/home/ContextExplorer'
import { UserLayers } from '@/components/home/UserLayers'
import { PrivacyLayers } from '@/components/home/PrivacyLayers'
import { StackSection } from '@/components/home/StackSection'
import { ThothOneSection } from '@/components/home/ThothOneSection'
import './home.css'

export default function Home() {
  return (
    <div className="home-page">
      <LivingSpaceSection />
      <SignalToContext />
      <ContextExplorer />
      <UserLayers />
      <PrivacyLayers />
      <StackSection />
      <ThothOneSection />
    </div>
  )
}
