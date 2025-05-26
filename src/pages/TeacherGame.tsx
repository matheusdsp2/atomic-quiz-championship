
import React, { useState, useEffect } from 'react';
import { useSocket } from '@/contexts/SocketContext';
import ElementSymbol from '@/components/ElementSymbol';
import ScoreBoard from '@/components/ScoreBoard';
import CountdownTimer from '@/components/CountdownTimer';
import { Button } from '@/components/ui/button';
import { 
  Element, 
  ElementFamily, 
  ELEMENT_FAMILIES, 
  generateQuestion 
} from '@/data/elements';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

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
  const { roomId, isTeacher, setRoomId, setUserName, setIsTeacher } = useSocket();
  const navigate = useNavigate();
  
  const [currentQuestion, setCurrentQuestion] = useState<{ 
    question: Element; 
    options: Element[] 
  } | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [roundActive, setRoundActive] = useState(false);
  const [timePerQuestion, setTimePerQuestion] = useState(20);
  const [selectedFamilies, setSelectedFamilies] = useState<ElementFamily[]>([
    ElementFamily.FAMILY_1A,
    ElementFamily.FAMILY_7A
  ]);
  const [roundNumber, setRoundNumber] = useState(1);
  const [totalRounds, setTotalRounds] = useState(10);
  const [players, setPlayers] = useState(mockPlayers);
  const [showSettings, setShowSettings] = useState(!currentQuestion);
  const [showRanking, setShowRanking] = useState(false);
  
  // Check if user is authorized to be on this page
  useEffect(() => {
    if (!roomId || !isTeacher) {
      navigate('/');
      toast.error("Você precisa entrar como professor");
    }
  }, [roomId, isTeacher, navigate]);
  
  // Start a new round with a new question
  const startNewRound = () => {
    // Verificar se há famílias selecionadas
    if (selectedFamilies.length === 0) {
      toast.error("Selecione pelo menos uma família de elementos");
      return;
    }
    
    // Generate a new question from the selected families
    const newQuestion = generateQuestion(selectedFamilies);
    setCurrentQuestion(newQuestion);
    setShowResults(false);
    setRoundActive(true);
    setShowSettings(false);
    setShowRanking(false);
    
    // In real app, this would emit the new question to all students
    console.log("Starting new round", newQuestion);
  };
  
  // Handle timer completion
  const handleTimeUp = () => {
    setRoundActive(false);
    setShowResults(true);
    setShowRanking(true);
    
    // In real app, this would tell all clients to show results
    // Only increment round number here, not in handleNextRound
    // This fixes the bug where round was incrementing twice
  };
  
  // Next round or finish game
  const handleNextRound = () => {
    // Increment round number here
    const nextRound = roundNumber + 1;
    
    if (nextRound <= totalRounds) {
      setRoundNumber(nextRound);
      startNewRound();
    } else {
      // End game logic here
      toast.success("Jogo finalizado!");
      // Reset the game state and navigate to home
      setRoomId(null);
      setUserName(null);
      setIsTeacher(false);
      navigate('/');
    }
  };
  
  const toggleFamilySelection = (family: ElementFamily) => {
    setSelectedFamilies(current => {
      if (current.includes(family)) {
        return current.filter(f => f !== family);
      } else {
        return [...current, family];
      }
    });
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
          {!roundActive && (
            <Button 
              variant={showSettings ? "outline" : "default"}
              onClick={() => setShowSettings(!showSettings)}
              className="mt-2 sm:mt-0"
            >
              {showSettings ? "Ocultar Configurações" : "Configurações"}
            </Button>
          )}
        </div>
      </div>
      
      {/* Main content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Left column - Game controls */}
        <div className="md:col-span-2">
          {/* Settings panel */}
          {showSettings && !roundActive && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Configurações</h2>
              
              {/* Time settings */}
              <div className="mb-8">
                <h3 className="font-medium mb-2">Tempo por questão: {timePerQuestion} segundos</h3>
                <Slider 
                  value={[timePerQuestion]} 
                  min={5} 
                  max={60} 
                  step={5}
                  onValueChange={(value) => setTimePerQuestion(value[0])} 
                  className="w-full max-w-sm"
                />
              </div>
              
              {/* Total rounds settings */}
              <div className="mb-8">
                <h3 className="font-medium mb-2">Número total de rodadas: {totalRounds}</h3>
                <Slider 
                  value={[totalRounds]} 
                  min={5} 
                  max={30} 
                  step={5}
                  onValueChange={(value) => setTotalRounds(value[0])} 
                  className="w-full max-w-sm"
                />
              </div>
              
              {/* Element family selection */}
              <div>
                <h3 className="font-medium mb-2">Famílias de elementos:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                  {ELEMENT_FAMILIES.map(family => (
                    <div key={family} className="flex items-center space-x-2">
                      <Switch 
                        id={`switch-${family}`} 
                        checked={selectedFamilies.includes(family)}
                        onCheckedChange={() => toggleFamilySelection(family)}
                      />
                      <Label htmlFor={`switch-${family}`}>{family}</Label>
                    </div>
                  ))}
                </div>
                {selectedFamilies.length === 0 && (
                  <p className="text-red-500 text-sm mt-2">Selecione pelo menos uma família</p>
                )}
              </div>
            </div>
          )}
          
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
            ) : currentQuestion ? (
              <div className="flex justify-center">
                <Button onClick={startNewRound} size="lg">
                  Iniciar Próxima Rodada
                </Button>
              </div>
            ) : null}
          </div>
        </div>
        
        {/* Right column - Score board (only show when results are displayed) */}
        <div>
          {showRanking && (
            <ScoreBoard players={players} limit={10} />
          )}
          {!showRanking && showResults && (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <h2 className="text-xl font-bold mb-3">Ranking</h2>
              <p>O ranking será exibido após o término da rodada.</p>
            </div>
          )}
          {!showResults && !showRanking && (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <h2 className="text-xl font-bold mb-3">Ranking</h2>
              <p>O ranking será exibido após o término da rodada.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherGame;
