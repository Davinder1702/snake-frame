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
        try {
          FrameSDK.actions.ready();
          // await frame.validate(); // Validate the frame
          // await frame.ready(); // Signal frame is ready
        } catch (error) {
          console.error('Frame validation failed:', error);
        }
      }
      load()
    },[])
    
    return <>{children}</>
  }
  
  return (
    <FarCasterGameProvider>
      <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <iframe 
        src="https://snakycat.io" 
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          position: 'absolute',
          top: 0,
          left: 0
        }}
      />
    </div>
    </FarCasterGameProvider>
  );
};

export default Index;
