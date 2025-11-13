import { useCallback, useState } from 'react';
import type { FAQ } from './Category';

export interface SearchResult {
  item: FAQ;
  matches: {
    field: 'question' | 'answer';
    snippet: string;
  }[];
}

export function useSearch() {
  const [results, setResults] = useState<SearchResult[]>([]);

  const search = useCallback((query: string, categories: { items: FAQ[] }[]) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchTerms = query.toLowerCase().split(' ').filter(Boolean);
    const searchResults: SearchResult[] = [];

    categories.forEach(category => {
      category.items.forEach(item => {
        const matches: SearchResult['matches'] = [];
        
        // Search in question
        if (searchTerms.some(term => item.question.toLowerCase().includes(term))) {
          const snippet = highlightMatchingText(item.question, searchTerms);
          matches.push({ field: 'question', snippet });
        }

        // Search in answer
        if (searchTerms.some(term => item.answer.toLowerCase().includes(term))) {
          const snippet = createContextSnippet(item.answer, searchTerms);
          matches.push({ field: 'answer', snippet });
        }

        if (matches.length > 0) {
          searchResults.push({ item, matches });
        }
      });
    });

    setResults(searchResults);
  }, []);

  return { search, results };
}

function highlightMatchingText(text: string, searchTerms: string[]): string {
  let result = text;
  searchTerms.forEach(term => {
    const regex = new RegExp(term, 'gi');
    result = result.replace(regex, match => `<mark>${match}</mark>`);
  });
  return result;
}

function createContextSnippet(text: string, searchTerms: string[]): string {
  const MAX_SNIPPET_LENGTH = 150;
  const words = text.split(' ');
  const matchIndices: number[] = [];

  // Find all word indices that match search terms
  words.forEach((word, index) => {
    if (searchTerms.some(term => word.toLowerCase().includes(term))) {
      matchIndices.push(index);
    }
  });

  if (matchIndices.length === 0) return '';

  // Find the best snippet that includes the most matches
  let bestSnippetStart = 0;
  let bestMatchCount = 0;

  for (let i = 0; i < words.length; i++) {
    let currentLength = 0;
    let matchCount = 0;
    let j = i;

    while (j < words.length && currentLength < MAX_SNIPPET_LENGTH) {
      currentLength += words[j].length + 1; // +1 for space
      if (matchIndices.includes(j)) matchCount++;
      j++;
    }

    if (matchCount > bestMatchCount) {
      bestMatchCount = matchCount;
      bestSnippetStart = i;
    }
  }

  // Create snippet
  let snippet = '';
  let currentLength = 0;
  let i = bestSnippetStart;

  while (i < words.length && currentLength < MAX_SNIPPET_LENGTH) {
    const word = words[i];
    const highlighted = searchTerms.some(term => 
      word.toLowerCase().includes(term)
    ) ? `<mark>${word}</mark>` : word;

    snippet += (i > bestSnippetStart ? ' ' : '') + highlighted;
    currentLength += word.length + 1;
    i++;
  }

  return (bestSnippetStart > 0 ? '... ' : '') + 
         snippet + 
         (i < words.length ? ' ...' : '');
}
