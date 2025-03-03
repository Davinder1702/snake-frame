
import { useState, useEffect, useCallback, useRef } from 'react';

// Types
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };
type GameState = 'READY' | 'PLAYING' | 'GAME_OVER';

interface GameSettings {
  gridSize: number;
  initialSpeed: number;
  speedIncrease: number;
}

export const useSnakeGame = (settings: GameSettings) => {
  const { gridSize, initialSpeed, speedIncrease } = settings;
  
  // Game state
  const [gameState, setGameState] = useState<GameState>('READY');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [snake, setSnake] = useState<Position[]>([{ x: 5, y: 5 }]);
  const [food, setFood] = useState<Position>({ x: 10, y: 10 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [speed, setSpeed] = useState(initialSpeed);
  const [isPaused, setIsPaused] = useState(false);
  
  // Refs for game loop
  const nextDirectionRef = useRef<Direction>('RIGHT');
  const gameLoopRef = useRef<number | null>(null);
  
  // Load high score from localStorage on initial render
  useEffect(() => {
    const savedHighScore = localStorage.getItem('snakeHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
  }, []);
  
  // Save high score to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('snakeHighScore', highScore.toString());
  }, [highScore]);
  
  // Create a random food position that's not on the snake
  const createFood = useCallback(() => {
    const newFood: Position = {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize)
    };
    
    // Check if food is on snake
    const isOnSnake = snake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
    
    if (isOnSnake) {
      return createFood(); // Try again
    }
    
    return newFood;
  }, [gridSize, snake]);
  
  // Move the snake in the current direction
  const moveSnake = useCallback(() => {
    if (gameState !== 'PLAYING' || isPaused) return;
    
    // Update direction from the ref (which is updated by key presses)
    const currentDirection = nextDirectionRef.current;
    
    setSnake(prevSnake => {
      // Copy the segments of the snake
      const newSnake = [...prevSnake];
      
      // Get the head position
      const head = { ...newSnake[0] };
      
      // Move the head based on the direction
      switch (currentDirection) {
        case 'UP':
          head.y = (head.y - 1 + gridSize) % gridSize;
          break;
        case 'DOWN':
          head.y = (head.y + 1) % gridSize;
          break;
        case 'LEFT':
          head.x = (head.x - 1 + gridSize) % gridSize;
          break;
        case 'RIGHT':
          head.x = (head.x + 1) % gridSize;
          break;
      }
      
      // Check for collision with self
      const selfCollision = newSnake.some(segment => segment.x === head.x && segment.y === head.y);
      
      if (selfCollision) {
        // End the game
        setGameState('GAME_OVER');
        return prevSnake;
      }
      
      // Check for collision with food
      const foodCollision = head.x === food.x && head.y === food.y;
      
      // Add the new head to the beginning of the snake
      newSnake.unshift(head);
      
      // If not eating food, remove the tail; otherwise generate new food
      if (foodCollision) {
        // Increase score
        const newScore = score + 1;
        setScore(newScore);
        
        // Check if it's a new high score
        if (newScore > highScore) {
          setHighScore(newScore);
        }
        
        // Increase speed
        setSpeed(prevSpeed => prevSpeed - speedIncrease);
        
        // Create new food
        setFood(createFood());
      } else {
        // Remove tail
        newSnake.pop();
      }
      
      return newSnake;
    });
    
    // Update direction after the move
    setDirection(currentDirection);
  }, [gameState, isPaused, gridSize, score, highScore, food, createFood, speedIncrease]);
  
  // Start game loop
  const startGameLoop = useCallback(() => {
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
    }
    
    gameLoopRef.current = window.setInterval(moveSnake, speed);
  }, [moveSnake, speed]);
  
  // Effect to handle game loop
  useEffect(() => {
    if (gameState === 'PLAYING' && !isPaused) {
      startGameLoop();
    }
    
    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [gameState, isPaused, startGameLoop]);
  
  // Handle key presses
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (gameState !== 'PLAYING') return;
    
    const key = e.key.toLowerCase();
    const currentDirection = direction;
    
    switch (key) {
      case 'arrowup':
      case 'w':
        if (currentDirection !== 'DOWN') {
          nextDirectionRef.current = 'UP';
        }
        break;
      case 'arrowdown':
      case 's':
        if (currentDirection !== 'UP') {
          nextDirectionRef.current = 'DOWN';
        }
        break;
      case 'arrowleft':
      case 'a':
        if (currentDirection !== 'RIGHT') {
          nextDirectionRef.current = 'LEFT';
        }
        break;
      case 'arrowright':
      case 'd':
        if (currentDirection !== 'LEFT') {
          nextDirectionRef.current = 'RIGHT';
        }
        break;
      case ' ':
        // Toggle pause
        setIsPaused(prev => !prev);
        break;
    }
  }, [gameState, direction]);
  
  // Set up key event listeners
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);
  
  // Change direction (for touch controls)
  const changeDirection = (newDirection: Direction) => {
    if (gameState !== 'PLAYING') return;
    
    const oppositeDirections = {
      UP: 'DOWN',
      DOWN: 'UP',
      LEFT: 'RIGHT',
      RIGHT: 'LEFT'
    };
    
    if (oppositeDirections[newDirection] !== direction) {
      nextDirectionRef.current = newDirection;
    }
  };
  
  // Start a new game
  const startGame = () => {
    // Reset game state
    setSnake([{ x: 5, y: 5 }]);
    setFood(createFood());
    setDirection('RIGHT');
    nextDirectionRef.current = 'RIGHT';
    setScore(0);
    setSpeed(initialSpeed);
    setIsPaused(false);
    
    // Start the game
    setGameState('PLAYING');
  };
  
  // Pause or resume game
  const togglePause = () => {
    if (gameState === 'PLAYING') {
      setIsPaused(prev => !prev);
    }
  };
  
  return {
    gameState,
    snake,
    food,
    score,
    highScore,
    direction,
    isPaused,
    gridSize,
    changeDirection,
    startGame,
    togglePause,
  };
};
