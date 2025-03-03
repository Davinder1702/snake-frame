
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface GameOverModalProps {
  score: number;
  highScore: number;
  onRestart: () => void;
}

const GameOverModal: React.FC<GameOverModalProps> = ({ score, highScore, onRestart }) => {
  const isNewHighScore = score === highScore && score > 0;
  
  return (
    <motion.div
      className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="glass-panel px-8 py-8 rounded-2xl max-w-md w-full mx-4"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 400,
          damping: 30,
          delay: 0.1
        }}
      >
        <h2 className="text-2xl font-bold text-center mb-6">Game Over</h2>
        
        {isNewHighScore && (
          <motion.div 
            className="text-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-primary font-medium text-lg">New High Score!</p>
          </motion.div>
        )}
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="text-center p-4 bg-white/10 rounded-lg">
            <p className="text-muted-foreground text-sm mb-1">Score</p>
            <p className="text-xl font-semibold">{score}</p>
          </div>
          <div className="text-center p-4 bg-white/10 rounded-lg">
            <p className="text-muted-foreground text-sm mb-1">High Score</p>
            <p className="text-xl font-semibold">{highScore}</p>
          </div>
        </div>
        
        <Button 
          onClick={onRestart} 
          className="w-full py-6 text-lg"
        >
          Play Again
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default GameOverModal;
