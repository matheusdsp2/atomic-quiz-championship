
export interface Element {
  symbol: string;
  name: string;
  atomicNumber: number;
  family: ElementFamily;
}

export enum ElementFamily {
  FAMILY_1A = "Família 1A",
  FAMILY_2A = "Família 2A", 
  FAMILY_3A = "Família 3A",
  FAMILY_4A = "Família 4A",
  FAMILY_5A = "Família 5A",
  FAMILY_6A = "Família 6A",
  FAMILY_7A = "Família 7A",
  NOBLE_GASES = "Gases Nobres"
}

export const ELEMENT_FAMILIES = Object.values(ElementFamily);

export const PERIODIC_TABLE: Element[] = [
  // Família 1A (Metais Alcalinos)
  { symbol: "H", name: "Hidrogênio", atomicNumber: 1, family: ElementFamily.FAMILY_1A },
  { symbol: "Li", name: "Lítio", atomicNumber: 3, family: ElementFamily.FAMILY_1A },
  { symbol: "Na", name: "Sódio", atomicNumber: 11, family: ElementFamily.FAMILY_1A },
  { symbol: "K", name: "Potássio", atomicNumber: 19, family: ElementFamily.FAMILY_1A },
  { symbol: "Rb", name: "Rubídio", atomicNumber: 37, family: ElementFamily.FAMILY_1A },
  { symbol: "Cs", name: "Césio", atomicNumber: 55, family: ElementFamily.FAMILY_1A },
  { symbol: "Fr", name: "Frâncio", atomicNumber: 87, family: ElementFamily.FAMILY_1A },

  // Família 2A (Metais Alcalino-Terrosos)
  { symbol: "Be", name: "Berílio", atomicNumber: 4, family: ElementFamily.FAMILY_2A },
  { symbol: "Mg", name: "Magnésio", atomicNumber: 12, family: ElementFamily.FAMILY_2A },
  { symbol: "Ca", name: "Cálcio", atomicNumber: 20, family: ElementFamily.FAMILY_2A },
  { symbol: "Sr", name: "Estrôncio", atomicNumber: 38, family: ElementFamily.FAMILY_2A },
  { symbol: "Ba", name: "Bário", atomicNumber: 56, family: ElementFamily.FAMILY_2A },
  { symbol: "Ra", name: "Rádio", atomicNumber: 88, family: ElementFamily.FAMILY_2A },

  // Família 3A
  { symbol: "B", name: "Boro", atomicNumber: 5, family: ElementFamily.FAMILY_3A },
  { symbol: "Al", name: "Alumínio", atomicNumber: 13, family: ElementFamily.FAMILY_3A },
  { symbol: "Ga", name: "Gálio", atomicNumber: 31, family: ElementFamily.FAMILY_3A },
  { symbol: "In", name: "Índio", atomicNumber: 49, family: ElementFamily.FAMILY_3A },
  { symbol: "Tl", name: "Tálio", atomicNumber: 81, family: ElementFamily.FAMILY_3A },

  // Família 4A
  { symbol: "C", name: "Carbono", atomicNumber: 6, family: ElementFamily.FAMILY_4A },
  { symbol: "Si", name: "Silício", atomicNumber: 14, family: ElementFamily.FAMILY_4A },
  { symbol: "Ge", name: "Germânio", atomicNumber: 32, family: ElementFamily.FAMILY_4A },
  { symbol: "Sn", name: "Estanho", atomicNumber: 50, family: ElementFamily.FAMILY_4A },
  { symbol: "Pb", name: "Chumbo", atomicNumber: 82, family: ElementFamily.FAMILY_4A },

  // Família 5A
  { symbol: "N", name: "Nitrogênio", atomicNumber: 7, family: ElementFamily.FAMILY_5A },
  { symbol: "P", name: "Fósforo", atomicNumber: 15, family: ElementFamily.FAMILY_5A },
  { symbol: "As", name: "Arsênio", atomicNumber: 33, family: ElementFamily.FAMILY_5A },
  { symbol: "Sb", name: "Antimônio", atomicNumber: 51, family: ElementFamily.FAMILY_5A },
  { symbol: "Bi", name: "Bismuto", atomicNumber: 83, family: ElementFamily.FAMILY_5A },

  // Família 6A (Calcogênios)
  { symbol: "O", name: "Oxigênio", atomicNumber: 8, family: ElementFamily.FAMILY_6A },
  { symbol: "S", name: "Enxofre", atomicNumber: 16, family: ElementFamily.FAMILY_6A },
  { symbol: "Se", name: "Selênio", atomicNumber: 34, family: ElementFamily.FAMILY_6A },
  { symbol: "Te", name: "Telúrio", atomicNumber: 52, family: ElementFamily.FAMILY_6A },
  { symbol: "Po", name: "Polônio", atomicNumber: 84, family: ElementFamily.FAMILY_6A },

  // Família 7A (Halogênios)
  { symbol: "F", name: "Flúor", atomicNumber: 9, family: ElementFamily.FAMILY_7A },
  { symbol: "Cl", name: "Cloro", atomicNumber: 17, family: ElementFamily.FAMILY_7A },
  { symbol: "Br", name: "Bromo", atomicNumber: 35, family: ElementFamily.FAMILY_7A },
  { symbol: "I", name: "Iodo", atomicNumber: 53, family: ElementFamily.FAMILY_7A },
  { symbol: "At", name: "Astato", atomicNumber: 85, family: ElementFamily.FAMILY_7A },

  // Gases Nobres
  { symbol: "He", name: "Hélio", atomicNumber: 2, family: ElementFamily.NOBLE_GASES },
  { symbol: "Ne", name: "Neônio", atomicNumber: 10, family: ElementFamily.NOBLE_GASES },
  { symbol: "Ar", name: "Argônio", atomicNumber: 18, family: ElementFamily.NOBLE_GASES },
  { symbol: "Kr", name: "Criptônio", atomicNumber: 36, family: ElementFamily.NOBLE_GASES },
  { symbol: "Xe", name: "Xenônio", atomicNumber: 54, family: ElementFamily.NOBLE_GASES },
  { symbol: "Rn", name: "Radônio", atomicNumber: 86, family: ElementFamily.NOBLE_GASES }
];

