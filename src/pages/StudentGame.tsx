
import React, { useState, useEffect } from 'react';
import { useSocket } from '@/contexts/SocketContext';
import ElementSymbol from '@/components/ElementSymbol';
import AnswerOptions from '@/components/AnswerOptions';
import CountdownTimer from '@/components/CountdownTimer';
import { Element, ElementFamily } from '@/data/elements';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Mock data - in real app will come from socket
const mockQuestion = {
  symbol: "Na",
  name: "Sódio",
  atomicNumber: 11,
  family: ElementFamily.FAMILY_1A
};

const mockOptions = [
  { symbol: "Na", name: "Sódio", atomicNumber: 11, family: ElementFamily.FAMILY_1A },
  { symbol: "K", name: "Potássio", atomicNumber: 19, family: ElementFamily.FAMILY_1A },
  { symbol: "Li", name: "Lítio", atomicNumber: 3, family: ElementFamily.FAMILY_1A },
  { symbol: "Ca", name: "Cálcio", atomicNumber: 20, family: ElementFamily.FAMILY_2A }
];

const StudentGame = () => {
  const { userName, roomId, isTeacher, setRoomId, setUserName } = useSocket();
  const navigate = useNavigate();
  
  const [currentElement, setCurrentElement] = useState<Element | null>(null);
  const [options, setOptions] = useState<Element[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<Element | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<Element | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [roundActive, setRoundActive] = useState(false);
  const [timePerQuestion, setTimePerQuestion] = useState(20);
  const [score, setScore] = useState(0);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  
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
    setHasAnswered(false);
    
    // Simulate timer end after timePerQuestion seconds
    const timer = setTimeout(() => {
      setRoundActive(false);
      setShowResults(true);
      setCorrectAnswer(mockQuestion as Element);
    }, timePerQuestion * 1000);
    
    return () => clearTimeout(timer);
  }, [timePerQuestion]);
  
  // Listen for game end event (in real app from socket)
  useEffect(() => {
    // Mock game end detection - would be a socket event in real app
    const mockGameEndTimer = setTimeout(() => {
      // This would actually be triggered by a socket event from teacher
      // For demo purposes we're just using a timer
    }, 60000); // Demo timer, in real app this would be a socket event
    
    return () => clearTimeout(mockGameEndTimer);
  }, []);
  
  // Handle game end
  const handleGameEnd = () => {
    setGameEnded(true);
    toast.success("Jogo finalizado!");
    
    // Reset game state and navigate to home
    setTimeout(() => {
      setRoomId(null);
      setUserName(null);
      navigate('/');
    }, 3000); // Give user some time to see the final message
  };
  
  const handleAnswerSelect = (element: Element) => {
    // Verificar se o aluno já respondeu esta pergunta
    if (hasAnswered) {
      return;
    }
    
    setSelectedAnswer(element);
    setHasAnswered(true);
    
    // Exibir toast de confirmação
    toast.success("Resposta enviada!");
    
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
  
  // If game ended, show final screen with score
  if (gameEnded) {
    return (
      <div className="min-h-screen bg-blue-50 p-4 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold mb-4">Jogo Finalizado!</h2>
          <p className="text-lg mb-6">Obrigado por participar!</p>
          <div className="bg-purple-100 rounded-lg p-6 mb-6">
            <p className="text-lg text-gray-700 mb-2">Sua pontuação final:</p>
            <p className="text-4xl font-bold text-purple-700">{score}</p>
          </div>
          <p className="text-sm text-gray-500">Voltando para a tela inicial...</p>
        </div>
      </div>
    );
  }
  
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
          {/* Score removed from here - will only show at the end */}
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
            
            {/* Status da resposta */}
            {hasAnswered && roundActive && (
              <div className="mt-4 text-green-600 font-medium">
                Resposta enviada! Aguardando o fim da rodada...
              </div>
            )}
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
            disabled={!roundActive || hasAnswered}
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
