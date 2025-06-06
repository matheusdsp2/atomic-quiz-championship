
import React from 'react';
import { Card } from '@/components/ui/card';

interface ElementData {
  symbol: string;
  name: string;
  atomicNumber: number;
  family: string;
  isRepresentative: boolean;
  isNobleGas: boolean;
}

const elements: ElementData[] = [
  // Período 1
  { symbol: "H", name: "Hidrogênio", atomicNumber: 1, family: "1A", isRepresentative: true, isNobleGas: false },
  { symbol: "He", name: "Hélio", atomicNumber: 2, family: "8A", isRepresentative: false, isNobleGas: true },
  
  // Período 2
  { symbol: "Li", name: "Lítio", atomicNumber: 3, family: "1A", isRepresentative: true, isNobleGas: false },
  { symbol: "Be", name: "Berílio", atomicNumber: 4, family: "2A", isRepresentative: true, isNobleGas: false },
  { symbol: "B", name: "Boro", atomicNumber: 5, family: "3A", isRepresentative: true, isNobleGas: false },
  { symbol: "C", name: "Carbono", atomicNumber: 6, family: "4A", isRepresentative: true, isNobleGas: false },
  { symbol: "N", name: "Nitrogênio", atomicNumber: 7, family: "5A", isRepresentative: true, isNobleGas: false },
  { symbol: "O", name: "Oxigênio", atomicNumber: 8, family: "6A", isRepresentative: true, isNobleGas: false },
  { symbol: "F", name: "Flúor", atomicNumber: 9, family: "7A", isRepresentative: true, isNobleGas: false },
  { symbol: "Ne", name: "Neônio", atomicNumber: 10, family: "8A", isRepresentative: false, isNobleGas: true },
  
  // Período 3
  { symbol: "Na", name: "Sódio", atomicNumber: 11, family: "1A", isRepresentative: true, isNobleGas: false },
  { symbol: "Mg", name: "Magnésio", atomicNumber: 12, family: "2A", isRepresentative: true, isNobleGas: false },
  { symbol: "Al", name: "Alumínio", atomicNumber: 13, family: "3A", isRepresentative: true, isNobleGas: false },
  { symbol: "Si", name: "Silício", atomicNumber: 14, family: "4A", isRepresentative: true, isNobleGas: false },
  { symbol: "P", name: "Fósforo", atomicNumber: 15, family: "5A", isRepresentative: true, isNobleGas: false },
  { symbol: "S", name: "Enxofre", atomicNumber: 16, family: "6A", isRepresentative: true, isNobleGas: false },
  { symbol: "Cl", name: "Cloro", atomicNumber: 17, family: "7A", isRepresentative: true, isNobleGas: false },
  { symbol: "Ar", name: "Argônio", atomicNumber: 18, family: "8A", isRepresentative: false, isNobleGas: true },
  
  // Período 4
  { symbol: "K", name: "Potássio", atomicNumber: 19, family: "1A", isRepresentative: true, isNobleGas: false },
  { symbol: "Ca", name: "Cálcio", atomicNumber: 20, family: "2A", isRepresentative: true, isNobleGas: false },
  { symbol: "Ga", name: "Gálio", atomicNumber: 31, family: "3A", isRepresentative: true, isNobleGas: false },
  { symbol: "Ge", name: "Germânio", atomicNumber: 32, family: "4A", isRepresentative: true, isNobleGas: false },
  { symbol: "As", name: "Arsênio", atomicNumber: 33, family: "5A", isRepresentative: true, isNobleGas: false },
  { symbol: "Se", name: "Selênio", atomicNumber: 34, family: "6A", isRepresentative: true, isNobleGas: false },
  { symbol: "Br", name: "Bromo", atomicNumber: 35, family: "7A", isRepresentative: true, isNobleGas: false },
  { symbol: "Kr", name: "Criptônio", atomicNumber: 36, family: "8A", isRepresentative: false, isNobleGas: true },
  
  // Período 5
  { symbol: "Rb", name: "Rubídio", atomicNumber: 37, family: "1A", isRepresentative: true, isNobleGas: false },
  { symbol: "Sr", name: "Estrôncio", atomicNumber: 38, family: "2A", isRepresentative: true, isNobleGas: false },
  { symbol: "In", name: "Índio", atomicNumber: 49, family: "3A", isRepresentative: true, isNobleGas: false },
  { symbol: "Sn", name: "Estanho", atomicNumber: 50, family: "4A", isRepresentative: true, isNobleGas: false },
  { symbol: "Sb", name: "Antimônio", atomicNumber: 51, family: "5A", isRepresentative: true, isNobleGas: false },
  { symbol: "Te", name: "Telúrio", atomicNumber: 52, family: "6A", isRepresentative: true, isNobleGas: false },
  { symbol: "I", name: "Iodo", atomicNumber: 53, family: "7A", isRepresentative: true, isNobleGas: false },
  { symbol: "Xe", name: "Xenônio", atomicNumber: 54, family: "8A", isRepresentative: false, isNobleGas: true },
  
  // Período 6
  { symbol: "Cs", name: "Césio", atomicNumber: 55, family: "1A", isRepresentative: true, isNobleGas: false },
  { symbol: "Ba", name: "Bário", atomicNumber: 56, family: "2A", isRepresentative: true, isNobleGas: false },
  { symbol: "Tl", name: "Tálio", atomicNumber: 81, family: "3A", isRepresentative: true, isNobleGas: false },
  { symbol: "Pb", name: "Chumbo", atomicNumber: 82, family: "4A", isRepresentative: true, isNobleGas: false },
  { symbol: "Bi", name: "Bismuto", atomicNumber: 83, family: "5A", isRepresentative: true, isNobleGas: false },
  { symbol: "Po", name: "Polônio", atomicNumber: 84, family: "6A", isRepresentative: true, isNobleGas: false },
  { symbol: "At", name: "Astato", atomicNumber: 85, family: "7A", isRepresentative: true, isNobleGas: false },
  { symbol: "Rn", name: "Radônio", atomicNumber: 86, family: "8A", isRepresentative: false, isNobleGas: true },
];

