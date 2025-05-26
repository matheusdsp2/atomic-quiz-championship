
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CountdownTimer from '@/components/CountdownTimer';
import GameConfiguration from '@/components/GameConfiguration';
import GameResults from '@/components/GameResults';
import GameHeader from '@/components/GameHeader';
import GameQuestion from '@/components/GameQuestion';
import GameFeedback from '@/components/GameFeedback';
import { Element, ElementFamily, generateQuestion } from '@/data/elements';
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
      <GameConfiguration
        selectedFamilies={selectedFamilies}
        timePerQuestion={timePerQuestion}
        numberOfQuestions={numberOfQuestions}
        showSettings={showSettings}
        onFamilyToggle={toggleFamilySelection}
        onTimeChange={setTimePerQuestion}
        onQuestionsChange={setNumberOfQuestions}
        onToggleSettings={() => setShowSettings(!showSettings)}
        onStartGame={startGame}
        onNavigateBack={() => navigate('/')}
      />
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
