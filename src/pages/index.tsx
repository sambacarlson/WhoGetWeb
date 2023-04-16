import Image from 'next/image'
import { Inter } from 'next/font/google'
import Authenticate from './authenticate'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="flex flex-col justify-center min-h-[100vh]">
      <Authenticate />
    </main>
  )
}
