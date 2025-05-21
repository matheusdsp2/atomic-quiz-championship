
export interface Element {
  symbol: string;
  name: string;
  atomicNumber: number;
  family: ElementFamily;
}

export enum ElementFamily {
  ALKALI_METALS = "Metais Alcalinos",
  ALKALINE_EARTH_METALS = "Metais Alcalino-Terrosos",
  TRANSITION_METALS = "Metais de Transição",
  POST_TRANSITION_METALS = "Metais Representativos",
  METALLOIDS = "Semimetais",
  NONMETALS = "Não Metais",
  HALOGENS = "Halogênios",
  NOBLE_GASES = "Gases Nobres",
  LANTHANIDES = "Lantanídeos",
  ACTINIDES = "Actinídeos"
}

export const ELEMENT_FAMILIES = Object.values(ElementFamily);

export const PERIODIC_TABLE: Element[] = [
  { symbol: "H", name: "Hidrogênio", atomicNumber: 1, family: ElementFamily.NONMETALS },
  { symbol: "He", name: "Hélio", atomicNumber: 2, family: ElementFamily.NOBLE_GASES },
  { symbol: "Li", name: "Lítio", atomicNumber: 3, family: ElementFamily.ALKALI_METALS },
  { symbol: "Be", name: "Berílio", atomicNumber: 4, family: ElementFamily.ALKALINE_EARTH_METALS },
  { symbol: "B", name: "Boro", atomicNumber: 5, family: ElementFamily.METALLOIDS },
  { symbol: "C", name: "Carbono", atomicNumber: 6, family: ElementFamily.NONMETALS },
  { symbol: "N", name: "Nitrogênio", atomicNumber: 7, family: ElementFamily.NONMETALS },
  { symbol: "O", name: "Oxigênio", atomicNumber: 8, family: ElementFamily.NONMETALS },
  { symbol: "F", name: "Flúor", atomicNumber: 9, family: ElementFamily.HALOGENS },
  { symbol: "Ne", name: "Neônio", atomicNumber: 10, family: ElementFamily.NOBLE_GASES },
  { symbol: "Na", name: "Sódio", atomicNumber: 11, family: ElementFamily.ALKALI_METALS },
  { symbol: "Mg", name: "Magnésio", atomicNumber: 12, family: ElementFamily.ALKALINE_EARTH_METALS },
  { symbol: "Al", name: "Alumínio", atomicNumber: 13, family: ElementFamily.POST_TRANSITION_METALS },
  { symbol: "Si", name: "Silício", atomicNumber: 14, family: ElementFamily.METALLOIDS },
  { symbol: "P", name: "Fósforo", atomicNumber: 15, family: ElementFamily.NONMETALS },
  { symbol: "S", name: "Enxofre", atomicNumber: 16, family: ElementFamily.NONMETALS },
  { symbol: "Cl", name: "Cloro", atomicNumber: 17, family: ElementFamily.HALOGENS },
  { symbol: "Ar", name: "Argônio", atomicNumber: 18, family: ElementFamily.NOBLE_GASES },
  { symbol: "K", name: "Potássio", atomicNumber: 19, family: ElementFamily.ALKALI_METALS },
  { symbol: "Ca", name: "Cálcio", atomicNumber: 20, family: ElementFamily.ALKALINE_EARTH_METALS },
  { symbol: "Sc", name: "Escândio", atomicNumber: 21, family: ElementFamily.TRANSITION_METALS },
  { symbol: "Ti", name: "Titânio", atomicNumber: 22, family: ElementFamily.TRANSITION_METALS },
  { symbol: "V", name: "Vanádio", atomicNumber: 23, family: ElementFamily.TRANSITION_METALS },
  { symbol: "Cr", name: "Cromo", atomicNumber: 24, family: ElementFamily.TRANSITION_METALS },
  { symbol: "Mn", name: "Manganês", atomicNumber: 25, family: ElementFamily.TRANSITION_METALS },
  { symbol: "Fe", name: "Ferro", atomicNumber: 26, family: ElementFamily.TRANSITION_METALS },
  { symbol: "Co", name: "Cobalto", atomicNumber: 27, family: ElementFamily.TRANSITION_METALS },
  { symbol: "Ni", name: "Níquel", atomicNumber: 28, family: ElementFamily.TRANSITION_METALS },
  { symbol: "Cu", name: "Cobre", atomicNumber: 29, family: ElementFamily.TRANSITION_METALS },
  { symbol: "Zn", name: "Zinco", atomicNumber: 30, family: ElementFamily.TRANSITION_METALS },
  { symbol: "Ga", name: "Gálio", atomicNumber: 31, family: ElementFamily.POST_TRANSITION_METALS },
  { symbol: "Ge", name: "Germânio", atomicNumber: 32, family: ElementFamily.METALLOIDS },
  { symbol: "As", name: "Arsênio", atomicNumber: 33, family: ElementFamily.METALLOIDS },
  { symbol: "Se", name: "Selênio", atomicNumber: 34, family: ElementFamily.NONMETALS },
  { symbol: "Br", name: "Bromo", atomicNumber: 35, family: ElementFamily.HALOGENS },
  { symbol: "Kr", name: "Criptônio", atomicNumber: 36, family: ElementFamily.NOBLE_GASES },
  { symbol: "Rb", name: "Rubídio", atomicNumber: 37, family: ElementFamily.ALKALI_METALS },
  { symbol: "Sr", name: "Estrôncio", atomicNumber: 38, family: ElementFamily.ALKALINE_EARTH_METALS },
  { symbol: "Y", name: "Ítrio", atomicNumber: 39, family: ElementFamily.TRANSITION_METALS },
  { symbol: "Zr", name: "Zircônio", atomicNumber: 40, family: ElementFamily.TRANSITION_METALS },
  { symbol: "Nb", name: "Nióbio", atomicNumber: 41, family: ElementFamily.TRANSITION_METALS },
  { symbol: "Mo", name: "Molibdênio", atomicNumber: 42, family: ElementFamily.TRANSITION_METALS },
  { symbol: "Tc", name: "Tecnécio", atomicNumber: 43, family: ElementFamily.TRANSITION_METALS },
  { symbol: "Ru", name: "Rutênio", atomicNumber: 44, family: ElementFamily.TRANSITION_METALS },
  { symbol: "Rh", name: "Ródio", atomicNumber: 45, family: ElementFamily.TRANSITION_METALS },
  { symbol: "Pd", name: "Paládio", atomicNumber: 46, family: ElementFamily.TRANSITION_METALS },
  { symbol: "Ag", name: "Prata", atomicNumber: 47, family: ElementFamily.TRANSITION_METALS },
  { symbol: "Cd", name: "Cádmio", atomicNumber: 48, family: ElementFamily.TRANSITION_METALS },
  { symbol: "In", name: "Índio", atomicNumber: 49, family: ElementFamily.POST_TRANSITION_METALS },
  { symbol: "Sn", name: "Estanho", atomicNumber: 50, family: ElementFamily.POST_TRANSITION_METALS },
  { symbol: "Sb", name: "Antimônio", atomicNumber: 51, family: ElementFamily.METALLOIDS },
  { symbol: "Te", name: "Telúrio", atomicNumber: 52, family: ElementFamily.METALLOIDS },
  { symbol: "I", name: "Iodo", atomicNumber: 53, family: ElementFamily.HALOGENS },
  { symbol: "Xe", name: "Xenônio", atomicNumber: 54, family: ElementFamily.NOBLE_GASES },
  { symbol: "Cs", name: "Césio", atomicNumber: 55, family: ElementFamily.ALKALI_METALS },
  { symbol: "Ba", name: "Bário", atomicNumber: 56, family: ElementFamily.ALKALINE_EARTH_METALS },
  { symbol: "La", name: "Lantânio", atomicNumber: 57, family: ElementFamily.LANTHANIDES },
  { symbol: "Ce", name: "Cério", atomicNumber: 58, family: ElementFamily.LANTHANIDES },
  { symbol: "Pr", name: "Praseodímio", atomicNumber: 59, family: ElementFamily.LANTHANIDES },
  { symbol: "Nd", name: "Neodímio", atomicNumber: 60, family: ElementFamily.LANTHANIDES },
  { symbol: "Pm", name: "Promécio", atomicNumber: 61, family: ElementFamily.LANTHANIDES },
  { symbol: "Sm", name: "Samário", atomicNumber: 62, family: ElementFamily.LANTHANIDES },
  { symbol: "Eu", name: "Európio", atomicNumber: 63, family: ElementFamily.LANTHANIDES },
  { symbol: "Gd", name: "Gadolínio", atomicNumber: 64, family: ElementFamily.LANTHANIDES },
  { symbol: "Tb", name: "Térbio", atomicNumber: 65, family: ElementFamily.LANTHANIDES },
  { symbol: "Dy", name: "Disprósio", atomicNumber: 66, family: ElementFamily.LANTHANIDES },
  { symbol: "Ho", name: "Hólmio", atomicNumber: 67, family: ElementFamily.LANTHANIDES },
  { symbol: "Er", name: "Érbio", atomicNumber: 68, family: ElementFamily.LANTHANIDES },
  { symbol: "Tm", name: "Túlio", atomicNumber: 69, family: ElementFamily.LANTHANIDES },
  { symbol: "Yb", name: "Itérbio", atomicNumber: 70, family: ElementFamily.LANTHANIDES },
  { symbol: "Lu", name: "Lutécio", atomicNumber: 71, family: ElementFamily.LANTHANIDES },
  { symbol: "Hf", name: "Háfnio", atomicNumber: 72, family: ElementFamily.TRANSITION_METALS },
  { symbol: "Ta", name: "Tântalo", atomicNumber: 73, family: ElementFamily.TRANSITION_METALS },
  { symbol: "W", name: "Tungstênio", atomicNumber: 74, family: ElementFamily.TRANSITION_METALS },
  { symbol: "Re", name: "Rênio", atomicNumber: 75, family: ElementFamily.TRANSITION_METALS },
  { symbol: "Os", name: "Ósmio", atomicNumber: 76, family: ElementFamily.TRANSITION_METALS },
  { symbol: "Ir", name: "Irídio", atomicNumber: 77, family: ElementFamily.TRANSITION_METALS },
  { symbol: "Pt", name: "Platina", atomicNumber: 78, family: ElementFamily.TRANSITION_METALS },
  { symbol: "Au", name: "Ouro", atomicNumber: 79, family: ElementFamily.TRANSITION_METALS },
  { symbol: "Hg", name: "Mercúrio", atomicNumber: 80, family: ElementFamily.TRANSITION_METALS },
  { symbol: "Tl", name: "Tálio", atomicNumber: 81, family: ElementFamily.POST_TRANSITION_METALS },
  { symbol: "Pb", name: "Chumbo", atomicNumber: 82, family: ElementFamily.POST_TRANSITION_METALS },
  { symbol: "Bi", name: "Bismuto", atomicNumber: 83, family: ElementFamily.POST_TRANSITION_METALS },
  { symbol: "Po", name: "Polônio", atomicNumber: 84, family: ElementFamily.POST_TRANSITION_METALS },
  { symbol: "At", name: "Astato", atomicNumber: 85, family: ElementFamily.HALOGENS },
  { symbol: "Rn", name: "Radônio", atomicNumber: 86, family: ElementFamily.NOBLE_GASES },
  { symbol: "Fr", name: "Frâncio", atomicNumber: 87, family: ElementFamily.ALKALI_METALS },
  { symbol: "Ra", name: "Rádio", atomicNumber: 88, family: ElementFamily.ALKALINE_EARTH_METALS },
  { symbol: "Ac", name: "Actínio", atomicNumber: 89, family: ElementFamily.ACTINIDES },
  { symbol: "Th", name: "Tório", atomicNumber: 90, family: ElementFamily.ACTINIDES },
  { symbol: "Pa", name: "Protactínio", atomicNumber: 91, family: ElementFamily.ACTINIDES },
  { symbol: "U", name: "Urânio", atomicNumber: 92, family: ElementFamily.ACTINIDES },
  { symbol: "Np", name: "Netúnio", atomicNumber: 93, family: ElementFamily.ACTINIDES },
  { symbol: "Pu", name: "Plutônio", atomicNumber: 94, family: ElementFamily.ACTINIDES },
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
  // Get elements from selected families
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
      options: [randomElement]
    };
  }

  // Select random element as question
  const questionElement = availableElements[Math.floor(Math.random() * availableElements.length)];

  // Get 3 random wrong options
  const otherElements = PERIODIC_TABLE.filter(
    element => element.symbol !== questionElement.symbol
  );
  
  const shuffled = otherElements.sort(() => 0.5 - Math.random());
  const wrongOptions = shuffled.slice(0, 3);

  // Combine correct and wrong options and shuffle
  const allOptions = [questionElement, ...wrongOptions].sort(() => 0.5 - Math.random());

  return {
    question: questionElement,
    options: allOptions
  };
}
