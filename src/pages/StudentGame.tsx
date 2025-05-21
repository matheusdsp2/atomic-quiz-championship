
import React, { useState, useEffect } from 'react';
import { useSocket } from '@/contexts/SocketContext';
import ElementSymbol from '@/components/ElementSymbol';
import AnswerOptions from '@/components/AnswerOptions';
import CountdownTimer from '@/components/CountdownTimer';
import { Element } from '@/data/elements';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Mock data - in real app will come from socket
const mockQuestion = {
  symbol: "Na",
  name: "Sódio",
  atomicNumber: 11,
  family: "Metais Alcalinos" as any
};

const mockOptions = [
  { symbol: "Na", name: "Sódio", atomicNumber: 11, family: "Metais Alcalinos" as any },
  { symbol: "K", name: "Potássio", atomicNumber: 19, family: "Metais Alcalinos" as any },
  { symbol: "Li", name: "Lítio", atomicNumber: 3, family: "Metais Alcalinos" as any },
  { symbol: "Ca", name: "Cálcio", atomicNumber: 20, family: "Metais Alcalino-Terrosos" as any }
];

const StudentGame = () => {
  const { userName, roomId, isTeacher } = useSocket();
  const navigate = useNavigate();
  
  const [currentElement, setCurrentElement] = useState<Element | null>(null);
  const [options, setOptions] = useState<Element[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<Element | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<Element | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [roundActive, setRoundActive] = useState(false);
  const [timePerQuestion, setTimePerQuestion] = useState(20);
  const [score, setScore] = useState(0);
  
  // Check if user is authorized to be on this page
  useEffect(() => {
    if (!userName || !roomId) {
      navigate('/');
      toast.error("Você precisa entrar em uma sala para jogar");
    }
    
    if (isTeacher) {
      navigate('/teacher-game');
    }
  }, [userName, roomId, isTeacher, navigate]);

  // Mock socket event handling - in real app these will come from socket
  useEffect(() => {
    // Simulate receiving a new question
    setCurrentElement(mockQuestion as Element);
    setOptions(mockOptions as Element[]);
    setSelectedAnswer(null);
    setCorrectAnswer(null);
    setShowResults(false);
    setRoundActive(true);
    
    // Simulate timer end after timePerQuestion seconds
    const timer = setTimeout(() => {
      setRoundActive(false);
      setShowResults(true);
      setCorrectAnswer(mockQuestion as Element);
    }, timePerQuestion * 1000);
    
    return () => clearTimeout(timer);
  }, [timePerQuestion]);
  
  const handleAnswerSelect = (element: Element) => {
    setSelectedAnswer(element);
    
    // In real app, this would send the answer to the server
    console.log(`Selected answer: ${element.name}`);
    
    // Simulate correct answer
    if (element.symbol === mockQuestion.symbol) {
      setScore(prev => prev + 1);
    }
  };
  
  const handleTimeUp = () => {
    setRoundActive(false);
    setShowResults(true);
    setCorrectAnswer(mockQuestion as Element);
  };
  
  const waitingForNextRound = !roundActive && showResults;
  
  return (
    <div className="min-h-screen bg-blue-50 p-4">
      {/* Header with room info */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-sm font-medium text-gray-500">Sala</h2>
            <p className="font-bold text-lg">{roomId}</p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500">Jogador</h2>
            <p className="font-bold text-lg">{userName}</p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500">Pontuação</h2>
            <p className="font-bold text-lg">{score}</p>
          </div>
        </div>
      </div>
      
      {/* Main game content */}
      <div className="max-w-4xl mx-auto">
        {/* Timer */}
        <CountdownTimer 
          duration={timePerQuestion} 
          onTimeUp={handleTimeUp}
          isActive={roundActive}
          className="mb-6"
        />
        
        {/* Question element */}
        {currentElement ? (
          <div className="flex flex-col items-center mb-8">
            <h2 className="text-xl md:text-2xl font-bold mb-4">
              Qual o nome do elemento com o símbolo:
            </h2>
            <ElementSymbol element={currentElement} />
          </div>
        ) : (
          <div className="text-center p-8">
            <p className="text-lg">Aguardando nova pergunta...</p>
          </div>
        )}
        
        {/* Answer options */}
        {options.length > 0 && (
          <AnswerOptions
            options={options}
            onSelect={handleAnswerSelect}
            selectedAnswer={selectedAnswer}
            correctAnswer={correctAnswer}
            showResults={showResults}
            disabled={!roundActive}
          />
        )}
        
        {/* Result feedback */}
        {showResults && (
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
            <p className="mt-2 text-gray-600">Aguardando próxima questão...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentGame;
