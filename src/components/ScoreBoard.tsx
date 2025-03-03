
import React from 'react';
import { motion } from 'framer-motion';

interface ScoreBoardProps {
  score: number;
  highScore: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, highScore }) => {
  return (
    <div className="flex justify-between items-center mb-4 px-4 py-3 glass-panel rounded-xl">
      <div className="text-center">
        <p className="text-xs text-muted-foreground mb-1">SCORE</p>
        <motion.p 
          className="text-2xl font-semibold"
          key={score}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          {score}
        </motion.p>
      </div>
      
      <div className="h-10 w-px bg-border mx-4" />
      
      <div className="text-center">
        <p className="text-xs text-muted-foreground mb-1">HIGH SCORE</p>
        <p className="text-2xl font-semibold">{highScore}</p>
      </div>
    </div>
  );
};

export default ScoreBoard;
