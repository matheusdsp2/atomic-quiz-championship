
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft } from 'lucide-react';
import { ElementFamily, ELEMENT_FAMILIES } from '@/data/elements';

interface GameConfigurationProps {
  selectedFamilies: ElementFamily[];
  timePerQuestion: number;
  numberOfQuestions: number;
  showSettings: boolean;
  onFamilyToggle: (family: ElementFamily) => void;
  onTimeChange: (time: number) => void;
  onQuestionsChange: (questions: number) => void;
  onToggleSettings: () => void;
  onStartGame: () => void;
  onNavigateBack: () => void;
}

const GameConfiguration: React.FC<GameConfigurationProps> = ({
  selectedFamilies,
  timePerQuestion,
  numberOfQuestions,
  showSettings,
  onFamilyToggle,
  onTimeChange,
  onQuestionsChange,
  onToggleSettings,
  onStartGame,
  onNavigateBack
}) => {
  return (
    <div className="min-h-screen bg-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={onNavigateBack}
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
              onClick={onToggleSettings}
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
                  onValueChange={(value) => onTimeChange(value[0])} 
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
                  onValueChange={(value) => onQuestionsChange(value[0])} 
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
                        onCheckedChange={() => onFamilyToggle(family)}
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
              onClick={onStartGame}
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
};

export default GameConfiguration;
