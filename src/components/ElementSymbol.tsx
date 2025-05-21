
import React from 'react';
import { Element } from '@/data/elements';

interface ElementSymbolProps {
  element: Element;
  showDetails?: boolean;
}

const ElementSymbol: React.FC<ElementSymbolProps> = ({ 
  element, 
  showDetails = false 
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="border-4 border-gray-800 rounded-lg p-6 bg-white w-52 h-52 flex flex-col justify-center items-center">
        <div className="text-xs text-gray-500 self-start">{element.atomicNumber}</div>
        <div className="text-7xl font-bold text-gray-800">{element.symbol}</div>
        {showDetails && (
          <>
            <div className="text-md mt-1">{element.name}</div>
            <div className="text-xs mt-1 text-gray-500">{element.family}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default ElementSymbol;
