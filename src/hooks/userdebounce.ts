import {useEffect, useState} from 'react';

/**
 * Hook personnalisé pour gérer la logique de debounce.
 *
 * @param value La valeur à débouncer (par exemple une chaîne de caractères)
 * @param delay Le délai en millisecondes avant que la valeur ne soit mise à jour
 */
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Créer un timeout pour mettre à jour la valeur après le délai
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Efface le timeout si la valeur ou le délai change avant la fin du délai
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
