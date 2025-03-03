
import React from 'react';
import { 
  ChevronUp, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight,
  Play,
  Pause
} from 'lucide-react';
import { Button } from '@/components/ui/button';

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

interface ControlPanelProps {
  onDirectionChange: (direction: Direction) => void;
  onTogglePause: () => void;
  isPaused: boolean;
  isPlaying: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  onDirectionChange,
  onTogglePause,
  isPaused,
  isPlaying
}) => {
  return (
    <div className="mt-6 select-none">
      <div className="flex flex-col items-center gap-2">
        {/* Top row - Up button */}
        <div>
          <Button
            variant="outline"
            size="icon"
            className="control-button w-14 h-14 rounded-full shadow-sm"
            onClick={() => onDirectionChange('UP')}
            disabled={!isPlaying}
          >
            <ChevronUp className="h-8 w-8" />
          </Button>
        </div>
        
        {/* Middle row - Left, Pause/Play, Right */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="control-button w-14 h-14 rounded-full shadow-sm"
            onClick={() => onDirectionChange('LEFT')}
            disabled={!isPlaying}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
          
          <Button
            variant={isPaused ? "default" : "outline"}
            size="icon"
            className="control-button w-14 h-14 rounded-full shadow-sm"
            onClick={onTogglePause}
            disabled={!isPlaying}
          >
            {isPaused ? (
              <Play className="h-6 w-6" />
            ) : (
              <Pause className="h-6 w-6" />
            )}
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="control-button w-14 h-14 rounded-full shadow-sm"
            onClick={() => onDirectionChange('RIGHT')}
            disabled={!isPlaying}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        </div>
        
        {/* Bottom row - Down button */}
        <div>
          <Button
            variant="outline"
            size="icon"
            className="control-button w-14 h-14 rounded-full shadow-sm"
            onClick={() => onDirectionChange('DOWN')}
            disabled={!isPlaying}
          >
            <ChevronDown className="h-8 w-8" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
