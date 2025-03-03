
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSnakeGame } from '@/lib/useSnakeGame';
import GameBoard from '@/components/GameBoard';
import ControlPanel from '@/components/ControlPanel';
import ScoreBoard from '@/components/ScoreBoard';
import GameOverModal from '@/components/GameOverModal';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import FrameSDK from "@farcaster/frame-sdk"

const Index = () => {
  const isMobile = useIsMobile();
  const [cellSize, setCellSize] = useState(isMobile ? 16 : 20);
  const gridSize = 20;
  
  const gameSettings = {
    gridSize,
    initialSpeed: 200,
    speedIncrease: 2,
  };
  
  const {
    gameState,
    snake,
    food,
    score,
    highScore,
    direction,
    isPaused,
    changeDirection,
    startGame,
    togglePause,
  } = useSnakeGame(gameSettings);
  
  // Handle window resize for responsive cell size
  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth < 768;
      setCellSize(isMobileView ? 16 : 20);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function FarCasterGameProvider({children}:{children:React.ReactNode}) {
    useEffect(()=>{
      const load = async () => {
        FrameSDK.actions.ready()
      }
      load()
    },[])
    
    return <>{children}</>
  }
  
  return (
    <FarCasterGameProvider>
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <motion.div
        className="max-w-md w-full mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-6">
          <motion.h1 
            className="text-3xl font-bold mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Snake
          </motion.h1>
          <motion.p 
            className="text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Use arrow keys or touch controls to play
          </motion.p>
        </div>
        
        <ScoreBoard score={score} highScore={highScore} />
        
        <motion.div 
          className="relative flex justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            delay: 0.4,
            type: "spring",
            stiffness: 300,
            damping: 25
          }}
        >
          <GameBoard
            gridSize={gridSize}
            cellSize={cellSize}
            snake={snake}
            food={food}
            isPaused={isPaused}
          />
          
          {gameState === 'READY' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="glass-panel p-6 rounded-xl text-center">
                <h2 className="text-xl font-semibold mb-4">Ready to Play?</h2>
                <Button onClick={startGame} className="px-8">
                  Start Game
                </Button>
              </div>
            </div>
          )}
        </motion.div>
        
        <ControlPanel
          onDirectionChange={changeDirection}
          onTogglePause={togglePause}
          isPaused={isPaused}
          isPlaying={gameState === 'PLAYING'}
        />
      </motion.div>
      
      {gameState === 'GAME_OVER' && (
        <GameOverModal
          score={score}
          highScore={highScore}
          onRestart={startGame}
        />
      )}
    </div>
    </FarCasterGameProvider>
  );
};

export default Index;
