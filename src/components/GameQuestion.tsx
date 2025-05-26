
import React from 'react';
import ElementSymbol from '@/components/ElementSymbol';
import AnswerOptions from '@/components/AnswerOptions';
import { Element } from '@/data/elements';

interface GameQuestionProps {
  currentQuestion: Element;
  options: Element[];
  selectedAnswer: Element | null;
  correctAnswer: Element | null;
  showResults: boolean;
  roundActive: boolean;
  hasAnswered: boolean;
  onAnswerSelect: (element: Element) => void;
}

const GameQuestion: React.FC<GameQuestionProps> = ({
  currentQuestion,
  options,
  selectedAnswer,
  correctAnswer,
  showResults,
  roundActive,
  hasAnswered,
  onAnswerSelect
}) => {
  return (
    <>
      {/* Question */}
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-xl md:text-2xl font-bold mb-4">
          Qual o nome do elemento com o símbolo:
        </h2>
        <ElementSymbol element={currentQuestion} />
        
        {hasAnswered && roundActive && (
          <div className="mt-4 text-green-600 font-medium">
            Resposta enviada!
          </div>
        )}
      </div>

      {/* Options */}
      {options.length > 0 && (
        <AnswerOptions
          options={options}
          onSelect={onAnswerSelect}
          selectedAnswer={selectedAnswer}
          correctAnswer={correctAnswer}
          showResults={showResults}
          disabled={!roundActive || hasAnswered}
        />
      )}
    </>
  );
};

export default GameQuestion;
