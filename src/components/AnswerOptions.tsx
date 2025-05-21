
import React from 'react';
import { Element } from '@/data/elements';

interface AnswerOptionsProps {
  options: Element[];
  onSelect: (element: Element) => void;
  selectedAnswer: Element | null;
  correctAnswer: Element | null;
  showResults: boolean;
  disabled: boolean;
}

const COLORS = [
  'bg-quiz-red',
  'bg-quiz-blue',
  'bg-quiz-green', 
  'bg-quiz-yellow'
];

const AnswerOptions: React.FC<AnswerOptionsProps> = ({
  options,
  onSelect,
  selectedAnswer,
  correctAnswer,
  showResults,
  disabled
}) => {
  return (
    <div className="grid grid-cols-2 gap-4 w-full max-w-lg mx-auto">
      {options.map((option, index) => {
        const isSelected = selectedAnswer?.symbol === option.symbol;
        const isCorrect = correctAnswer?.symbol === option.symbol;
        const isWrong = showResults && isSelected && !isCorrect;
        
        // Desabilita o botão se já houver uma resposta selecionada ou se o componente estiver desabilitado
        const buttonDisabled = disabled || showResults || selectedAnswer !== null;
        
        return (
          <button
            key={option.symbol}
            className={`
              ${COLORS[index]} text-white p-6 rounded-lg font-bold text-xl md:text-2xl
              transform transition-transform shadow-lg
              ${isSelected ? 'ring-4 ring-white' : ''}
              ${showResults && isCorrect ? 'animate-pulse-answer bg-opacity-100' : 'bg-opacity-90'}
              ${isWrong ? 'bg-opacity-50 line-through' : ''}
              ${!buttonDisabled ? 'hover:scale-105 active:scale-95' : 'cursor-default opacity-80'}
            `}
            onClick={() => !buttonDisabled && onSelect(option)}
            disabled={buttonDisabled}
          >
            {option.name}
          </button>
        );
      })}
    </div>
  );
};

export default AnswerOptions;