const PeriodicTable = () => {
  const getElementByAtomicNumber = (atomicNumber: number): ElementData | null => {
    return elements.find(el => el.atomicNumber === atomicNumber) || null;
  };

  const ElementCell = ({ element }: { element: ElementData }) => {
    let bgColor = "bg-gray-100";
    if (element.isRepresentative) {
      bgColor = "bg-blue-500 text-white";
    } else if (element.isNobleGas) {
      bgColor = "bg-purple-500 text-white";
    }

    return (
      <Card className={`p-2 text-center ${bgColor} min-w-[60px] h-16 flex flex-col justify-center items-center text-xs hover:shadow-lg transition-shadow cursor-pointer`}>
        <div className="font-bold text-sm">{element.symbol}</div>
        <div className="text-[10px] opacity-80">{element.atomicNumber}</div>
      </Card>
    );
  };

  const EmptyCell = () => (
    <div className="min-w-[60px] h-16"></div>
  );

  const renderElementOrEmpty = (atomicNumber: number) => {
    const element = getElementByAtomicNumber(atomicNumber);
    return element ? <ElementCell element={element} /> : <EmptyCell />;
  };

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[800px] space-y-2">
        {/* Headers */}
        <div className="grid grid-cols-18 gap-1 mb-4">
          <div className="text-center font-bold text-sm">1A</div>
          <div className="text-center font-bold text-sm">2A</div>
          <div></div><div></div><div></div><div></div><div></div><div></div>
          <div></div><div></div><div></div><div></div>
          <div className="text-center font-bold text-sm">3A</div>
          <div className="text-center font-bold text-sm">4A</div>
          <div className="text-center font-bold text-sm">5A</div>
          <div className="text-center font-bold text-sm">6A</div>
          <div className="text-center font-bold text-sm">7A</div>
          <div className="text-center font-bold text-sm">8A</div>
        </div>

        {/* Período 1 */}
        <div className="grid grid-cols-18 gap-1">
          {renderElementOrEmpty(1)}
          <EmptyCell /><EmptyCell /><EmptyCell /><EmptyCell /><EmptyCell /><EmptyCell /><EmptyCell />
          <EmptyCell /><EmptyCell /><EmptyCell /><EmptyCell /><EmptyCell /><EmptyCell /><EmptyCell /><EmptyCell /><EmptyCell />
          {renderElementOrEmpty(2)}
        </div>

        {/* Período 2 */}
        <div className="grid grid-cols-18 gap-1">
          {renderElementOrEmpty(3)}
          {renderElementOrEmpty(4)}
          <EmptyCell /><EmptyCell /><EmptyCell /><EmptyCell /><EmptyCell /><EmptyCell />
          <EmptyCell /><EmptyCell /><EmptyCell /><EmptyCell />
          {renderElementOrEmpty(5)}
          {renderElementOrEmpty(6)}
          {renderElementOrEmpty(7)}
          {renderElementOrEmpty(8)}
          {renderElementOrEmpty(9)}
          {renderElementOrEmpty(10)}
        </div>

        {/* Período 3 */}
        <div className="grid grid-cols-18 gap-1">
          {renderElementOrEmpty(11)}
          {renderElementOrEmpty(12)}
          <EmptyCell /><EmptyCell /><EmptyCell /><EmptyCell /><EmptyCell /><EmptyCell />
          <EmptyCell /><EmptyCell /><EmptyCell /><EmptyCell />
          {renderElementOrEmpty(13)}
          {renderElementOrEmpty(14)}
          {renderElementOrEmpty(15)}
          {renderElementOrEmpty(16)}
          {renderElementOrEmpty(17)}
          {renderElementOrEmpty(18)}
        </div>

        {/* Período 4 */}
        <div className="grid grid-cols-18 gap-1">
          {renderElementOrEmpty(19)}
          {renderElementOrEmpty(20)}
          <EmptyCell /><EmptyCell /><EmptyCell /><EmptyCell /><EmptyCell /><EmptyCell />
          <EmptyCell /><EmptyCell /><EmptyCell /><EmptyCell />
          {renderElementOrEmpty(31)}
          {renderElementOrEmpty(32)}
          {renderElementOrEmpty(33)}
          {renderElementOrEmpty(34)}
          {renderElementOrEmpty(35)}
          {renderElementOrEmpty(36)}
        </div>

        {/* Período 5 */}
        <div className="grid grid-cols-18 gap-1">
          {renderElementOrEmpty(37)}
          {renderElementOrEmpty(38)}
          <EmptyCell /><EmptyCell /><EmptyCell /><EmptyCell /><EmptyCell /><EmptyCell />
          <EmptyCell /><EmptyCell /><EmptyCell /><EmptyCell />
          {renderElementOrEmpty(49)}
          {renderElementOrEmpty(50)}
          {renderElementOrEmpty(51)}
          {renderElementOrEmpty(52)}
          {renderElementOrEmpty(53)}
          {renderElementOrEmpty(54)}
        </div>

        {/* Período 6 */}
        <div className="grid grid-cols-18 gap-1">
          {renderElementOrEmpty(55)}
          {renderElementOrEmpty(56)}
          <EmptyCell /><EmptyCell /><EmptyCell /><EmptyCell /><EmptyCell /><EmptyCell />
          <EmptyCell /><EmptyCell /><EmptyCell /><EmptyCell />
          {renderElementOrEmpty(81)}
          {renderElementOrEmpty(82)}
          {renderElementOrEmpty(83)}
          {renderElementOrEmpty(84)}
          {renderElementOrEmpty(85)}
          {renderElementOrEmpty(86)}
        </div>

        {/* Legenda */}
        <div className="flex justify-center space-x-6 mt-6">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-sm">Famílias 1A - 7A</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-purple-500 rounded"></div>
            <span className="text-sm">Gases Nobres (8A)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeriodicTable;
