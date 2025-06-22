import { CustomizationProvider } from '.././contexts/Customization'
import { Header } from './Header'
import ThreedCar from './ThreedCar'

export default function ThreedCarWrapper() {
  return (
    <>
    <Header />
    <CustomizationProvider>
      <ThreedCar />
    </CustomizationProvider>
    </>
  )
}