import { inter, orbitron } from './fonts'
import MontyHallSimulator from "./MontyHallSimulator";

export default function Home() {
  return <main className={`min-h-screen bg-gray-900 text-gray-100 ${inter.className}`}>
    <div className="container mx-auto px-4 py-8">
      <h1
        className={`text-4xl font-bold mb-6 text-center text-purple-400 ${orbitron.className}`}
      >
        Monty Hall Problem Simulator
      </h1>
      <MontyHallSimulator />
    </div>
  </main>
}

