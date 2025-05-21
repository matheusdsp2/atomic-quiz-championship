
// Basic profanity filter implementation
const offensiveWords = [
  "palavrao1", 
  "palavrao2", 
  "palavrao3", 
  // Add more offensive words as needed
];

export function containsProfanity(text: string): boolean {
  if (!text) return false;
  
  const normalized = text.toLowerCase().trim();
  return offensiveWords.some(word => normalized.includes(word));
}

export function filterProfanity(text: string): string {
  if (!text) return text;
  
  let filtered = text;
  offensiveWords.forEach(word => {
    const regex = new RegExp(word, 'gi');
    filtered = filtered.replace(regex, '*'.repeat(word.length));
  });
  
  return filtered;
}

export function sanitizeUsername(username: string): string {
  if (!username) return 'Anônimo';
  
  // Trim whitespace and limit length
  let sanitized = username.trim().slice(0, 20);
  
  // Filter profanity
  sanitized = filterProfanity(sanitized);
  
  // If username is empty after filtering or consists only of special characters
  if (!sanitized || /^\W+$/.test(sanitized)) {
    return 'Anônimo';
  }
  
  return sanitized;
}
