'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { orbitron } from './fonts'

type GameState = 'initial' | 'doorSelected' | 'offerSwitch' | 'gameOver'

const MontyHallSimulator = () => {
  const [games, setGames] = useState(0)
  const [wins, setWins] = useState(0)
  const [losses, setLosses] = useState(0)
  const [currentDoor, setCurrentDoor] = useState<number | null>(null)
  const [revealedDoor, setRevealedDoor] = useState<number | null>(null)
  const [winningDoor, setWinningDoor] = useState<number | null>(null)
  const [gameState, setGameState] = useState<GameState>('initial')

  const resetGame = () => {
    setCurrentDoor(null)
    setRevealedDoor(null)
    setWinningDoor(null)
    setGameState('initial')
  }

  const selectDoor = (door: number) => {
    if (gameState !== 'initial') return

    const winning = Math.floor(Math.random() * 3) + 1
    setWinningDoor(winning)
    setCurrentDoor(door)

    // Choose a door to reveal that is neither the selected door nor the winning door
    const availableDoors = [1, 2, 3].filter(d => d !== door && d !== winning)
    const revealedDoorIndex = Math.floor(Math.random() * availableDoors.length)
    setRevealedDoor(availableDoors[revealedDoorIndex])

    setGameState('offerSwitch')
  }

  const makeDecision = (switch_: boolean) => {
    if (gameState !== 'offerSwitch' || currentDoor === null || revealedDoor === null || winningDoor === null) return

    setGames(games + 1)

    const finalDoor = switch_ ? 6 - currentDoor - revealedDoor : currentDoor

    if (finalDoor === winningDoor) {
      setWins(wins + 1)
    } else {
      setLosses(losses + 1)
    }

    setCurrentDoor(finalDoor)
    setGameState('gameOver')
  }

  return (
    <Card className="bg-gray-800 border-purple-500">
      <CardHeader>
        <CardTitle className={`text-2xl text-purple-400 ${orbitron.className}`}>Game Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <p className="text-lg font-semibold text-purple-300">Games Played</p>
            <p className="text-2xl text-purple-100">{games}</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-purple-300">Wins</p>
            <p className="text-2xl text-green-400">{wins}</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-purple-300">Losses</p>
            <p className="text-2xl text-red-400">{losses}</p>
          </div>
        </div>

        <div className="flex justify-center space-x-4 mb-6">
          {[1, 2, 3].map((door) => (
            <Button
              key={door}
              onClick={() => selectDoor(door)}
              disabled={gameState !== 'initial'}
              className={`w-20 h-20 ${currentDoor === door ? 'bg-purple-600' : 'bg-gray-600'
                } ${gameState === 'gameOver' && winningDoor === door ? 'bg-green-600' : ''
                } ${gameState === 'gameOver' && currentDoor === door && winningDoor !== door ? 'bg-red-600' : ''
                } hover:bg-purple-500 transition-colors duration-200`}
            >
              Door {door}
            </Button>
          ))}
        </div>

        {gameState === 'offerSwitch' && revealedDoor !== null && (
          <div className="text-center mb-6">
            <p className="mb-2 text-purple-200">Door {revealedDoor} was opened and it's empty. Do you want to switch your choice?</p>
            <div className="space-x-4">
              <Button onClick={() => makeDecision(true)} variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-900">
                Switch
              </Button>
              <Button onClick={() => makeDecision(false)} variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-900">
                Stay
              </Button>
            </div>
          </div>
        )}

        {gameState === 'gameOver' && winningDoor !== null && currentDoor !== null && (
          <div className="text-center mb-6">
            <p className={winningDoor === currentDoor ? 'text-green-400' : 'text-red-400'}>
              {winningDoor === currentDoor ? 'You won!' : 'You lost!'}
            </p>
            <p className="text-purple-200">You chose Door {currentDoor}</p>
            <p className="text-purple-200">The winning door was Door {winningDoor}</p>
          </div>
        )}

        <div className="text-center">
          <Button
            onClick={resetGame}
            disabled={gameState === 'initial'}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Play Again
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default MontyHallSimulator

