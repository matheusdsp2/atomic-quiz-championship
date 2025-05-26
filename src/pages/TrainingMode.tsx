
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import ElementSymbol from '@/components/ElementSymbol';
import AnswerOptions from '@/components/AnswerOptions';
import CountdownTimer from '@/components/CountdownTimer';
import { Element, ElementFamily, generateQuestion, ELEMENT_FAMILIES } from '@/data/elements';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';

const TrainingMode = () => {
  const navigate = useNavigate();
  
  // Configuration state
  const [selectedFamilies, setSelectedFamilies] = useState<ElementFamily[]>([]);
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
  };

  if (gameFinished) {
    return (
      <div className="min-h-screen bg-blue-50 p-4 flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold mb-4">Treino Concluído!</h2>
          <div className="bg-blue-100 rounded-lg p-6 mb-6">
            <p className="text-lg text-gray-700 mb-2">Sua pontuação:</p>
            <p className="text-4xl font-bold text-blue-700">{score}/{numberOfQuestions}</p>
            <p className="text-sm text-gray-600 mt-2">
              {Math.round((score / numberOfQuestions) * 100)}% de acertos
            </p>
          </div>
          <div className="space-y-3">
            <Button onClick={resetGame} className="w-full">
              Treinar Novamente
            </Button>
            <Button variant="outline" onClick={() => navigate('/')} className="w-full">
              Voltar ao Menu
            </Button>
          </div>
        </Card>
      </div>
    );
  }

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
            <Tabs defaultValue="families" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="families">Famílias de Elementos</TabsTrigger>
                <TabsTrigger value="settings">Configurações</TabsTrigger>
              </TabsList>
              
              <TabsContent value="families" className="space-y-4">
                <div>
                  <Label className="text-lg font-semibold mb-4 block">
                    Selecione as famílias de elementos para o treino:
                  </Label>
                  <ToggleGroup 
                    type="multiple" 
                    value={selectedFamilies} 
                    onValueChange={setSelectedFamilies}
                    className="grid grid-cols-2 md:grid-cols-3 gap-2"
                  >
                    {ELEMENT_FAMILIES.map((family) => (
                      <ToggleGroupItem 
                        key={family} 
                        value={family}
                        className="text-sm h-auto p-3 text-center"
                      >
                        {family}
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>
                  <p className="text-sm text-gray-600 mt-2">
                    {selectedFamilies.length} família(s) selecionada(s)
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="settings" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="time" className="text-sm font-medium">
                      Tempo por pergunta (segundos)
                    </Label>
                    <Input
                      id="time"
                      type="number"
                      min="5"
                      max="60"
                      value={timePerQuestion}
                      onChange={(e) => setTimePerQuestion(Number(e.target.value))}
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="questions" className="text-sm font-medium">
                      Número de perguntas
                    </Label>
                    <Input
                      id="questions"
                      type="number"
                      min="1"
                      max="50"
                      value={numberOfQuestions}
                      onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
                      className="mt-1"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-6 pt-6 border-t">
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

  return (
    <div className="min-h-screen bg-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <Card className="p-4 mb-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-sm font-medium text-gray-500">Pergunta</h2>
              <p className="font-bold text-lg">{currentQuestionNumber} de {numberOfQuestions}</p>
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-500">Pontuação</h2>
              <p className="font-bold text-lg">{score}</p>
            </div>
          </div>
        </Card>

        {/* Timer */}
        <CountdownTimer 
          duration={timePerQuestion} 
          onTimeUp={handleTimeUp}
          isActive={roundActive}
          className="mb-6"
        />

        {/* Question */}
        {currentQuestion && (
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
        )}

        {/* Options */}
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

        {/* Results */}
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
            <p className="mt-2 text-gray-600">
              {currentQuestionNumber < numberOfQuestions 
                ? "Próxima pergunta em instantes..." 
                : "Finalizando treino..."
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainingMode;
