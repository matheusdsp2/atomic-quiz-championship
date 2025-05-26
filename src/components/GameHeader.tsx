
import React from 'react';
import { Card } from '@/components/ui/card';

interface GameHeaderProps {
  currentQuestionNumber: number;
  totalQuestions: number;
  score: number;
}

const GameHeader: React.FC<GameHeaderProps> = ({
  currentQuestionNumber,
  totalQuestions,
  score
}) => {
  return (
    <Card className="p-4 mb-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-sm font-medium text-gray-500">Pergunta</h2>
          <p className="font-bold text-lg">{currentQuestionNumber} de {totalQuestions}</p>
        </div>
        <div>
          <h2 className="text-sm font-medium text-gray-500">Pontuação</h2>
          <p className="font-bold text-lg">{score}</p>
        </div>
      </div>
    </Card>
  );
};

export default GameHeader;
