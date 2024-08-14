import { Inter } from "next/font/google";
import Home from './../components/Home'

const inter = Inter({ subsets: ["latin"] });

export default function HomePage() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between ${inter.className}`}
    >
      <Home/>
      
    </main>
  );
}
