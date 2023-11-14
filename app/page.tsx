import Image from 'next/image'
import { Inter } from '@next/font/google'
import SplitWithImage from './Features'
import WithSubnavigation from './components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <p>
      <WithSubnavigation />
      <SplitWithImage />
      hello</p>
  )
}
