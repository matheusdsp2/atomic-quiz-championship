
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface GameResultsProps {
  score: number;
  totalQuestions: number;
  onResetGame: () => void;
  onNavigateHome: () => void;
}

const GameResults: React.FC<GameResultsProps> = ({
  score,
  totalQuestions,
  onResetGame,
  onNavigateHome
}) => {
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-blue-50 p-4 flex items-center justify-center">
      <Card className="p-8 text-center max-w-md">
        <h2 className="text-2xl font-bold mb-4">Treino Concluído!</h2>
        <div className="bg-blue-100 rounded-lg p-6 mb-6">
          <p className="text-lg text-gray-700 mb-2">Sua pontuação:</p>
          <p className="text-4xl font-bold text-blue-700">{score}/{totalQuestions}</p>
          <p className="text-sm text-gray-600 mt-2">
            {percentage}% de acertos
          </p>
        </div>
        <div className="space-y-3">
          <Button onClick={onResetGame} className="w-full">
            Treinar Novamente
          </Button>
          <Button variant="outline" onClick={onNavigateHome} className="w-full">
            Voltar ao Menu
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default GameResults;
