import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import CountdownTimer from '@/components/CountdownTimer';
import GameHeader from '@/components/GameHeader';
import GameQuestion from '@/components/GameQuestion';
import GameFeedback from '@/components/GameFeedback';
import { Element, ElementFamily, ELEMENT_FAMILIES, generateQuestion } from '@/data/elements';
import { toast } from 'sonner';

const InfiniteMode = () => {
  const navigate = useNavigate();
  
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
  const [timePerQuestion, setTimePerQuestion] = useState(20);

  // Calculate current time based on score
  const calculateCurrentTime = (currentScore: number) => {
    const timeReductions = Math.floor(currentScore / 10);
    const newTime = 20 - (timeReductions * 5);
    return Math.max(5, newTime); // Minimum 5 seconds
  };

  const generateNewQuestion = () => {
    // Use all families for infinite mode
    const { question, options: questionOptions } = generateQuestion(ELEMENT_FAMILIES, usedElements);
    setCurrentQuestion(question);
    setOptions(questionOptions);
    setUsedElements(prev => [...prev, question]);
    setSelectedAnswer(null);
    setCorrectAnswer(null);
    setShowResults(false);
    setRoundActive(true);
    setHasAnswered(false);
    
    // Update time based on current score
    const newTime = calculateCurrentTime(score);
    setTimePerQuestion(newTime);
  };

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setCurrentQuestionNumber(1);
    setUsedElements([]);
    setGameFinished(false);
    setTimePerQuestion(20);
    generateNewQuestion();
  };

  const nextQuestion = () => {
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
      
      // Check if time should decrease
      const newScore = score + 1;
      if (newScore % 10 === 0 && newScore > 0) {
        const newTime = calculateCurrentTime(newScore);
        if (newTime < timePerQuestion) {
          toast.info(`Velocidade aumentou! Agora você tem ${newTime} segundos por pergunta.`);
        }
      }
      
      // Auto advance after 2 seconds
      setTimeout(() => {
        nextQuestion();
      }, 2000);
    } else {
      toast.error("Incorreto! Jogo finalizado.");
      
      // End game on wrong answer
      setTimeout(() => {
        setGameFinished(true);
        setRoundActive(false);
        toast.warning(`Modo Infinito finalizado! Pontuação final: ${score}`);
      }, 2000);
    }
  };

  const handleTimeUp = () => {
    setRoundActive(false);
    setShowResults(true);
    setCorrectAnswer(currentQuestion);
    toast.error("Tempo esgotado! Jogo finalizado.");

    // End game on time up
    setTimeout(() => {
      setGameFinished(true);
      toast.warning(`Modo Infinito finalizado! Pontuação final: ${score}`);
    }, 2000);
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameFinished(false);
    setCurrentQuestion(null);
    setOptions([]);
    setScore(0);
    setCurrentQuestionNumber(1);
    setUsedElements([]);
    setTimePerQuestion(20);
  };

  // Get performance message based on score
  const getPerformanceMessage = (score: number) => {
    if (score >= 50) return "🧪 Químico Nato!";
    if (score >= 40) return "🏆 Mestre dos Elementos!";
    if (score >= 30) return "🌟 Expert em Química!";
    if (score >= 20) return "💎 Excelente Desempenho!";
    if (score >= 10) return "👏 Muito Bem!";
    if (score >= 5) return "✨ Bom Trabalho!";
    return "💪 Continue Praticando!";
  };

  // Render game finished screen
  if (gameFinished) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-500 to-emerald-700 p-4 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 shadow-lg max-w-md w-full text-center">
          <h2 className="text-2xl font-bold mb-4">Modo Infinito Concluído!</h2>
          
          <div className="bg-green-50 rounded-lg p-6 mb-6">
            <div className="text-3xl mb-2">{getPerformanceMessage(score)}</div>
            <p className="text-lg text-gray-700 mb-2">Questões respondidas:</p>
            <p className="text-5xl font-bold text-green-700">{score}</p>
          </div>
          
          <div className="space-y-3">
            <Button onClick={resetGame} className="w-full bg-green-600 hover:bg-green-700">
              Jogar Novamente
            </Button>
            <Button variant="outline" onClick={() => navigate('/')} className="w-full">
              Voltar ao Menu
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Render start screen
  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-500 to-emerald-700 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="mr-4 text-white hover:bg-white/20"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <h1 className="text-3xl font-bold text-white">Modo Infinito</h1>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6">Modo Infinito</h2>
            
            <div className="space-y-4 mb-8">
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-bold text-green-800 mb-2">🎯 Objetivo</h3>
                <p className="text-green-700">Responda corretamente o máximo de perguntas possível!</p>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-bold text-blue-800 mb-2">⚡ Como Funciona</h3>
                <ul className="text-blue-700 space-y-1">
                  <li>• Todas as famílias de elementos estão incluídas</li>
                  <li>• Comece com 20 segundos por pergunta</li>
                  <li>• A cada 10 acertos, o tempo diminui em 5 segundos</li>
                  <li>• O jogo termina ao errar uma pergunta</li>
                </ul>
              </div>
              
              <div className="bg-red-50 rounded-lg p-4">
                <h3 className="font-bold text-red-800 mb-2">⚠️ Atenção</h3>
                <p className="text-red-700">Uma resposta errada ou tempo esgotado finaliza o jogo!</p>
              </div>
            </div>

            <Button 
              onClick={startGame}
              className="w-full text-lg py-6 bg-green-600 hover:bg-green-700"
            >
              Iniciar Modo Infinito
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Render active game
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-500 to-emerald-700 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg p-4 mb-4 shadow-lg">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-sm font-medium text-gray-500">Pergunta</h2>
              <p className="font-bold text-lg">{currentQuestionNumber}</p>
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-500">Pontuação</h2>
              <p className="font-bold text-lg">{score}</p>
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-500">Tempo Atual</h2>
              <p className="font-bold text-lg">{timePerQuestion}s</p>
            </div>
          </div>
        </div>

        {/* Timer */}
        <CountdownTimer 
          duration={timePerQuestion} 
          onTimeUp={handleTimeUp}
          isActive={roundActive}
          className="mb-6"
        />

        {/* Question and Options */}
        {currentQuestion && (
          <div className="bg-white rounded-lg p-6 shadow-lg">
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
          </div>
        )}

        {/* Results */}
        <GameFeedback
          showResults={showResults}
          selectedAnswer={selectedAnswer}
          correctAnswer={correctAnswer}
          currentQuestionNumber={currentQuestionNumber}
          totalQuestions={0} // No total in infinite mode
        />
      </div>
    </div>
  );
};

export default InfiniteMode;