export function getElementsByFamily(family: ElementFamily): Element[] {
  return PERIODIC_TABLE.filter(element => element.family === family);
}

export function getElementBySymbol(symbol: string): Element | undefined {
  return PERIODIC_TABLE.find(element => element.symbol === symbol);
}

export function generateQuestion(
  selectedFamilies: ElementFamily[],
  excludeElements: Element[] = []
): { question: Element; options: Element[] } {
  // Get elements from selected families for questions
  const availableElements = PERIODIC_TABLE.filter(
    element => 
      selectedFamilies.includes(element.family) && 
      !excludeElements.some(e => e.symbol === element.symbol)
  );

  if (availableElements.length === 0) {
    // Fallback if no elements are available
    const randomElement = PERIODIC_TABLE[Math.floor(Math.random() * PERIODIC_TABLE.length)];
    return {
      question: randomElement,
      options: [randomElement, ...PERIODIC_TABLE.filter(e => e.symbol !== randomElement.symbol).slice(0, 3)]
    };
  }

  // Select random element as question
  const questionElement = availableElements[Math.floor(Math.random() * availableElements.length)];

  // Get all other elements (from any family) for wrong options
  const otherElements = PERIODIC_TABLE.filter(
    element => element.symbol !== questionElement.symbol
  );
  
  // Shuffle and get exactly 3 wrong options
  const shuffled = otherElements.sort(() => 0.5 - Math.random());
  const wrongOptions = shuffled.slice(0, 3);

  // Ensure we always have exactly 4 options
  const allOptions = [questionElement, ...wrongOptions];
  
  // If somehow we don't have 4 options, fill with random elements
  while (allOptions.length < 4) {
    const randomElement = PERIODIC_TABLE[Math.floor(Math.random() * PERIODIC_TABLE.length)];
    if (!allOptions.find(opt => opt.symbol === randomElement.symbol)) {
      allOptions.push(randomElement);
    }
  }

  // Shuffle the final options and ensure exactly 4
  const finalOptions = allOptions.slice(0, 4).sort(() => 0.5 - Math.random());

  return {
    question: questionElement,
    options: finalOptions
  };
}
