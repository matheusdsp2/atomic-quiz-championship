
import React, { useState, useEffect } from 'react';
import { useSocket } from '@/contexts/SocketContext';
import ElementSymbol from '@/components/ElementSymbol';
import ScoreBoard from '@/components/ScoreBoard';
import CountdownTimer from '@/components/CountdownTimer';
import { Button } from '@/components/ui/button';
import { Element, ElementFamily, ELEMENT_FAMILIES, generateQuestion } from '@/data/elements';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Mock data for testing
const mockPlayers = [
  { name: "Carlos", score: 8 },
  { name: "Ana", score: 7 },
  { name: "João", score: 5 },
  { name: "Maria", score: 5 },
  { name: "Pedro", score: 4 },
  { name: "Lucas", score: 3 },
  { name: "Julia", score: 2 },
];

const TeacherGame = () => {
  const { roomId, isTeacher } = useSocket();
  const navigate = useNavigate();
  
  const [currentQuestion, setCurrentQuestion] = useState<{ 
    question: Element; 
    options: Element[] 
  } | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [roundActive, setRoundActive] = useState(false);
  const [timePerQuestion, setTimePerQuestion] = useState(20);
  const [selectedFamilies, setSelectedFamilies] = useState<ElementFamily[]>([
    ElementFamily.ALKALI_METALS,
    ElementFamily.HALOGENS
  ]);
  const [roundNumber, setRoundNumber] = useState(1);
  const [totalRounds, setTotalRounds] = useState(10);
  const [players, setPlayers] = useState(mockPlayers);
  
  // Check if user is authorized to be on this page
  useEffect(() => {
    if (!roomId || !isTeacher) {
      navigate('/');
      toast.error("Você precisa entrar como professor");
    }
  }, [roomId, isTeacher, navigate]);
  
  // Start a new round with a new question
  const startNewRound = () => {
    // Generate a new question from the selected families
    const newQuestion = generateQuestion(selectedFamilies);
    setCurrentQuestion(newQuestion);
    setShowResults(false);
    setRoundActive(true);
    
    // In real app, this would emit the new question to all students
    console.log("Starting new round", newQuestion);
  };
  
  // Handle timer completion
  const handleTimeUp = () => {
    setRoundActive(false);
    setShowResults(true);
    
    // In real app, this would tell all clients to show results
    if (roundNumber < totalRounds) {
      setRoundNumber(prev => prev + 1);
    } else {
      toast.success("Jogo finalizado!");
      // In real app, would show final results
    }
  };
  
  // Next round or finish game
  const handleNextRound = () => {
    if (roundNumber < totalRounds) {
      startNewRound();
    } else {
      // End game logic here
      toast.success("Jogo finalizado!");
      // Would navigate to results screen in full implementation
    }
  };
  
  return (
    <div className="min-h-screen bg-blue-50 p-4">
      {/* Header with room info */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <div className="flex justify-between items-center flex-wrap">
          <div>
            <h2 className="text-sm font-medium text-gray-500">Sala</h2>
            <p className="font-bold text-lg">{roomId}</p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500">Modo</h2>
            <p className="font-bold text-lg">Professor</p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500">Rodada</h2>
            <p className="font-bold text-lg">{roundNumber}/{totalRounds}</p>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Left column - Game controls */}
        <div className="md:col-span-2">
          {/* Timer */}
          <CountdownTimer 
            duration={timePerQuestion} 
            onTimeUp={handleTimeUp}
            isActive={roundActive}
            className="mb-6"
          />
          
          {/* Question display */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            {currentQuestion ? (
              <>
                <h2 className="text-xl font-bold mb-4 text-center">
                  Pergunta da rodada {roundNumber}
                </h2>
                <div className="flex justify-center">
                  <ElementSymbol element={currentQuestion.question} showDetails={showResults} />
                </div>
                
                {/* Answer options - display for teacher */}
                {currentQuestion.options.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {currentQuestion.options.map((option, index) => (
                      <div 
                        key={option.symbol}
                        className={`
                          p-3 rounded border
                          ${showResults && option.symbol === currentQuestion.question.symbol 
                            ? 'bg-green-100 border-green-500' 
                            : 'bg-white border-gray-300'}
                        `}
                      >
                        <p className="font-medium">{option.name}</p>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center p-12">
                <p className="text-xl font-medium mb-6">Pronto para iniciar o jogo?</p>
                <Button onClick={startNewRound} size="lg">
                  Iniciar Primeira Rodada
                </Button>
              </div>
            )}
          </div>
          
          {/* Controls */}
          <div className="bg-white rounded-lg shadow-md p-4">
            {showResults ? (
              <div className="flex justify-center">
                <Button onClick={handleNextRound} size="lg">
                  {roundNumber < totalRounds ? 'Próxima Rodada' : 'Finalizar Jogo'}
                </Button>
              </div>
            ) : roundActive ? (
              <div className="text-center">
                <p className="text-lg font-medium">Rodada em andamento...</p>
              </div>
            ) : (
              <div className="flex justify-center">
                <Button onClick={startNewRound} size="lg">
                  Iniciar Rodada
                </Button>
              </div>
            )}
          </div>
        </div>
        
        {/* Right column - Score board */}
        <div>
          <ScoreBoard players={players} limit={10} />
        </div>
      </div>
    </div>
  );
};

export default TeacherGame;
