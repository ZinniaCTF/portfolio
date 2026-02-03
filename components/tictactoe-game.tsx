"use client"

import { useState, useCallback } from "react"

type Player = "X" | "O" | null
type Board = Player[]

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6], // diagonals
]

function checkWinner(board: Board): Player {
  for (const [a, b, c] of WINNING_COMBINATIONS) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]
    }
  }
  return null
}

function isBoardFull(board: Board): boolean {
  return board.every((cell) => cell !== null)
}

// Minimax algorithm - makes AI unbeatable
function minimax(board: Board, depth: number, isMaximizing: boolean): number {
  const winner = checkWinner(board)
  
  if (winner === "O") return 10 - depth // AI wins
  if (winner === "X") return depth - 10 // Player wins
  if (isBoardFull(board)) return 0 // Draw
  
  if (isMaximizing) {
    let bestScore = -Infinity
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = "O"
        const score = minimax(board, depth + 1, false)
        board[i] = null
        bestScore = Math.max(score, bestScore)
      }
    }
    return bestScore
  } else {
    let bestScore = Infinity
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = "X"
        const score = minimax(board, depth + 1, true)
        board[i] = null
        bestScore = Math.min(score, bestScore)
      }
    }
    return bestScore
  }
}

function getBestMove(board: Board): number {
  let bestScore = -Infinity
  let bestMove = 0
  
  for (let i = 0; i < 9; i++) {
    if (board[i] === null) {
      board[i] = "O"
      const score = minimax(board, 0, false)
      board[i] = null
      if (score > bestScore) {
        bestScore = score
        bestMove = i
      }
    }
  }
  
  return bestMove
}

function getWinningLine(board: Board): number[] | null {
  for (const combo of WINNING_COMBINATIONS) {
    const [a, b, c] = combo
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return combo
    }
  }
  return null
}

export function TicTacToeGame() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null))
  const [isPlayerTurn, setIsPlayerTurn] = useState(true)
  const [gameOver, setGameOver] = useState(false)
  const [status, setStatus] = useState("your move, human")
  const [winningLine, setWinningLine] = useState<number[] | null>(null)

  const resetGame = useCallback(() => {
    setBoard(Array(9).fill(null))
    setIsPlayerTurn(true)
    setGameOver(false)
    setStatus("your move, human")
    setWinningLine(null)
  }, [])

  const makeAIMove = useCallback((currentBoard: Board) => {
    const newBoard = [...currentBoard]
    const aiMove = getBestMove(newBoard)
    newBoard[aiMove] = "O"
    setBoard(newBoard)
    
    const winner = checkWinner(newBoard)
    const line = getWinningLine(newBoard)
    
    if (winner === "O") {
      setGameOver(true)
      setStatus("ai wins. resistance is futile.")
      setWinningLine(line)
    } else if (isBoardFull(newBoard)) {
      setGameOver(true)
      setStatus("draw. impressive... for a human.")
    } else {
      setIsPlayerTurn(true)
      setStatus("your move, human")
    }
  }, [])

  const handleCellClick = useCallback((index: number) => {
    if (board[index] || gameOver || !isPlayerTurn) return
    
    const newBoard = [...board]
    newBoard[index] = "X"
    setBoard(newBoard)
    
    const winner = checkWinner(newBoard)
    const line = getWinningLine(newBoard)
    
    if (winner === "X") {
      setGameOver(true)
      setStatus("impossible. checking for exploits...")
      setWinningLine(line)
    } else if (isBoardFull(newBoard)) {
      setGameOver(true)
      setStatus("draw. impressive... for a human.")
    } else {
      setIsPlayerTurn(false)
      setStatus("ai is calculating...")
      setTimeout(() => makeAIMove(newBoard), 400)
    }
  }, [board, gameOver, isPlayerTurn, makeAIMove])

  return (
    <section className="mb-16">
      <div className="mb-6 flex items-center gap-2 text-muted-foreground">
        <span className="text-foreground">{"> "}</span>
        <span>./games/tictactoe --difficulty=impossible</span>
      </div>

      <div className="border border-border p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            <span className="text-foreground">status:</span> {status}
          </div>
          <button
            onClick={resetGame}
            className="border border-border px-3 py-1 text-sm text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
          >
            reset
          </button>
        </div>

        <div className="mx-auto grid w-fit grid-cols-3 gap-1 bg-border p-1">
          {board.map((cell, index) => {
            const isWinningCell = winningLine?.includes(index)
            return (
              <button
                key={index}
                onClick={() => handleCellClick(index)}
                disabled={!!cell || gameOver || !isPlayerTurn}
                className={`flex h-20 w-20 items-center justify-center bg-background text-3xl font-bold transition-all ${
                  !cell && !gameOver && isPlayerTurn
                    ? "cursor-pointer hover:bg-accent"
                    : "cursor-default"
                } ${isWinningCell ? "bg-accent" : ""}`}
              >
                {cell && (
                  <span
                    className={`${
                      cell === "X" ? "text-foreground" : "text-muted-foreground"
                    } ${isWinningCell ? "animate-pulse" : ""}`}
                  >
                    {cell}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        <div className="mt-4 text-center text-xs text-muted-foreground">
          <span className="text-foreground">you:</span> X | <span className="text-foreground">ai:</span> O
        </div>

        <div className="mt-4 border-t border-border pt-4 text-xs text-muted-foreground">
          <div className="mb-1 text-foreground">{"> "}cat readme.txt</div>
          <div className="pl-4">
            this ai uses the minimax algorithm.
            <br />
            it evaluates every possible game state.
            <br />
            you cannot win. best case: a draw.
            <br />
            <span className="text-foreground">good luck.</span>
          </div>
        </div>
      </div>
    </section>
  )
}
