
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft } from 'lucide-react';
import CountdownTimer from '@/components/CountdownTimer';
import GameResults from '@/components/GameResults';
import GameHeader from '@/components/GameHeader';
import GameQuestion from '@/components/GameQuestion';
import GameFeedback from '@/components/GameFeedback';
import { Element, ElementFamily, ELEMENT_FAMILIES, generateQuestion } from '@/data/elements';
import { toast } from 'sonner';

const TrainingMode = () => {
  const navigate = useNavigate();
  
  // Configuration state
  const [selectedFamilies, setSelectedFamilies] = useState<ElementFamily[]>([ElementFamily.FAMILY_1A, ElementFamily.FAMILY_7A]);
  const [timePerQuestion, setTimePerQuestion] = useState(20);
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);
  
  // Game state
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Element | null>(null);
  const [options, setOptions] = useState<Element[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<Element | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<Element | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [roundActive, setRoundActive] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [usedElements, setUsedElements] = useState<Element[]>([]);
  const [showSettings, setShowSettings] = useState(true);

  const generateNewQuestion = () => {
    if (selectedFamilies.length === 0) {
      toast.error("Selecione pelo menos uma família de elementos!");
      return;
    }

    const { question, options: questionOptions } = generateQuestion(selectedFamilies, usedElements);
    setCurrentQuestion(question);
    setOptions(questionOptions);
    setUsedElements(prev => [...prev, question]);
    setSelectedAnswer(null);
    setCorrectAnswer(null);
    setShowResults(false);
    setRoundActive(true);
    setHasAnswered(false);
  };

  const startGame = () => {
    if (selectedFamilies.length === 0) {
      toast.error("Selecione pelo menos uma família de elementos!");
      return;
    }
    
    setGameStarted(true);
    setScore(0);
    setCurrentQuestionNumber(1);
    setUsedElements([]);
    setGameFinished(false);
    setShowSettings(false);
    generateNewQuestion();
  };

  const nextQuestion = () => {
    if (currentQuestionNumber >= numberOfQuestions) {
      setGameFinished(true);
      setRoundActive(false);
      toast.success(`Treino concluído! Pontuação final: ${score}/${numberOfQuestions}`);
      return;
    }

    setCurrentQuestionNumber(prev => prev + 1);
    generateNewQuestion();
  };

  const handleAnswerSelect = (element: Element) => {
    if (hasAnswered || !roundActive) return;
    
    setSelectedAnswer(element);
    setHasAnswered(true);
    setRoundActive(false);
    setShowResults(true);
    setCorrectAnswer(currentQuestion);
    
    if (element.symbol === currentQuestion?.symbol) {
      setScore(prev => prev + 1);
      toast.success("Correto!");
    } else {
      toast.error("Incorreto!");
    }

    // Auto advance after 3 seconds
    setTimeout(() => {
      nextQuestion();
    }, 3000);
  };

  const handleTimeUp = () => {
    setRoundActive(false);
    setShowResults(true);
    setCorrectAnswer(currentQuestion);
    toast.warning("Tempo esgotado!");

    // Auto advance after 3 seconds
    setTimeout(() => {
      nextQuestion();
    }, 3000);
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameFinished(false);
    setCurrentQuestion(null);
    setOptions([]);
    setScore(0);
    setCurrentQuestionNumber(1);
    setUsedElements([]);
    setShowSettings(true);
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

  // Render game finished screen
  if (gameFinished) {
    return (
      <GameResults
        score={score}
        totalQuestions={numberOfQuestions}
        onResetGame={resetGame}
        onNavigateHome={() => navigate('/')}
      />
    );
  }

  // Render configuration screen
  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-blue-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <h1 className="text-3xl font-bold text-blue-800">Modo Treino</h1>
          </div>

          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Configurações do Treino</h2>
              <Button 
                variant={showSettings ? "outline" : "default"}
                onClick={() => setShowSettings(!showSettings)}
              >
                {showSettings ? "Ocultar Configurações" : "Mostrar Configurações"}
              </Button>
            </div>

            {/* Settings panel */}
            {showSettings && (
              <>
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
                
                {/* Total questions settings */}
                <div className="mb-8">
                  <h3 className="font-medium mb-2">Número de questões: {numberOfQuestions}</h3>
                  <Slider 
                    value={[numberOfQuestions]} 
                    min={5} 
                    max={30} 
                    step={5}
                    onValueChange={(value) => setNumberOfQuestions(value[0])} 
                    className="w-full max-w-sm"
                  />
                </div>
                
                {/* Element family selection */}
                <div className="mb-6">
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
              </>
            )}

            <div className="pt-6 border-t">
              <Button 
                onClick={startGame}
                className="w-full text-lg py-6"
                disabled={selectedFamilies.length === 0}
              >
                Iniciar Treino
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Render active game
  return (
    <div className="min-h-screen bg-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <GameHeader
          currentQuestionNumber={currentQuestionNumber}
          totalQuestions={numberOfQuestions}
          score={score}
        />

        {/* Timer */}
        <CountdownTimer 
          duration={timePerQuestion} 
          onTimeUp={handleTimeUp}
          isActive={roundActive}
          className="mb-6"
        />

        {/* Question and Options */}
        {currentQuestion && (
          <GameQuestion
            currentQuestion={currentQuestion}
            options={options}
            selectedAnswer={selectedAnswer}
            correctAnswer={correctAnswer}
            showResults={showResults}
            roundActive={roundActive}
            hasAnswered={hasAnswered}
            onAnswerSelect={handleAnswerSelect}
          />
        )}

        {/* Results */}
        <GameFeedback
          showResults={showResults}
          selectedAnswer={selectedAnswer}
          correctAnswer={correctAnswer}
          currentQuestionNumber={currentQuestionNumber}
          totalQuestions={numberOfQuestions}
        />
      </div>
    </div>
  );
};

export default TrainingMode;
