
import React from 'react';
import { Element } from '@/data/elements';

interface GameFeedbackProps {
  showResults: boolean;
  selectedAnswer: Element | null;
  correctAnswer: Element | null;
  currentQuestionNumber: number;
  totalQuestions: number;
}

const GameFeedback: React.FC<GameFeedbackProps> = ({
  showResults,
  selectedAnswer,
  correctAnswer,
  currentQuestionNumber,
  totalQuestions
}) => {
  if (!showResults) return null;

  const isInfiniteMode = totalQuestions === 0;

  return (
    <div className="mt-8 text-center">
      {selectedAnswer ? (
        selectedAnswer.symbol === correctAnswer?.symbol ? (
          <p className="text-xl font-bold text-green-600">Correto! Você acertou!</p>
        ) : (
          <p className="text-xl font-bold text-red-600">
            Incorreto! A resposta certa era {correctAnswer?.name}.
          </p>
        )
      ) : (
        <p className="text-xl font-bold text-orange-600">
          Tempo esgotado! A resposta certa era {correctAnswer?.name}.
        </p>
      )}
      
      {selectedAnswer?.symbol === correctAnswer?.symbol && (
        <p className="mt-2 text-gray-600">
          {isInfiniteMode 
            ? "Próxima pergunta em instantes..." 
            : currentQuestionNumber < totalQuestions 
              ? "Próxima pergunta em instantes..." 
              : "Finalizando treino..."
          }
        </p>
      )}
    </div>
  );
};

export default GameFeedback;
