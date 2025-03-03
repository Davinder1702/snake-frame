
import React, { memo } from 'react';
import { motion } from 'framer-motion';

interface GameBoardProps {
  gridSize: number;
  cellSize: number;
  snake: { x: number; y: number }[];
  food: { x: number; y: number };
  isPaused: boolean;
}

const GameBoard: React.FC<GameBoardProps> = ({ gridSize, cellSize, snake, food, isPaused }) => {
  const boardSize = gridSize * cellSize;
  
  return (
    <div 
      className="game-board relative bg-secondary/50 rounded-2xl overflow-hidden shadow-md border border-white/20"
      style={{ 
        width: boardSize, 
        height: boardSize,
      }}
    >
      {/* Food */}
      <motion.div
        className="absolute bg-snake-food rounded-full shadow-md"
        style={{
          width: cellSize * 0.8,
          height: cellSize * 0.8,
          left: food.x * cellSize + cellSize * 0.1,
          top: food.y * cellSize + cellSize * 0.1,
        }}
        initial={{ scale: 0 }}
        animate={{ scale: isPaused ? 0.9 : 1 }}
        transition={{ 
          duration: 0.5, 
          repeat: Infinity, 
          repeatType: "reverse" 
        }}
      />
      
      {/* Snake */}
      {snake.map((segment, index) => {
        const isHead = index === 0;
        
        return (
          <motion.div
            key={`${segment.x}-${segment.y}-${index}`}
            className={`snake-cell absolute ${isHead ? 'bg-snake-head rounded-lg z-10' : 'bg-snake-body rounded-md'}`}
            style={{
              width: isHead ? cellSize * 0.9 : cellSize * 0.8,
              height: isHead ? cellSize * 0.9 : cellSize * 0.8,
              left: segment.x * cellSize + (isHead ? cellSize * 0.05 : cellSize * 0.1),
              top: segment.y * cellSize + (isHead ? cellSize * 0.05 : cellSize * 0.1),
              zIndex: snake.length - index,
            }}
            initial={{ scale: 0 }}
            animate={{ 
              scale: isPaused ? 0.9 : 1,
              opacity: isPaused ? 0.8 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 800,
              damping: 30,
            }}
          />
        );
      })}
      
      {/* Pause overlay */}
      {isPaused && (
        <div className="absolute inset-0 bg-black/20 backdrop-blur-xs flex items-center justify-center">
          <div className="glass-panel px-6 py-4 rounded-xl">
            <p className="text-lg font-medium">Paused</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(GameBoard);
