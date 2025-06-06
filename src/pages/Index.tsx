
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PeriodicTable from '@/components/PeriodicTable';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-indigo-700 flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 text-white text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">QuizQuímica</h1>
        <p className="text-xl md:text-2xl max-w-2xl mb-10">
          Aprenda os símbolos dos elementos químicos de forma interativa e divertida
        </p>
        
        <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex">
          <Button 
            onClick={() => navigate('/training')}
            className="bg-white text-blue-700 hover:bg-blue-50 text-lg px-8 py-6"
            size="lg"
          >
            Modo Padrão
          </Button>
          <Button 
            onClick={() => navigate('/training')}
            className="bg-blue-600 text-white hover:bg-blue-700 text-lg px-8 py-6 border-2 border-white"
            size="lg"
            variant="outline"
          >
            Modo Infinito
          </Button>
        </div>
      </div>
      
      {/* Features */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Como Funciona</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-blue-50 rounded-xl p-6 shadow-md">
              <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4 text-xl font-bold">1</div>
              <h3 className="text-xl font-bold mb-2">Escolha Seu Modo</h3>
              <p className="text-gray-600">
                Escolha entre o modo padrão e o modo infinito para praticar.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-blue-50 rounded-xl p-6 shadow-md">
              <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4 text-xl font-bold">2</div>
              <h3 className="text-xl font-bold mb-2">Responda às Perguntas</h3>
              <p className="text-gray-600">
                Identifique o nome correto do elemento a partir do seu símbolo químico.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-blue-50 rounded-xl p-6 shadow-md">
              <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4 text-xl font-bold">3</div>
              <h3 className="text-xl font-bold mb-2">Acompanhe Seu Progresso</h3>
              <p className="text-gray-600">
                Veja sua pontuação e aprenda com cada rodada do jogo.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Periodic Table Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8">Tabela Periódica - Elementos Representativos</h2>
          <p className="text-center text-gray-600 mb-8">
            Elementos em <span className="bg-blue-500 text-white px-2 py-1 rounded">azul</span> são famílias 1A-7A e 
            <span className="bg-purple-500 text-white px-2 py-1 rounded ml-2">roxo</span> são gases nobres
          </p>
          <PeriodicTable />
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="bg-gray-100 py-12 text-center">
        <h2 className="text-3xl font-bold mb-6">Pronto para Começar?</h2>
        <div className="space-x-4">
          <Button 
            onClick={() => navigate('/training')}
            className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6"
            size="lg"
          >
            Modo Padrão
          </Button>
          <Button 
            onClick={() => navigate('/training')}
            className="bg-green-600 hover:bg-green-700 text-lg px-8 py-6"
            size="lg"
          >
            Modo Infinito
          </Button>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 text-center text-sm">
        <p>© 2025 QuizQuímica - Desenvolvido para o ensino de química</p>
      </footer>
    </div>
  );
};

export default Index;
